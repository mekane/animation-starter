import chai from 'chai';
import deepFreeze from 'deep-freeze';
import {circleHit, getInitialState, rectangleHit, step} from '../src/gameState.js';

const expect = chai.expect;

describe('Getting initial state', () => {
    it('exports a function that returns an initial game state', () => {
        expect(getInitialState()).to.deep.equal({
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            entities: []
        })
    })

    it('fills the initial list of entities according to the count', () => {
        const initialState = getInitialState(3)
        expect(initialState.entities).to.be.an('array').with.length(3)
    })
})

describe('The step function', () => {
    it('exports a function that takes the previous game state and returns the next state', () => {
        expect(step).to.be.a('function')
        expect(step({})).to.be.an('object')
    })

    it('always returns a new object', () => {
        const oldState = {}
        const newState = step(oldState, {})

        expect(oldState).to.not.equal(newState)
    })

    it('returns default values if old state is missing any', () => {
        const newState = step({})
        expect(newState.x).to.equal(0)
        expect(newState.y).to.equal(0)
        expect(newState.vx).to.equal(0)
        expect(newState.vy).to.equal(0)
    })
})

describe('Changing next state based on controls', () => {
    it('returns the same values as the old state if nothing changes', () => {
        const oldState = {
            x: 1,
            y: 1
        }
        const newState = step(oldState, {})

        expect(newState.x).to.equal(1)
        expect(newState.y).to.equal(1)
    })

    it('adds the previous velocities to x and y', () => {
        const oldState = {
            x: 1,
            y: 1,
            vx: 2,
            vy: 3
        }
        const newState = step(oldState)

        expect(newState.x).to.equal(1.2)
        expect(newState.y).to.equal(1.3)
        expect(newState.vx).to.equal(2)
        expect(newState.vy).to.equal(3)
    })

    it('takes the next time as a parameter to use for movement calculations', () => {
        const oldState = {
            x: 1,
            y: 1,
            vx: 10,
            vy: 10
        }
        const newState = step(oldState, {}, 0.05)

        expect(newState.x).to.equal(1.5)
        expect(newState.y).to.equal(1.5)
    })

    it('clamps the update step time to .1s max', () => {
        const oldState = {
            x: 1,
            y: 1,
            vx: 6,
            vy: 6
        }
        const newState = step(oldState, {}, .5)

        expect(newState.x).to.equal(1.6)
        expect(newState.y).to.equal(1.6)
        expect(newState.vx).to.equal(6)
        expect(newState.vy).to.equal(6)
    })

    it('accelerates the velocities if controls indicate', () => {
        expect(step({}, {up: true})).to.have.property('vy', -1)
        expect(step({}, {down: true})).to.have.property('vy', 1)
        expect(step({}, {left: true})).to.have.property('vx', -1)
        expect(step({}, {right: true})).to.have.property('vx', 1)
    })

    it('caps velocities at 20', () => {
        let newState = step({
            vx: -25,
            vy: -25
        }, {});
        expect(newState).to.have.property('vx', -20)
        expect(newState).to.have.property('vy', -20)

        newState = step({
            vx: 25,
            vy: 25
        }, {});
        expect(newState).to.have.property('vx', 20)
        expect(newState).to.have.property('vy', 20)
    })
})

describe('Entities', () => {
    it('has an x and y position and x and y velocities', () => {
        const entity = getInitialState(1).entities[0];

        expect(entity.size).to.be.a('number').at.least(5);
        expect(entity.x).to.be.a('number');
        expect(entity.y).to.be.a('number');
        expect(entity.vx).to.be.a('number');
        expect(entity.vx).to.be.a('number');
    })

    it('updates entity positions according to their velocities on step', () => {
        const oldState = {
            entities: [
                {
                    size: 1,
                    x: 1,
                    y: 1,
                    vx: 4,
                    vy: 5
                }
            ]
        }

        const newState = step(oldState);
        const newEntity = newState.entities[0];
        expect(newEntity.x).to.equal(1.4)
        expect(newEntity.y).to.equal(1.5)
        expect(newEntity.vx).to.equal(4)
        expect(newEntity.vy).to.equal(5)
    })

    it('does not modify the old entities in the previous state', () => {
        const oldState = getInitialState(1);
        deepFreeze(oldState);

        function update() {
            step(oldState);
        }

        expect(update).to.not.throw();
    })
})

describe('Intersecting Entities - two circles', () => {
    it('the collision function returns false for missing and bogus data', () => {
        expect(circleHit()).to.equal(false)
        expect(circleHit({})).to.equal(false)
        expect(circleHit({}, {})).to.equal(false)
    })

    it('returns false for circles far apart', () => {
        const c1 = {size: 10, x: 10, y: 0};
        const c2 = {size: 10, x: 99, y: 0};

        expect(circleHit(c1, c2)).to.equal(false)
    })

    it('returns true for circles at a distance equal to their radii', () => {
        const c1 = {size: 10, x: 10, y: 0};
        const c2 = {size: 10, x: 30, y: 0};

        expect(circleHit(c1, c2)).to.equal(true)
    })

    it('returns true for circles at a distance less than their radii', () => {
        const c1 = {size: 10, x: 10, y: 10};
        const c2 = {size: 10, x: 15, y: 15};

        expect(circleHit(c1, c2)).to.equal(true)
    })
})

describe('Intersecting Entities - two rectangles', () => {
    it('the collision function returns false for missing and bogus data', () => {
        expect(rectangleHit()).to.equal(false)
        expect(rectangleHit({})).to.equal(false)
        expect(rectangleHit({}, {})).to.equal(false)
    })

    it('returns false for rectangles far apart', () => {
        const r1 = {x: 10, y: 0, width: 10, height: 10};
        const r2 = {x: 99, y: 0, width: 10, height: 10};
        expect(rectangleHit(r1, r2)).to.equal(false)

        const r3 = {x: 99, y: 0, width: 10, height: 10};
        const r4 = {x: 10, y: 0, width: 10, height: 10};
        expect(rectangleHit(r3, r4)).to.equal(false)

        const r5 = {x: 0, y: 10, width: 10, height: 10};
        const r6 = {x: 0, y: 99, width: 10, height: 10};
        expect(rectangleHit(r5, r6)).to.equal(false)

        const r7 = {x: 0, y: 99, width: 10, height: 10};
        const r8 = {x: 0, y: 10, width: 10, height: 10};
        expect(rectangleHit(r7, r8)).to.equal(false)
    })

    it('returns true if r1 right edge overlaps r2 left edge', () => {
        const r1 = {x: 10, y: 10, width: 15, height: 10};
        const r2 = {x: 20, y: 0, width: 30, height: 30};

        expect(rectangleHit(r1, r2)).to.equal(true)
    })

    it('returns true if r1 left edge overlaps r2 right edge', () => {
        const r1 = {x: 20, y: 0, width: 30, height: 30};
        const r2 = {x: 45, y: 10, width: 15, height: 10};

        expect(rectangleHit(r1, r2)).to.equal(true)
    })

    it('returns true if r1 bottom edge overlaps r2 top edge', () => {
        const r1 = {x: 20, y: 20, width: 10, height: 15};
        const r2 = {x: 10, y: 10, width: 30, height: 30};

        expect(rectangleHit(r1, r2)).to.equal(true)
    })

    it('returns true if r1 top edge overlaps r2 bottom edge', () => {
        const r1 = {x: 20, y: 0, width: 10, height: 15};
        const r2 = {x: 10, y: 10, width: 20, height: 20};

        expect(rectangleHit(r1, r2)).to.equal(true)
    })
})