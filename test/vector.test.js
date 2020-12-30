import chai from 'chai';
import deepFreeze from "deep-freeze";

const expect = chai.expect;

import {
    reverse
} from '../src/vector.js';

const zeroVector = {x: 0, y: 0}

describe('Reversing Vectors', () => {
    it(`returns {x: 0, y: 0} for bad inputs`, () => {
        expect(reverse()).to.deep.equal(zeroVector)
        expect(reverse(true)).to.deep.equal(zeroVector)
        expect(reverse(1)).to.deep.equal(zeroVector)
        expect(reverse('')).to.deep.equal(zeroVector)
        expect(reverse([])).to.deep.equal(zeroVector)
    })

    it(`fills missing or bad values with zeros`, () => {
        expect(reverse({})).to.deep.equal(zeroVector)
        expect(reverse({x: 'bad'})).to.deep.equal(zeroVector)
        expect(reverse({x: 0})).to.deep.equal(zeroVector)
        expect(reverse({x: 0, y: 'bad'})).to.deep.equal(zeroVector)
    })

    it(`does not modify the old vector and returns a new one`, () => {
        const input = {x: 1, y: 1}
        deepFreeze(input);

        expect(_ => reverse(input)).to.not.throw();
        expect(reverse(input)).to.not.equal(input);
    })

    it(`negates positive values and negative values`, () => {
        expect(reverse({x: 1, y: 1})).to.deep.equal({x: -1, y: -1})
        expect(reverse({x: -1, y: -1})).to.deep.equal({x: 1, y: 1})
        expect(reverse({x: 1, y: -1})).to.deep.equal({x: -1, y: 1})
        expect(reverse({x: -1, y: 1})).to.deep.equal({x: 1, y: -1})
    })
})

describe('Dot Product of Vector and Scalar', () => {
    it(``, () => {

    })
})
