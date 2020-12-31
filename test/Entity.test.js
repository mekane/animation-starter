import chai from 'chai';

const expect = chai.expect;

import {Circle} from '../src/Entities.js';
import {Vector} from "../src/Vector.js";

describe('Circle class', () => {
    it('ignores bad values in constructor and defaults to 0 for x and y position', () => {
        const zeroCircle = new Circle(0, 0)
        expect(new Circle()).to.deep.equal(zeroCircle)
        expect(new Circle(true)).to.deep.equal(zeroCircle)
        expect(new Circle('')).to.deep.equal(zeroCircle)
        expect(new Circle([])).to.deep.equal(zeroCircle)
        expect(new Circle({})).to.deep.equal(zeroCircle)

        const c = new Circle();
        expect(c.x).to.equal(0)
        expect(c.y).to.equal(0)
    })

    it('has read-only x and y properties', () => {
        const c = new Circle(2, 3)
        c.x = 9
        c.y = 9
        expect(c.x).to.equal(2)
        expect(c.y).to.equal(3)
    })

    it('has a read-only velocity Vector that defaults to zero', () => {
        const c = new Circle(0, 0)
        expect(c.velocity).to.be.an('object')
        expect(c.velocity.x).to.equal(0)
        expect(c.velocity.y).to.equal(0)

        c.velocity = new Vector(9, 9);
        expect(c.velocity.x).to.equal(0)
        expect(c.velocity.y).to.equal(0)
    })

    it('can be constructed with a velocity Vector object', () => {
        const c = new Circle(0, 0, new Vector(3, 4))
        expect(c.velocity).to.be.an('object')
        expect(c.velocity.x).to.equal(3)
        expect(c.velocity.y).to.equal(4)
    })

    it('can be constructed with a velocity Vector-like object', () => {
        const c = new Circle(0, 0, {x: 3, y: 4})
        expect(c.velocity).to.be.an('object')
        expect(c.velocity.x).to.equal(3)
        expect(c.velocity.y).to.equal(4)
    })

    it('has a read-only size property', () => {
        const c = new Circle(1, 2, new Vector(3, 4), 5)
        c.size = 9
        expect(c.size).to.equal(5)
    })

    it('has a computed area property', () => {
        const c3 = new Circle(0, 0, new Vector(0, 0), 3)
        const c4 = new Circle(0, 0, new Vector(0, 0), 4)
        const c5 = new Circle(0, 0, new Vector(0, 0), 5)

        expect(c3.area).to.equal(28.26)
        expect(c4.area).to.equal(50.24)
        expect(c5.area).to.equal(78.5)
    })
})