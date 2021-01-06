import chai from 'chai';

const expect = chai.expect;
import {CannonGamePlugin} from "../cannonGame/CannonGame.js";
import {Projectile} from "../src/Projectile.js";

describe('Plugin class', () => {
    it('sets up initial Entities')

    it('adds a projectile when the Fire button is pressed', () => {
        const game = new CannonGamePlugin()
        const state = {entities: []}
        const controls = {fire: true}
        game.preUpdate(state, controls)
        expect(state.entities).to.have.length(1)
        expect(state.entities[0] instanceof Projectile).to.equal(true)
    })
})