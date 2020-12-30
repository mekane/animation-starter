import chai from 'chai';
import deepFreeze from "deep-freeze";

const expect = chai.expect;

import {Entity} from '../src/Entity.js';
import {Vector} from "../src/Vector.js";

describe('Entity Class', () => {
    it('defaults to zeros for x and y', () => {
        const e = new Entity();
        expect(e.x).to.equal(0)
        expect(e.y).to.equal(0)
    })

    it('ignores bad values in constructor and uses 0', () => {
        const zeroEntity = new Entity(0, 0)
        expect(new Entity()).to.deep.equal(zeroEntity)
        expect(new Entity(true)).to.deep.equal(zeroEntity)
        expect(new Entity('')).to.deep.equal(zeroEntity)
        expect(new Entity([])).to.deep.equal(zeroEntity)
        expect(new Entity({})).to.deep.equal(zeroEntity)
    })

    it('has read-only x and y properties', () => {
        const e = new Entity(2, 3)
        e.x = 9
        e.y = 9
        expect(e.x).to.equal(2)
        expect(e.y).to.equal(3)
    })

    it('has a read-only velocity Vector that defaults to zero', () => {
        const e = new Entity(0, 0)
        expect(e.velocity).to.be.an('object')
        expect(e.velocity.x).to.equal(0)
        expect(e.velocity.y).to.equal(0)

        e.velocity = new Vector(9, 9);
        expect(e.velocity.x).to.equal(0)
        expect(e.velocity.y).to.equal(0)
    })

    it('can be constructed with a velocity Vector object', () => {
        const e = new Entity(0, 0, new Vector(3, 4))
        expect(e.velocity).to.be.an('object')
        expect(e.velocity.x).to.equal(3)
        expect(e.velocity.y).to.equal(4)
    })

    it('can be constructed with a velocity Vector-like object', () => {
        const e = new Entity(0, 0, {x: 3, y: 4})
        expect(e.velocity).to.be.an('object')
        expect(e.velocity.x).to.equal(3)
        expect(e.velocity.y).to.equal(4)
    })
})
