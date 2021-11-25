import chai from 'chai';

const expect = chai.expect;
import { SpaceGamePlugin } from "../spaceGame/SpaceGame.js";

describe('SpaceGame Plugin', () => {
    let plugin
    let state
    let blackHole

    beforeEach(() => {
        plugin = new SpaceGamePlugin();
        state = plugin.getInitialState()
        blackHole = findBlackHole(state.entities)
    })

    it('sets up initial state', () => {
        expect(state).to.be.an('object')
        expect(state.entities.length).to.be.greaterThan(5)
        expect(blackHole).to.be.an('object')
    })

    it('starts the black hole in the center of the view', () => {
        const initialState = plugin.getInitialState({ width: 300, height: 200 })
        const blackHole = findBlackHole(initialState.entities)
        expect(blackHole.x).to.equal(150)
        expect(blackHole.y).to.equal(100)
    })

    it('accelerates the black hole up when up arrow key is pressed', () => {
        const controls = { up: true }
        plugin.preUpdate(state, controls)

        const velocity = blackHole.velocity
        expect(velocity.x).to.equal(0)
        expect(velocity.y).to.be.greaterThan(0)
    })

    it('accelerates the black hole down when down arrow key is pressed', () => {
        const controls = { down: true }
        plugin.preUpdate(state, controls)

        const velocity = blackHole.velocity
        expect(velocity.x).to.equal(0)
        expect(velocity.y).to.be.lessThan(0)
    })

    it('accelerates the black hole left when left arrow key is pressed', () => {
        const controls = { left: true }
        plugin.preUpdate(state, controls)

        const velocity = blackHole.velocity
        expect(velocity.x).to.be.lessThan(0)
        expect(velocity.y).to.equal(0)
    })

    it('accelerates the black hole right when right arrow key is pressed', () => {
        const controls = { right: true }
        plugin.preUpdate(state, controls)

        const velocity = blackHole.velocity
        expect(velocity.x).to.be.greaterThan(0)
        expect(velocity.y).to.equal(0)
    })

    it('combines accelerations with multiple keys', () => {
        const controls = { down: true, left: true }
        plugin.preUpdate(state, controls)

        const velocity = blackHole.velocity
        expect(velocity.x).to.be.lessThan(0)
        expect(velocity.y).to.be.lessThan(0)
    })

})

function findBlackHole(entityList) {
    return entityList.filter(e => e.isBlackHole)[0]
}
