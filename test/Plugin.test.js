import chai from 'chai';

const expect = chai.expect;

import {Plugin} from "../src/Plugin.js";

describe('Plugin class', () => {
    it('has a getInitialState method that should include an array of Entities', () => {
        const p = new Plugin();
        expect(p.getInitialState()).to.deep.equal({entities: []})
    })

    it('has a preUpdate method that gets the controls and the state and can modify the state', () => {
        const p = new Plugin();
        const state = {};
        const controls = {};
        expect(p.preUpdate(state, controls)).to.equal(state)
    })

    //it('has a postUpdate method that gets the state and the controls')
    //it('has a postCollision method that gets the state after collisions are calculated')
})