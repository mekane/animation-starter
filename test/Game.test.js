import chai from 'chai';
import { Circle, Entity } from "../src/Entities.js";
import { Controls } from "../src/Controls.js";
import { Game } from '../src/Game.js';
import { Plugin } from "../src/Plugin.js";
import { Timer } from "../src/Timer.js";
import { Vector } from "../src/Vector.js";
import { View } from "../src/View.js";

const expect = chai.expect;

const controlsStub = new Controls()
const pluginStub = new Plugin()
const timerStub = new Timer()
const viewStub = new View()

describe('Game class', () => {
    it('takes a Controls module, initializes it and gets initial state', () => {
        const controlsSpy = new ControlsSpy()
        const game = Game(controlsSpy, viewStub, timerStub, pluginStub)
        expect(controlsSpy.initCalled).to.equal(1)
        expect(controlsSpy.getCalled).to.equal(1)
    })

    it('takes a View and draws a frame', () => {
        const viewSpy = new ViewSpy()
        const game = Game(controlsStub, viewSpy, timerStub, pluginStub)
        expect(viewSpy.drawCalled).to.be.greaterThan(0)
    })

    it('takes a Timer and uses it to tick the main Loop', () => {
        const timerSpy = new TimerSpy()
        const game = Game(controlsStub, viewStub, timerSpy, pluginStub)
        expect(timerSpy.tickCalled).to.equal(1)
    })

    it('takes a Plugin and uses it to get initial state', () => {
        const pluginSpy = new PluginSpy()
        const game = Game(controlsStub, viewStub, timerStub, pluginSpy)
        expect(pluginSpy.getInitialStateCalled).to.equal(1)
    })
})

describe('Game configuration options', () => {
    it('returns default options', () => {
        const game = Game(controlsStub, viewStub, timerStub, pluginStub)
        expect(game.getOptions()).to.deep.equal({ walls: true })
    })

    it('takes an options object and copies it', () => {
        const options = { walls: false };
        const game = Game(controlsStub, viewStub, timerStub, pluginStub, options)
        expect(game.getOptions()).to.not.equal(options)
        expect(game.getOptions()).to.deep.equal(options)
    })

})


describe('The step function', () => {
    const game = new Game(controlsStub, viewStub, timerStub, pluginStub)

    it('exports a function that takes the previous game state and returns the next state', () => {
        expect(game.step).to.be.a('function')
        expect(game.step({})).to.be.an('object')
    })

    it('always returns a new object', () => {
        const oldState = {}
        const newState = game.step(oldState, {})

        expect(oldState).to.not.equal(newState)
    })

    it('returns the same values as the old state if nothing changes', () => {
        const oldState = {
            x: 1,
            y: 1
        }
        const newState = game.step(oldState, {})

        expect(newState.x).to.equal(1)
        expect(newState.y).to.equal(1)
    })

    it('calls updatePosition on each entity', () => {
        const spy1 = new entitySpy(2, 2, 1, new Vector(1, 1))
        const spy2 = new entitySpy(3, 3, 1, new Vector(0, 0))
        const oldState = { entities: [spy1, spy2] }

        game.step(oldState);
        expect(spy1.updatePositionCalled).to.equal(1)
        expect(spy2.updatePositionCalled).to.equal(1)
    })

    it('updates entity positions according to their velocities on step', () => {
        const oldState = {
            entities: [
                new Circle(1, 1, 1, new Vector(4, 5))
            ]
        }

        const newState = game.step(oldState);
        const newEntity = newState.entities[0];
        expect(newEntity.x).to.equal(1.4)
        expect(newEntity.y).to.equal(1.5)
        expect(newEntity.velocity.x).to.equal(4)
        expect(newEntity.velocity.y).to.equal(5)
    })

    it('checks for hits between each entity', () => {
        const spy1 = new entitySpy(2, 2, 1, new Vector(1, 1))
        const spy2 = new entitySpy(3, 3, 1, new Vector(0, 0))
        const oldState = { entities: [spy1, spy2] }

        game.step(oldState);
        expect(spy1.entitiesChecked[0]).to.equal(spy2)
    })

    it('checks for hits with walls', () => {
        const spy = new entitySpy(2, 2, 1, new Vector(4, 5))
        const oldState = { entities: [spy] }

        game.step(oldState);
        expect(spy.entitiesChecked.length).to.equal(4)
    })

    it('skips checking for hits with walls if disabled in game options', () => {
        const spy = new entitySpy(2, 2, 1, new Vector(4, 5))
        const oldState = { entities: [spy] }

        const gameNoWalls = new Game(controlsStub, viewStub, timerStub, pluginStub, { walls: false })
        gameNoWalls.step(oldState);
        expect(spy.entitiesChecked.length).to.equal(0)
    })

    it('applies the collision method after a hit', () => {
        const hitSpy = new entityHitSpy()
        const circle = new Circle(1, 1)

        const oldState = {
            entities: [hitSpy, circle]
        }

        game.step(oldState)

        expect(hitSpy.collisionAcceleration[0]).to.equal('AccelForE1')
        expect(hitSpy.collisionEntity[0]).to.equal(circle)
    })

    it('removes Entities marked destroyed', () => {
        const c1 = new Circle(1, 1, 1, new Vector(4, 5))
        c1._destroyed = true;
        const oldState = { entities: [c1] }

        const newState = game.step(oldState);
        expect(newState.entities.length).to.equal(0)
    })
})


describe('Plugin hooks', () => {
    it(`calls the Plugin's preUpdate method each loop`, () => {
        const pluginSpy = new PluginSpy()
        const game = Game(controlsStub, viewStub, timerStub, pluginSpy)
        expect(pluginSpy.preUpdateCalled).to.be.greaterThan(0)
    })
})

class ControlsSpy extends Controls {
    initCalled = 0
    getCalled = 0

    initialize() {
        this.initCalled++
    }

    getControlState() {
        this.getCalled++
        return {}
    }
}

class PluginSpy extends Plugin {
    getInitialStateCalled = 0
    preUpdateCalled = 0

    getInitialState() {
        this.getInitialStateCalled++;
        return { entities: [] }
    }

    preUpdate(state, controls) {
        this.preUpdateCalled++;
        return {}
    }
}

class TimerSpy extends Timer {
    tickCalled = 0

    tick(fn) {
        this.tickCalled++;
    }
}

class ViewSpy extends View {
    drawCalled = 0

    draw() {
        this.drawCalled++
    }
}

class entitySpy extends Entity {
    accelerateCalled = 0;
    collisionCalled = 0;
    entitiesChecked = [];
    updatePositionCalled = 0;

    accelerate(v) {
        this.accelerateCalled++;
    }

    collision(v, e) {
        this.collisionCalled++;
    }

    hit(e) {
        this.entitiesChecked.push(e)
    }

    updatePosition(t) {
        this.updatePositionCalled++;
    }
}

class entityHitSpy extends Entity {
    collisionAcceleration = [];
    collisionEntity = [];

    hit(e) {
        return { normal: 'normal' };
    }

    accelerationFromCollision(e, n) {
        return ['AccelForE1', 'AccelForE2`']
    }

    collision(v, e) {
        this.collisionAcceleration.push(v);
        this.collisionEntity.push(e);
    }
}