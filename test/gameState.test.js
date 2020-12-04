import chai from 'chai';
import {step} from '../src/gameState.js';

const expect = chai.expect;

describe('The step function', () => {
    it('exports a function that takes the previous game state and the current controls state and returns the next state', () => {
        expect(step).to.be.a('function');
        expect(step({}, {})).to.be.an('object');
    })

    it('always returns a new object', () => {
        const oldState = {};
        const newState = step(oldState, {});

        expect(oldState).to.not.equal(newState);
    })

    it('returns default values if old state is missing any', () => {
        const newState = step({}, {});
        expect(newState.x).to.equal(0);
        expect(newState.y).to.equal(0);
        expect(newState.vx).to.equal(0);
        expect(newState.vy).to.equal(0);
    });
})

describe('Changing next state based on controls', () => {
    it('returns the same values as the old state if nothing changes', () => {
        const oldState = {
            x: 1,
            y: 1
        }
        const newState = step(oldState, {});

        expect(newState.x).to.equal(1);
        expect(newState.y).to.equal(1);
    })

    it('adds the previous velocities to x and y')

    it('accelerates the velocities if controls indicate')

    it('caps velocities at 20')
})