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

    describe('adding more planets', () => {
        it('adds a small one when the "m" key is pressed', () => {
            const controls = { m: true };
            const originalNumberOfEntities = state.entities.length;
            plugin.preUpdate(state, controls);
            expect(state.entities.length).to.equal(originalNumberOfEntities + 1);
            expect(state.entities[state.entities.length - 1].size).to.be.greaterThan(10);
            expect(state.entities[state.entities.length - 1].size).to.be.lessThan(20);
        });

        it('adds a medium one when the "e" key is pressed', () => {
            const controls = { e: true };
            const originalNumberOfEntities = state.entities.length;
            plugin.preUpdate(state, controls);
            expect(state.entities.length).to.equal(originalNumberOfEntities + 1);
            expect(state.entities[state.entities.length - 1].size).to.be.greaterThan(19);
            expect(state.entities[state.entities.length - 1].size).to.be.lessThan(40);
        });

        it('adds a jarge one when the "j" key is pressed', () => {
            const controls = { j: true };
            const originalNumberOfEntities = state.entities.length;
            plugin.preUpdate(state, controls);
            expect(state.entities.length).to.equal(originalNumberOfEntities + 1);
            expect(state.entities[state.entities.length - 1].size).to.be.greaterThan(49);
            expect(state.entities[state.entities.length - 1].size).to.be.lessThan(100);
        });
    });
})

function findBlackHole(entityList) {
    return entityList.filter(e => e.isBlackHole)[0]
}
