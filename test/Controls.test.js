import chai from 'chai';

const expect = chai.expect;

import {Controls} from "../src/Controls.js";

describe('Controls class', () => {
    it('has an initialize method array of Entities', () => {
        const c = new Controls();
        expect(c.initialize).to.be.a('function')
    })

    it('has a getControlState method that returns the current controls state', () => {
        const c = new Controls();
        const state = c.getControlState()
        expect(state.pause).to.equal(false)
        expect(state.up).to.equal(0)
        expect(state.right).to.equal(0)
        expect(state.down).to.equal(0)
        expect(state.left).to.equal(0)
    })
})