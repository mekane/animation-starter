import chai from 'chai';
import {Circle} from "../src/Entities.js";
import {Controls} from "../src/Controls.js";
import {Game} from '../src/Game.js';
import {Plugin} from "../src/Plugin.js";
import {Timer} from "../src/Timer.js";
import {Vector} from "../src/Vector.js";
import {View} from "../src/View.js";

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
        expect(viewSpy.drawCalled).to.equal(1)
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
        expect(game.getOptions()).to.deep.equal({walls: true})
    })

    it('takes an options object and copies it', () => {
        const options = {walls: false};
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

    it('calls updatePosition on each entity') //use spies

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

    it('checks for hits between each entity') // use spies
    //TODO: use spy with stubbed hit() to check for collisionEffects() and collision()

    it('checks for hits with walls', () => {
        const spy = new entitySpy(2, 2, 1, new Vector(4, 5))
        const oldState = { entities: [spy] }

        game.step(oldState);
        expect(spy.entitiesChecked.length).to.equal(4)
    })

    it('skips checking for hits with walls if disabled in game options', () => {
        const spy = new entitySpy(2, 2, 1, new Vector(4, 5))
        const oldState = { entities: [spy] }

        const gameNoWalls = new Game(controlsStub, viewStub, timerStub, pluginStub, {walls: false})
        gameNoWalls.step(oldState);
        expect(spy.entitiesChecked.length).to.equal(0)
    })

    //TODO: provide coefficient of friction in state options

    it('removes Entities marked destroyed')

})


describe('Plugins', () => {
    it('takes a Plugin and gives it a chance to act before each update loop', () => {
        const pluginSpy = new PluginSpy()
        const game = Game(controlsStub, viewStub, timerStub, pluginSpy)
        expect(pluginSpy.preUpdateCalled).to.equal(1)
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
        return {entities: []}
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

class entitySpy extends Circle {
    entitiesChecked = [];

    hit(e) {
        this.entitiesChecked.push(e)
    }
}