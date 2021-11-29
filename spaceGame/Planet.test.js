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


    it('is a gray color when size is very small', () => {
        const p = new Planet(0, 0, 15)
        const color = parseColor(p.style.background)
        console.log(p.style.background, color)

        expect(color.red).to.be.lessThan(100)
        expect(color.green).to.be.lessThan(100)
        expect(color.blue).to.be.lessThan(100)
        expect(color.red).to.equal(color.green)
        expect(color.green).to.equal(color.blue)
    })

    it('is a reddish color when size is small', () => {
        const p = new Planet(0, 0, 21)
        const color = parseColor(p.style.background)
        console.log(p.style.background, color)

        expect(color.red).to.be.greaterThan(100)
        expect(color.green).to.be.lessThan(75)
        expect(color.blue).to.be.lessThan(75)
    })

    it('is a blueish color when size is medium small', () => {
        const p = new Planet(0, 0, 32)
        const color = parseColor(p.style.background)

        expect(color.red).to.be.lessThan(75)
        expect(color.green).to.be.lessThan(75)
        expect(color.blue).to.be.greaterThan(100)
    })

    it('is a greenish color when size is medium large', () => {
        const p = new Planet(0, 0, 43)
        const color = parseColor(p.style.background)

        expect(color.red).to.be.lessThan(75)
        expect(color.green).to.be.greaterThan(100)
        expect(color.blue).to.be.lessThan(75)
    })

    it('is a yellowish color when size is large', () => {
        const p = new Planet(0, 0, 60)
        const color = parseColor(p.style.background)

        expect(color.red).to.be.greaterThan(100)
        expect(color.green).to.be.greaterThan(100)
        expect(color.blue).to.be.lessThan(75)
    })
})

/**
 * Parses a string like
 * #rgb or #rrggbb into a data structure like
 * {
 *   red: 100,
 *   green: 25,
 *   blue: 255 
 * }
 * @returns a data structure of the parts of the color
 */
function parseColor(colorString) {
    let redHex = ''
    let greenHex = ''
    let blueHex = ''

    if (colorString.length < 4 || colorString[0] !== '#')
        return {}

    if (colorString.length > 4) {
        redHex = colorString[1] + colorString[2]
        greenHex = colorString[3] + colorString[4]
        blueHex = colorString[5] + colorString[6]
    }
    else {
        redHex = colorString[1] + colorString[1]
        greenHex = colorString[2] + colorString[2]
        blueHex = colorString[3] + colorString[3]
    }

    return {
        red: parseInt(redHex, 16),
        green: parseInt(greenHex, 16),
        blue: parseInt(blueHex, 16)
    }
}

