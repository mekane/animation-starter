import chai from 'chai';
import deepFreeze from 'deep-freeze';
import {Game, step} from '../src/Game.js';
import {Circle} from "../src/Entities.js";
import {Vector} from "../src/Vector.js";

const expect = chai.expect;

const noop = _ => ({})

const controlsStub = {
    initialize: noop,
    getControlState: noop
}

const viewStub = {
    draw: noop,
    getBounds: () => ({width: 0, height: 0})
}

const timerStub = {
    tick: noop
}

const pluginStub = {
    getInitialState: noop,
    preUpdate: noop
}

describe('Game class', () => {
    it('takes a Controls module, initializes it and gets initial state', () => {
        const controlsSpy = {
            initCalled: 0,
            getCalled: 0,
            initialize: function () {
                this.initCalled++
            },
            getControlState: function () {
                this.getCalled++
                return {}
            }
        }
        const game = Game(controlsSpy, viewStub, timerStub, pluginStub)
        expect(controlsSpy.initCalled).to.equal(1)
        expect(controlsSpy.getCalled).to.equal(1)
    })

    it('takes a View and draws a frame', () => {
        const viewSpy = {
            drawCalled: 0,
            draw: function () {
                this.drawCalled++
            },
            getBounds: () => ({width: 0, height: 0})
        }
        const game = Game(controlsStub, viewSpy, timerStub, pluginStub)
        expect(viewSpy.drawCalled).to.equal(1)
    })

    it('takes a Timer and uses it to tick the main Loop', () => {
        const timerSpy = {
            tickCalled: 0,
            tick: function (fn) {
                this.tickCalled++;
            }
        }
        const game = Game(controlsStub, viewStub, timerSpy, pluginStub)
        expect(timerSpy.tickCalled).to.equal(1)
    })

    it('takes a Plugin and uses it to get initial state', () => {
        const pluginSpy = {
            getInitialStateCalled: 0,
            getInitialState: function (fn) {
                this.getInitialStateCalled++;
                return {}
            }
        }
        const game = Game(controlsStub, viewStub, timerStub, pluginSpy)
        expect(pluginSpy.getInitialStateCalled).to.equal(1)
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

    it('returns the same values as the old state if nothing changes', () => {
        const oldState = {
            x: 1,
            y: 1
        }
        const newState = step(oldState, {})

        expect(newState.x).to.equal(1)
        expect(newState.y).to.equal(1)
    })

    it('calls updatePosition on each entity') //use spies

    it('updates entity positions according to their velocities on step', () => {
        const oldState = {
            entities: [
                new Circle(1, 1, 1, new Vector(4, 5))
            ]
        }

        const newState = step(oldState);
        const newEntity = newState.entities[0];
        expect(newEntity.x).to.equal(1.4)
        expect(newEntity.y).to.equal(1.5)
        expect(newEntity.velocity.x).to.equal(4)
        expect(newEntity.velocity.y).to.equal(5)
    })

    it('checks for hits between each entity') // use spies
    //TODO: use spiy with stubbed hit() to check for collisionEffects() and collision()

    it('checks for hits with walls') //use spies
    //TODO: provide options within the state to enable wall checks
    //TODO: provide coefficient of friction in state options

    it('removes Entities marked destroyed')

})


describe('Plugins', () => {

})
