import chai from 'chai';
import deepFreeze from "deep-freeze";

const expect = chai.expect;

import {Vector} from '../src/vector.js';

describe('Vector Class', () => {
    it('defaults to zeros for x and y', () => {
        const v = new Vector();
        expect(v.x).to.equal(0)
        expect(v.y).to.equal(0)
    })

    it('ignores bad values in constructor and uses 0', () => {
        const zeroVector = new Vector(0, 0)
        expect(new Vector()).to.deep.equal(zeroVector)
        expect(new Vector(true)).to.deep.equal(zeroVector)
        expect(new Vector('')).to.deep.equal(zeroVector)
        expect(new Vector([])).to.deep.equal(zeroVector)
        expect(new Vector({})).to.deep.equal(zeroVector)
    })
})

describe('Adding a Vector to a Vector', () => {
    it(`does not modify the arguments and returns a new vector`, () => {
        const v1 = new Vector(1, 1)
        const v2 = new Vector(2, 2)
        deepFreeze(v1);
        deepFreeze(v2);

        expect(_ => v1.add(v2)).to.not.throw();
        expect(v1.add(v2)).to.not.equal(v1);
        expect(v1.add(v2)).to.not.equal(v2);
    })

    it(`adds the corresponding values`, () => {
        const v1 = new Vector(0, 0)
        expect(v1.add(new Vector(1, 1))).to.deep.equal({x: 1, y: 1})

        const v2 = new Vector(1, 1)
        expect(v2.add(new Vector(2, 3))).to.deep.equal({x: 3, y: 4})

        const v3 = new Vector(-5, -5)
        expect(v3.add(new Vector(10, 15))).to.deep.equal({x: 5, y: 10})

        const v4 = new Vector(1, 1)
        expect(v4.add(new Vector(9, 9))).to.deep.equal({x: 10, y: 10})
    })
})

describe('Dot Product of two Vectors', () => {
    it(`does not modify the arguments`, () => {
        const v1 = new Vector(1, 1)
        const v2 = new Vector(2, 2)
        deepFreeze(v1);
        deepFreeze(v2);

        expect(_ => v1.dot(v2)).to.not.throw();
    })

    it(`returns a number value`, () => {
        expect(new Vector(0, 1).dot(new Vector(1, 1))).to.equal(1)
        expect(new Vector(.5, .5).dot(new Vector(1, 1))).to.equal(1)
        expect(new Vector(1, 1).dot(new Vector(1, 1))).to.equal(2)
        expect(new Vector(1, 2).dot(new Vector(3, 4))).to.equal(11)
        expect(new Vector(-5, 5).dot(new Vector(5, -5))).to.equal(-50)
    })
})

describe('Reversing a Vector', () => {
    it(`does not modify the old vector and returns a new one`, () => {
        const v1 = new Vector(1, 1)
        deepFreeze(v1);

        expect(_ => v1.reverse()).to.not.throw();
        expect(v1.reverse()).to.not.equal(v1);
    })

    it(`negates positive values and negative values`, () => {
        expect(new Vector(1, 1).reverse()).to.deep.equal({x: -1, y: -1})
        expect(new Vector(-1, -1).reverse()).to.deep.equal({x: 1, y: 1})
        expect(new Vector(1, -1).reverse()).to.deep.equal({x: -1, y: 1})
        expect(new Vector(-1, 1).reverse()).to.deep.equal({x: 1, y: -1})
    })
})

describe('Subtracting a Vector from a Vector', () => {
    it(`does not modify the arguments and returns a new vector`, () => {
        const v1 = new Vector(1, 1)
        const v2 = new Vector(2, 2)
        deepFreeze(v1);
        deepFreeze(v2);

        expect(_ => v1.subtract(v2)).to.not.throw();
        expect(v1.subtract(v2)).to.not.equal(v1);
        expect(v1.subtract(v2)).to.not.equal(v2);
    })

    it(`subtracts the corresponding values`, () => {
        const v1 = new Vector(0, 0)
        expect(v1.subtract(new Vector(1, 1))).to.deep.equal({x: -1, y: -1})

        const v2 = new Vector(1, 1)
        expect(v2.subtract(new Vector(2, 3))).to.deep.equal({x: -1, y: -2})

        const v3 = new Vector(-5, -5)
        expect(v3.subtract(new Vector(10, 15))).to.deep.equal({x: -15, y: -20})

        const v4 = new Vector(10, 10)
        expect(v4.subtract(new Vector(9, 9))).to.deep.equal({x: 1, y: 1})
    })
})
