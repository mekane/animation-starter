import chai from 'chai';
import deepFreeze from 'deep-freeze';
import {step} from '../bounceHouse/gameState.js';

const expect = chai.expect;

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

    it('removes Entities marked destroyed')
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
        expect(step({vy: 0}, {up: true})).to.have.property('vy', -1)
        expect(step({vy: 0}, {down: true})).to.have.property('vy', 1)
        expect(step({vx: 0}, {left: true})).to.have.property('vx', -1)
        expect(step({vx: 0}, {right: true})).to.have.property('vx', 1)
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
        /*
        const entity = getInitialState(1).entities[0];

        expect(entity.x).to.be.a('number');
        expect(entity.y).to.be.a('number');
        expect(entity.vx).to.be.a('number');
        expect(entity.vx).to.be.a('number');
        */
        //TODO: circles have 'size', rectangles have 'width' and 'height'
        //expect(entity.size).to.be.a('number').at.least(5);
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
        const oldState = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            entities: [
                {x: 530, y: 455, size: 10, vx: -4, vy: -4},
            ]
        };

        deepFreeze(oldState);

        function update() {
            step(oldState);
        }

        expect(update).to.not.throw();
    })

    it('resets the "hit" state of entities each update step', () => {
        const oldState = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            entities: [
                {x: 530, y: 455, size: 10, vx: -4, vy: -4, hit: true},
            ]
        };

        const newState = step(oldState);
        expect(newState.entities[0].hit).to.equal(false);
    })
})
