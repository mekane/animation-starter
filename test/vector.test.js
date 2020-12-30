import chai from 'chai';
import deepFreeze from "deep-freeze";

const expect = chai.expect;

import {
    add,
    dot,
    reverse,
    subtract
} from '../src/vector.js';

const zeroVector = {x: 0, y: 0}

describe('Adding two Vectors', () => {
    it(`returns {x: 0, y: 0} for bad inputs`, () => {
        expect(add()).to.deep.equal(zeroVector)
        expect(add(true)).to.deep.equal(zeroVector)
        expect(add(1)).to.deep.equal(zeroVector)
        expect(add('')).to.deep.equal(zeroVector)
        expect(add([])).to.deep.equal(zeroVector)
    })

    it(`fills missing or bad values with zeros`, () => {
        expect(add({})).to.deep.equal(zeroVector)
        expect(add({x: 'bad'})).to.deep.equal(zeroVector)
        expect(add({x: 0})).to.deep.equal(zeroVector)
        expect(add({x: 0, y: 'bad'})).to.deep.equal(zeroVector)

        const onesVector = {x: 1, y: 1};
        expect(add(onesVector)).to.deep.equal(onesVector)
        expect(add(onesVector, 0)).to.deep.equal(onesVector)
        expect(add(onesVector, true)).to.deep.equal(onesVector)
        expect(add(onesVector, '')).to.deep.equal(onesVector)
        expect(add(onesVector, [])).to.deep.equal(onesVector)
    })

    it(`does not modify the arguments and returns a new vector`, () => {
        const input1 = {x: 1, y: 1}
        const input2 = {x: 2, y: 2}
        deepFreeze(input1);
        deepFreeze(input2);

        expect(_ => add(input1, input2)).to.not.throw();
        expect(add(input1, input2)).to.not.equal(input1);
        expect(add(input1, input2)).to.not.equal(input2);
    })

    it(`adds the corresponding values`, () => {
        expect(add({x: 0, y: 0}, {x: 1, y: 1})).to.deep.equal({x: 1, y: 1})
        expect(add({x: 1, y: 1}, {x: 2, y: 3})).to.deep.equal({x: 3, y: 4})
        expect(add({x: -5, y: -5}, {x: 10, y: 15})).to.deep.equal({x: 5, y: 10})
        expect(add({x: 1, y: 1}, {x: 9, y: 9})).to.deep.equal({x: 10, y: 10})
    })
})

describe('Subtracting two Vectors', () => {
    it(`returns {x: 0, y: 0} for bad inputs`, () => {
        expect(subtract()).to.deep.equal(zeroVector)
        expect(subtract(true)).to.deep.equal(zeroVector)
        expect(subtract(1)).to.deep.equal(zeroVector)
        expect(subtract('')).to.deep.equal(zeroVector)
        expect(subtract([])).to.deep.equal(zeroVector)
    })

    it(`fills missing or bad values with zeros`, () => {
        expect(subtract({})).to.deep.equal(zeroVector)
        expect(subtract({x: 'bad'})).to.deep.equal(zeroVector)
        expect(subtract({x: 0})).to.deep.equal(zeroVector)
        expect(subtract({x: 0, y: 'bad'})).to.deep.equal(zeroVector)

        const onesVector = {x: 1, y: 1};
        expect(subtract(onesVector)).to.deep.equal(onesVector)
        expect(subtract(onesVector, 0)).to.deep.equal(onesVector)
        expect(subtract(onesVector, true)).to.deep.equal(onesVector)
        expect(subtract(onesVector, '')).to.deep.equal(onesVector)
        expect(subtract(onesVector, [])).to.deep.equal(onesVector)
    })

    it(`does not modify the arguments and returns a new vector`, () => {
        const input1 = {x: 1, y: 1}
        const input2 = {x: 2, y: 2}
        deepFreeze(input1);
        deepFreeze(input2);

        expect(_ => subtract(input1, input2)).to.not.throw();
        expect(subtract(input1, input2)).to.not.equal(input1);
        expect(subtract(input1, input2)).to.not.equal(input2);
    })

    it(`subtracts the corresponding values`, () => {
        expect(subtract({x: 0, y: 0}, {x: 1, y: 1})).to.deep.equal({x: -1, y: -1})
        expect(subtract({x: 1, y: 1}, {x: 2, y: 3})).to.deep.equal({x: -1, y: -2})
        expect(subtract({x: -5, y: -5}, {x: 10, y: 15})).to.deep.equal({x: -15, y: -20})
        expect(subtract({x: 10, y: 10}, {x: 9, y: 9})).to.deep.equal({x: 1, y: 1})
    })
})

describe('Reversing a Vector', () => {
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
