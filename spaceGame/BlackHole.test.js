import chai from 'chai'
const expect = chai.expect

import { Circle } from '../src/Entities.js'
import { Vector } from '../src/Vector.js'
import { Controls } from '../src/Controls.js'
import { Plugin } from '../src/Plugin.js'
import { Timer } from '../src/Timer.js'
import { View } from '../src/View.js'
import { Game } from '../src/Game.js'

import { Planet } from './Planet.js'
import { BlackHole } from './BlackHole.js'

describe('BlackHole class', () => {
    const controlsStub = new Controls()
    const pluginStub = new Plugin()
    const timerStub = new Timer()
    const viewStub = new View()
    const game = new Game(controlsStub, viewStub, timerStub, pluginStub)

    it('bounces off of larger objects', () => {
        const planet = new Planet(100, 100, 8, new Vector(10, 0))
        const blackHole = new BlackHole(115, 100, 7, new Vector(-10, 0))

        const oldState = { entities: [planet, blackHole] }
        const newState = game.step(oldState);

        expect(planet.destroyed).to.equal(false)
        expect(planet.velocity.x).to.be.lessThan(0)
        expect(blackHole.destroyed).to.equal(false)
        expect(blackHole.velocity.x).to.be.greaterThan(0)
    })

    it('destroys smaller entities it collides with', () => {
        const planet = new Planet(100, 100, 7, new Vector(10, 0))
        const blackHole = new BlackHole(115, 100, 8, new Vector(-10, 0))

        const oldState = { entities: [planet, blackHole] }
        const newState = game.step(oldState);

        expect(planet.destroyed).to.equal(true)
        expect(blackHole.destroyed).to.equal(false)
    })

    it('consumes smaller entities and grows proportionally', () => {
        const planet = new Planet(100, 100, 7, new Vector(10, 0))
        const blackHole = new BlackHole(115, 100, 8, new Vector(-10, 0))

        const oldState = { entities: [planet, blackHole] }
        const newState = game.step(oldState);

        const gainedAllPlanetsArea = 354.82;
        const gainedHalfPlanetsArea = 277.89;

        expect(blackHole.area).to.equal(gainedHalfPlanetsArea)
    })

    it('overrides base styles', () => {
        const blackHole = new BlackHole(1, 1, 1);
        expect(blackHole.style).to.deep.equal({
            background: '#111',
            borderColor: '#333',
            borderWidth: 2,
            borderColorHit: '#66c'
        })
    })
})