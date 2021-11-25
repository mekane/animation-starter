import chai from 'chai';
const expect = chai.expect;

import { Circle } from '../src/Entities.js';
import { Vector } from '../src/Vector.js';
import { Controls } from '../src/Controls.js';
import { Plugin } from '../src/Plugin.js';
import { Timer } from '../src/Timer.js';
import { View } from '../src/View.js';
import { Game } from '../src/Game.js';

import { Planet } from "./Planet.js";

describe('Planet class', () => {
    const controlsStub = new Controls()
    const pluginStub = new Plugin()
    const timerStub = new Timer()
    const viewStub = new View()
    const game = new Game(controlsStub, viewStub, timerStub, pluginStub)
    

    it('acts like a regular Circle', () => {
        const planet = new Planet(100, 100, 10, new Vector(10, 0))
        const circle = new Circle(110, 100, 10, new Vector(-1, 0))

        const oldState = { entities: [circle, planet] }
        const newState = game.step(oldState);

        expect(circle.destroyed).to.equal(false)
        expect(planet.destroyed).to.equal(false)
    })
})