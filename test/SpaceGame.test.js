import chai from 'chai';

const expect = chai.expect;
import { SpaceGamePlugin } from "../spaceGame/SpaceGame.js";

describe('SpaceGame Plugin', () => {
    let plugin;

    beforeEach(() => {
        plugin = new SpaceGamePlugin();
    })

    it('sets up initial state', () => {
        const initialState = plugin.getInitialState()
        expect(initialState).to.be.an('object')
        expect(initialState.entities.length).to.be.greaterThan(5)
        const blackHole = findBlackHole(initialState.entities)
        expect(blackHole).to.be.an('object')
    })

    it('starts the black hole in the center of the view', () => {
        const initialState = plugin.getInitialState({ width: 300, height: 200 })
        const blackHole = findBlackHole(initialState.entities)
        expect(blackHole.x).to.equal(150)
        expect(blackHole.y).to.equal(100)
    })

    it('accelerates the black hole when arrow keys are pressed', () => {
        const plugin = new SpaceGamePlugin()
        const state = plugin.getInitialState();
        const controls = { up: true }
        plugin.preUpdate(state, controls)

    })
})

function findBlackHole(entityList) {
    return entityList.filter(e => e.isBlackHole)[0]
}
