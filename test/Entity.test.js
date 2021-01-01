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

    it('has a read-only size property', () => {
        const c = new Circle(1, 2, 5)
        c.size = 9
        expect(c.size).to.equal(5)
    })

    it('can be constructed with a size and velocity Vector object', () => {
        const c = new Circle(0, 0, 10, new Vector(3, 4))
        expect(c.velocity).to.be.an('object')
        expect(c.velocity.x).to.equal(3)
        expect(c.velocity.y).to.equal(4)
    })

    it('can be constructed with a velocity Vector-like object', () => {
        const c = new Circle(0, 0, 10, {x: 3, y: 4})
        expect(c.velocity).to.be.an('object')
        expect(c.velocity.x).to.equal(3)
        expect(c.velocity.y).to.equal(4)
    })

    it('has a computed area property', () => {
        const c3 = new Circle(0, 0, 3)
        const c4 = new Circle(0, 0, 4)
        const c5 = new Circle(0, 0, 5)

        expect(c3.area).to.equal(28.26)
        expect(c4.area).to.equal(50.24)
        expect(c5.area).to.equal(78.5)
    })

    describe('detecting collisions with other circles', () => {
        const circle = new Circle(0, 0, 10)

        it('returns false for no hit', () => {
            const farAwayCircle = new Circle(99, 99)
            expect(circle.hit(farAwayCircle)).to.equal(false)
        })

        it('returns a hit for circles at a distance equal to their radii', () => {
            const circleRight = new Circle(19, 0, 10)
            const expectedHitData = {
                normal: new Vector(1, 0),
                relativeVelocity: new Vector(0, 0),
                speed: 0
                //result: [{vx: 0, vy: 0}, {vx: 0, vy: 0}]
            }
            expect(circle.hit(circleRight)).to.deep.equal(expectedHitData)
        })

        it('returns a hit for a circle at a distance less than their radii', () => {
            const circleUp = new Circle(0, 19, 10)
            const expectedHitDataUp = {
                normal: new Vector(0, 1),
                relativeVelocity: new Vector(0, 0),
                speed: 0
            }
            expect(circle.hit(circleUp)).to.deep.equal(expectedHitDataUp)

            const circleLeft = new Circle(-19, 0, 10)
            const expectedHitDataLeft = {
                normal: new Vector(-1, 0),
                relativeVelocity: new Vector(0, 0),
                speed: 0
            }
            expect(circle.hit(circleLeft)).to.deep.equal(expectedHitDataLeft)

            const circleAtAngle = new Circle(15, 15, 15)
            const expectedHitDataAtAngle = {
                normal: new Vector(0.71, 0.71),
                relativeVelocity: new Vector(0, 0),
                speed: 0
            }
            expect(circle.hit(circleAtAngle)).to.deep.equal(expectedHitDataAtAngle)
        })

        it('calculates relative velocities and speeds', () => {
            const circleRightMovingLeft = new Circle(19, 0, 10, new Vector(-10, 0))
            const expectedHitDataMovingLeft = {
                normal: new Vector(1, 0),
                relativeVelocity: new Vector(10, 0),
                speed: 10
            }
            expect(circle.hit(circleRightMovingLeft)).to.deep.equal(expectedHitDataMovingLeft)

            const circleMovingRight = new Circle(0, 0, 10, new Vector(10, 0))
            const expectedHitData = {
                normal: new Vector(1, 0),
                relativeVelocity: new Vector(20, 0),
                speed: 20
            }
            expect(circleMovingRight.hit(circleRightMovingLeft)).to.deep.equal(expectedHitData)

            const circleAtAngleMoving = new Circle(12, 12, 10, new Vector(-10, -10))
            const expectedHitDataAtAngle = {
                normal: new Vector(0.71, 0.71),
                relativeVelocity: new Vector(20, 10),
                speed: 21.3
            }
            expect(circleMovingRight.hit(circleAtAngleMoving)).to.deep.equal(expectedHitDataAtAngle)
        })
    })

    describe('detecting collisions with rectangles', () => {
        const circle = new Circle(0, 0, 10, new Vector(0, 0))

        it('returns false for no hit', () => {
            const rectFarAwayUp = new Rectangle(0, 99)
            const rectFarAwayRight = new Rectangle(99, 0)
            const rectFarAwayDown = new Rectangle(0, -99)
            const rectFarAwayLeft = new Rectangle(-99, 0)
            expect(circle.hit(rectFarAwayUp)).to.equal(false)
            expect(circle.hit(rectFarAwayRight)).to.equal(false)
            expect(circle.hit(rectFarAwayDown)).to.equal(false)
            expect(circle.hit(rectFarAwayLeft)).to.equal(false)
        })

        it.skip('returns a hit for rectangles that overlap', () => {
            const rectHitUp = new Rectangle(0, 9)
            const rectHitTopRight = new Rectangle(7, 7, 5, 5, new Vector(-1, -1))
            const rectHitRight = new Rectangle(9, 0)
            const rectHitDown = new Rectangle(0, -9)
            const rectHitLeft = new Rectangle(-9, 0)

            const expectedHitUp = {
                edge: 'bottom',
                normal: new Vector(-0, 1),
                relativeVelocity: new Vector(0, 0),
                speed: 0,
                x: 0,
                y: 9
            }
            const expectedHitTopRight = {
                edge: 'bottom',
                normal: new Vector(-0, 1),
                relativeVelocity: new Vector(-1, -1),
                speed: -1,
                x: 7,
                y: 7
            }
            const expectedHitRight = {
                edge: 'bottom',
                normal: new Vector(-0, 1),
                relativeVelocity: new Vector(0, 0),
                speed: 0,
                x: 9,
                y: 0
            }
            const expectedHitDown = {
                edge: 'top',
                normal: new Vector(-0, -1),
                relativeVelocity: new Vector(0, 0),
                speed: -0,
                x: 0,
                y: -8
            }
            const expectedHitLeft = {
                edge: 'bottom',
                normal: new Vector(-0, 1),
                relativeVelocity: new Vector(0, 0),
                speed: 0,
                x: -8,
                y: 0
            }

            expect(circle.hit(rectHitUp)).to.deep.equal(expectedHitUp)
            expect(circle.hit(rectHitRight)).to.deep.equal(expectedHitRight)
            expect(circle.hit(rectHitDown)).to.deep.equal(expectedHitDown)
            expect(circle.hit(rectHitLeft)).to.deep.equal(expectedHitLeft)
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

    it('has read-only width and height properties', () => {
        const r = new Rectangle(1, 2, 5, 6)
        r.width = 9
        r.height = 9
        expect(r.width).to.equal(5)
        expect(r.height).to.equal(6)
    })

    it('has a read-only velocity Vector that defaults to zero', () => {
        const r = new Rectangle(0, 0)
        expect(r.velocity).to.deep.equal(new Vector(0, 0))

        r.velocity = new Vector(9, 9);
        expect(r.velocity.x).to.equal(0)
        expect(r.velocity.y).to.equal(0)
    })

    it('can be constructed with a velocity Vector object', () => {
        const r = new Rectangle(0, 0, 1, 2, new Vector(3, 4))
        expect(r.velocity).to.be.an('object')
        expect(r.velocity.x).to.equal(3)
        expect(r.velocity.y).to.equal(4)
    })

    it('can be constructed with a velocity Vector-like object', () => {
        const r = new Rectangle(0, 0, 1, 2, {x: 3, y: 4})
        expect(r.velocity).to.be.an('object')
        expect(r.velocity.x).to.equal(3)
        expect(r.velocity.y).to.equal(4)
    })

    it('has a computed area property', () => {
        const r3 = new Rectangle(0, 0, 3, 4)
        const r4 = new Rectangle(0, 0, 4, 5)
        const r5 = new Rectangle(0, 0, 5, 6)

        expect(r3.area).to.equal(12)
        expect(r4.area).to.equal(20)
        expect(r5.area).to.equal(30)
    })

    describe('detecting collisions with other rectangles', () => {
        const rect = new Rectangle(0, 0, 10, 10)

        it('returns false for no hit', () => {
            expect(rect.hit(new Rectangle(0, 99))).to.equal(false)
            expect(rect.hit(new Rectangle(99, 0))).to.equal(false)
            expect(rect.hit(new Rectangle(0, -99))).to.equal(false)
            expect(rect.hit(new Rectangle(-99, 0))).to.equal(false)
        })

        it('returns a hit for rectangles that overlap', () => {
            //const rect = new Rectangle(0, 0, 10, )
        })

        it('calculates relative velocities and speeds')
    })

    describe('detecting collisions with circles', () => {
        const rect = new Rectangle(-5, -5, 10, 10)

        it('returns false for no hit', () => {
            expect(rect.hit(new Circle(0, 99))).to.equal(false)
            expect(rect.hit(new Circle(99, 0))).to.equal(false)
            expect(rect.hit(new Circle(0, -99))).to.equal(false)
            expect(rect.hit(new Circle(-99, 0))).to.equal(false)
        })

        it('returns a hit for circles that overlap', () => {
            const circleHitUp = new Circle(0, 6, 2, new Vector(-1, -1));
            const circleHitRight = new Circle(6, 0, 2, new Vector(-2, 1))
            const circleHitDown = new Circle(0, -6, 2, new Vector(1, 2))
            const circleHitLeft = new Circle(-6, 0, 2, new Vector(0, 0))

            const expectedHitUp = {
                edge: 'top',
                normal: new Vector(0, 1),
                relativeVelocity: new Vector(1, 1),
                speed: 1,
                x: 0,
                y: 5
            }
            const expectedHitRight = {
                edge: 'right',
                normal: new Vector(1, 0),
                relativeVelocity: new Vector(2, -1),
                speed: 2,
                x: 5,
                y: 0
            }
            const expectedHitDown = {
                edge: 'bottom',
                normal: new Vector(0, -1),
                relativeVelocity: new Vector(-1, -2),
                speed: 2,
                x: 0,
                y: -5
            }
            const expectedHitLeft = {
                edge: 'left',
                normal: new Vector(-1, 0),
                relativeVelocity: new Vector(0, 0),
                speed: 0,
                x: -5,
                y: 0
            }

            expect(rect.hit(circleHitUp)).to.deep.equal(expectedHitUp)
            expect(rect.hit(circleHitRight)).to.deep.equal(expectedHitRight)
            expect(rect.hit(circleHitDown)).to.deep.equal(expectedHitDown)
            expect(rect.hit(circleHitLeft)).to.deep.equal(expectedHitLeft)
        })
    })
})

// uses physics to determine hits with other circles
// uses physics to determine hits with other rectangles
// has a shape property (previous will make this necessary?)