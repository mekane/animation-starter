import chai from 'chai';
import deepFreeze from "deep-freeze";

const expect = chai.expect;

import {
    dot,
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

describe('Dot Product of two Vectors', () => {
    it(`returns 0 for bad inputs`, () => {
        expect(dot()).to.equal(0)
        expect(dot(true)).to.equal(0)
        expect(dot(1)).to.equal(0)
        expect(dot('')).to.equal(0)
        expect(dot([])).to.equal(0)
        expect(dot({x: 1, y: 1})).to.equal(0)
    })

    it(`does not modify the arguments`, () => {
        const input1 = {x: 1, y: 1}
        const input2 = {x: 2, y: 2}
        deepFreeze(input1);
        deepFreeze(input2);

        expect(_ => dot(input1, input2)).to.not.throw();
    })

    it(`returns a number value`, () => {
        expect(dot({x: 0, y: 1}, {x: 1, y: 1})).to.equal(1)
        expect(dot({x: .5, y: .5}, {x: 1, y: 1})).to.equal(1)
        expect(dot({x: 1, y: 1}, {x: 1, y: 1})).to.equal(2)
        expect(dot({x: 1, y: 2}, {x: 3, y: 4})).to.equal(11)
        expect(dot({x: -5, y: 5}, {x: 5, y: -5})).to.equal(-50)
    })
})
