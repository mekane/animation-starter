import chai from 'chai';

const expect = chai.expect;

import {Circle, Rectangle} from '../src/Entities.js';
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

    describe('detecting collisions with other circles', () => {
        const circle = new Circle(0, 0, new Vector(0, 0), 10)

        it('returns false for no hit', () => {
            const farAwayCircle = new Circle(99, 99)
            expect(circle.hit(farAwayCircle)).to.equal(false)
        })

        it('returns a hit for circles at a distance equal to their radii', () => {
            const circleRight = new Circle(19, 0, new Vector(0, 0), 10)
            const expectedHitData = {
                normal: new Vector(1, 0),
                relativeVelocity: new Vector(0, 0),
                speed: 0
                //result: [{vx: 0, vy: 0}, {vx: 0, vy: 0}]
            }
            expect(circle.hit(circleRight)).to.deep.equal(expectedHitData)
        })

        it('returns a hit for a circle at a distance less than their radii', () => {
            const circleUp = new Circle(0, 19, new Vector(0, 0), 10)
            const expectedHitDataUp = {
                normal: new Vector(0, 1),
                relativeVelocity: new Vector(0, 0),
                speed: 0
            }
            expect(circle.hit(circleUp)).to.deep.equal(expectedHitDataUp)

            const circleLeft = new Circle(-19, 0, new Vector(0, 0), 10)
            const expectedHitDataLeft = {
                normal: new Vector(-1, 0),
                relativeVelocity: new Vector(0, 0),
                speed: 0
            }
            expect(circle.hit(circleLeft)).to.deep.equal(expectedHitDataLeft)

            const circleAtAngle = new Circle(15, 15, new Vector(0, 0), 15)
            const expectedHitDataAtAngle = {
                normal: new Vector(0.71, 0.71),
                relativeVelocity: new Vector(0, 0),
                speed: 0
            }
            expect(circle.hit(circleAtAngle)).to.deep.equal(expectedHitDataAtAngle)
        })

        it('calculates relative velocities and speeds', () => {
            const circleRightMovingLeft = new Circle(19, 0, new Vector(-10, 0), 10)
            const expectedHitDataMovingLeft = {
                normal: new Vector(1, 0),
                relativeVelocity: new Vector(10, 0),
                speed: 10
            }
            expect(circle.hit(circleRightMovingLeft)).to.deep.equal(expectedHitDataMovingLeft)

            const circleMovingRight = new Circle(0, 0, new Vector(10, 0), 10)
            const expectedHitData = {
                normal: new Vector(1, 0),
                relativeVelocity: new Vector(20, 0),
                speed: 20
            }
            expect(circleMovingRight.hit(circleRightMovingLeft)).to.deep.equal(expectedHitData)

            const circleAtAngleMoving = new Circle(12, 12, new Vector(-10, -10), 10)
            const expectedHitDataAtAngle = {
                normal: new Vector(0.71, 0.71),
                relativeVelocity: new Vector(20, 10),
                speed: 21.3
            }
            expect(circleMovingRight.hit(circleAtAngleMoving)).to.deep.equal(expectedHitDataAtAngle)
        })
    })
})

describe('Rectangle class', () => {
    it('ignores bad values in constructor and defaults to 0 for x and y position', () => {
        const zeroRectangle = new Rectangle(0, 0)
        expect(new Rectangle()).to.deep.equal(zeroRectangle)
        expect(new Rectangle(true)).to.deep.equal(zeroRectangle)
        expect(new Rectangle('')).to.deep.equal(zeroRectangle)
        expect(new Rectangle([])).to.deep.equal(zeroRectangle)
        expect(new Rectangle({})).to.deep.equal(zeroRectangle)

        const r = new Rectangle();
        expect(r.x).to.equal(0)
        expect(r.y).to.equal(0)
    })

    it('has read-only x and y properties', () => {
        const r = new Rectangle(2, 3)
        r.x = 9
        r.y = 9
        expect(r.x).to.equal(2)
        expect(r.y).to.equal(3)
    })

    it('has a read-only velocity Vector that defaults to zero', () => {
        const r = new Rectangle(0, 0)
        expect(r.velocity).to.deep.equal(new Vector(0, 0))

        r.velocity = new Vector(9, 9);
        expect(r.velocity.x).to.equal(0)
        expect(r.velocity.y).to.equal(0)
    })

    it('can be constructed with a velocity Vector object', () => {
        const r = new Rectangle(0, 0, new Vector(3, 4))
        expect(r.velocity).to.be.an('object')
        expect(r.velocity.x).to.equal(3)
        expect(r.velocity.y).to.equal(4)
    })

    it('can be constructed with a velocity Vector-like object', () => {
        const r = new Rectangle(0, 0, {x: 3, y: 4})
        expect(r.velocity).to.be.an('object')
        expect(r.velocity.x).to.equal(3)
        expect(r.velocity.y).to.equal(4)
    })

    it('has read-only width and height property', () => {
        const r = new Rectangle(1, 2, new Vector(3, 4), 5, 6)
        r.width = 9
        r.height = 9
        expect(r.width).to.equal(5)
        expect(r.height).to.equal(6)
    })

    it('has a computed area property', () => {
        const r3 = new Rectangle(0, 0, new Vector(0, 0), 3, 4)
        const r4 = new Rectangle(0, 0, new Vector(0, 0), 4, 5)
        const r5 = new Rectangle(0, 0, new Vector(0, 0), 5, 6)

        expect(r3.area).to.equal(12)
        expect(r4.area).to.equal(20)
        expect(r5.area).to.equal(30)
    })
})

// uses physics to determine hits with other circles
// uses physics to determine hits with other rectangles
// has a shape property (previous will make this necessary?)