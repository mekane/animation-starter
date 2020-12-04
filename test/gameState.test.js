import chai from 'chai';
import {step} from '../src/gameState.js';

const expect = chai.expect;

describe('The step function', () => {
    it('exports a function that takes the previous game state and the current controls state and returns the next state', () => {
        expect(step).to.be.a('function')
        expect(step({}, {})).to.be.an('object')
    })

    it('always returns a new object', () => {
        const oldState = {}
        const newState = step(oldState, {})

        expect(oldState).to.not.equal(newState)
    })

    it('returns default values if old state is missing any', () => {
        const newState = step({}, {})
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

    it('sets pause state according to the pause control', () => {
        expect(step({}, {pause: true})).to.have.property('pause', true)
        expect(step({}, {pause: false})).to.have.property('pause', false)
    })

    it('adds the previous velocities to x and y', () => {
        const oldState = {
            x: 1,
            y: 1,
            vx: 2,
            vy: 3
        }
        const newState = step(oldState, {})

        expect(newState).to.deep.equal({
            x: 3,
            y: 4,
            vx: 2,
            vy: 3,
            pause: false
        })
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