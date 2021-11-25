import chai from 'chai';

const expect = chai.expect;
import { CannonGamePlugin } from "../cannonGame/CannonGame.js";
import { Projectile } from "../src/Projectile.js";

describe('CannonGame Plugin', () => {
    it('sets up initial state', () => {
        const plugin = new CannonGamePlugin();
        expect(plugin.getInitialState()).to.deep.equal({
            entities: []
        })
    })

    it('adds a projectile when the Fire button is pressed', () => {
        const plugin = new CannonGamePlugin()
        const state = { entities: [] }
        const controls = { fire: true }
        plugin.preUpdate(state, controls)
        expect(state.entities).to.have.length(1)
        expect(state.entities[0] instanceof Projectile).to.equal(true)
    })
})