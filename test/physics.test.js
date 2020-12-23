import chai from 'chai';
import deepFreeze from "deep-freeze";
import physics, {
    circleIntersectsCircle,
    circleIntersectsRectangle,
    rectangleIntersectsRectangle
} from "../src/physics.js";

const expect = chai.expect;

describe('Intersecting Entities - two circles', () => {
    it('the collision function returns false for missing and bogus data', () => {
        expect(circleIntersectsCircle()).to.equal(false)
        expect(circleIntersectsCircle({})).to.equal(false)
        expect(circleIntersectsCircle({}, {})).to.equal(false)
    })

    it('returns false for circles far apart', () => {
        const c1 = {size: 10, x: 10, y: 0};
        const c2 = {size: 10, x: 99, y: 0};

        expect(circleIntersectsCircle(c1, c2)).to.equal(false)
    })

    it('returns hit data for circles at a distance equal to their radii', () => {
        const c1 = {size: 10, x: 10, y: 0};
        const c2 = {size: 10, x: 30, y: 0};

        expect(circleIntersectsCircle(c1, c2)).to.be.an('object').with.property('normal')
    })

    it('returns hit data for circles at a distance less than their radii', () => {
        const c1 = {size: 10, x: 10, y: 10};
        const c2 = {size: 10, x: 15, y: 15};

        expect(circleIntersectsCircle(c1, c2)).to.be.an('object').with.property('normal')
    })

    it('returns a normalized vector indicating direction of collision', () => {
        const e1 = {x: 0, y: 0, size: 10}
        const e2 = {x: 10, y: 0, size: 1}
        expect(circleIntersectsCircle(e1, e2).normal).to.deep.equal({x: 1.0, y: 0});

        const e3 = {x: 10, y: 0, size: 1}
        const e4 = {x: 0, y: 0, size: 10}
        expect(circleIntersectsCircle(e3, e4).normal).to.deep.equal({x: -1.0, y: 0});

        const e5 = {x: 0, y: 0, size: 10}
        const e6 = {x: 0, y: 10, size: 1}
        expect(circleIntersectsCircle(e5, e6).normal).to.deep.equal({x: 0, y: 1.0});

        const e7 = {x: 0, y: 0, size: 9}
        const e8 = {x: 10, y: 10, size: 6}
        const normal45Deg = circleIntersectsCircle(e7, e8).normal;
        expect(normal45Deg.x.toFixed(3)).to.equal('0.707');
        expect(normal45Deg.y.toFixed(3)).to.equal('0.707');
    })

    it('includes the relative velocity and collision magnitude in the hit data', () => {
        const c1 = {x: 0, y: 0, size: 10}
        const c2 = {x: 0, y: 20, size: 10}
        const hit = circleIntersectsCircle(c1, c2);
        expect(hit.relativeVelocity).to.deep.equal({x: 0, y: 0});

        const c3 = {x: 0, y: 0, vx: -10, size: 10}
        const c4 = {x: 0, y: 20, size: 10}
        const hit2 = circleIntersectsCircle(c3, c4);
        expect(hit2.relativeVelocity).to.deep.equal({x: -10, y: 0});
    })

    it('includes changes in velocity based on the collision', () => {
        const c1 = {x: 0, y: 0, vx: 1, vy: 0, size: 10}
        const c2 = {x: 19, y: 0, vx: -1, vy: 0, size: 10}
        const hit = circleIntersectsCircle(c1, c2);

        expect(hit.result).to.deep.equal([
            {
                vx: -2,
                vy: 0
            },
            {
                vx: 2,
                vy: 0
            }
        ])
    })
})

describe('Intersecting Entities - two rectangles', () => {
    it('the collision function returns false for missing and bogus data', () => {
        expect(rectangleIntersectsRectangle()).to.equal(false)
        expect(rectangleIntersectsRectangle({})).to.equal(false)
        expect(rectangleIntersectsRectangle({}, {})).to.equal(false)
    })

    it('returns false for rectangles far apart', () => {
        const r1 = {x: 10, y: 0, width: 10, height: 10};
        const r2 = {x: 99, y: 0, width: 10, height: 10};
        expect(rectangleIntersectsRectangle(r1, r2)).to.equal(false)

        const r3 = {x: 99, y: 0, width: 10, height: 10};
        const r4 = {x: 10, y: 0, width: 10, height: 10};
        expect(rectangleIntersectsRectangle(r3, r4)).to.equal(false)

        const r5 = {x: 0, y: 10, width: 10, height: 10};
        const r6 = {x: 0, y: 99, width: 10, height: 10};
        expect(rectangleIntersectsRectangle(r5, r6)).to.equal(false)

        const r7 = {x: 0, y: 99, width: 10, height: 10};
        const r8 = {x: 0, y: 10, width: 10, height: 10};
        expect(rectangleIntersectsRectangle(r7, r8)).to.equal(false)
    })

    it('returns hit data if r1 right edge overlaps r2 left edge', () => {
        const r1 = {x: 10, y: 10, width: 15, height: 10};
        const r2 = {x: 20, y: 0, width: 30, height: 30};

        expect(rectangleIntersectsRectangle(r1, r2)).to.equal(true)
    })

    it('returns hit data if r1 left edge overlaps r2 right edge', () => {
        const r1 = {x: 20, y: 0, width: 30, height: 30};
        const r2 = {x: 45, y: 10, width: 15, height: 10};

        expect(rectangleIntersectsRectangle(r1, r2)).to.equal(true)
    })

    it('returns hit data if r1 bottom edge overlaps r2 top edge', () => {
        const r1 = {x: 20, y: 20, width: 10, height: 15};
        const r2 = {x: 10, y: 10, width: 30, height: 30};

        expect(rectangleIntersectsRectangle(r1, r2)).to.equal(true)
    })

    it('returns hit data if r1 top edge overlaps r2 bottom edge', () => {
        const r1 = {x: 20, y: 0, width: 10, height: 15};
        const r2 = {x: 10, y: 10, width: 20, height: 20};

        expect(rectangleIntersectsRectangle(r1, r2)).to.equal(true)
    })

    it('returns a normalized vector indicating direction of collision')

    it('includes the relative velocity and collision magnitude in the hit data')

    it('includes changes in velocity based on the collision')
})

describe('Intersecting Entities - a rectangle and a circle', () => {
    it('returns false for missing and bogus data', () => {
        expect(circleIntersectsRectangle()).to.equal(false)
        expect(circleIntersectsRectangle({})).to.equal(false)
        expect(circleIntersectsRectangle({}, {})).to.equal(false)
    })

    it('returns false for circles and rectangles far apart', () => {
        const r = {x: 30, y: 30, width: 30, height: 30}

        const cLeft = {x: 15, y: 45, size: 5}
        expect(circleIntersectsRectangle(cLeft, r)).to.equal(false)

        const cTop = {x: 45, y: 90, size: 5}
        expect(circleIntersectsRectangle(cTop, r)).to.equal(false)

        const cRight = {x: 95, y: 45, size: 5}
        expect(circleIntersectsRectangle(cRight, r)).to.equal(false)

        const cBottom = {x: 45, y: 10, size: 5}
        expect(circleIntersectsRectangle(cBottom, r)).to.equal(false)
    })

    it('returns hit data if the circle overlaps the left edge of the rectangle', () => {
        const rect = {x: 30, y: 30, width: 30, height: 30}
        const cLeft = {x: 20, y: 45, size: 15}

        const hitData = circleIntersectsRectangle(rect, cLeft)
        expect(hitData.edge).to.equal('left');
        expect(hitData.normal).to.deep.equal({x: -1, y: 0});
        expect(hitData.x).to.equal(30);
        expect(hitData.y).to.equal(45);
    })

    it('returns a hit if the circle overlaps the right edge of the rectangle', () => {
        const rect = {x: 30, y: 30, width: 30, height: 30}
        const cRight = {x: 70, y: 45, size: 15}

        const hitData = circleIntersectsRectangle(rect, cRight)
        expect(hitData.edge).to.equal('right');
        expect(hitData.normal).to.deep.equal({x: 1, y: 0});
        expect(hitData.x).to.equal(60);
        expect(hitData.y).to.equal(45);
    })

    it('returns a hit if the circle overlaps the top edge of the rectangle', () => {
        const rect = {x: 30, y: 30, width: 30, height: 30}
        const cTop = {x: 45, y: 70, size: 15}

        const hitData = circleIntersectsRectangle(rect, cTop)
        expect(hitData.edge).to.equal('top');
        expect(hitData.normal).to.deep.equal({x: 0, y: 1});
        expect(hitData.x).to.equal(45);
        expect(hitData.y).to.equal(60);
    })

    it('returns a hit if the circle overlaps the bottom edge of the rectangle', () => {
        const rect = {x: 30, y: 30, width: 30, height: 30}
        const cBottom = {x: 45, y: 20, size: 15}

        const hitData = circleIntersectsRectangle(rect, cBottom)
        expect(hitData.edge).to.equal('bottom');
        expect(hitData.normal).to.deep.equal({x: 0, y: -1});
        expect(hitData.x).to.equal(45);
        expect(hitData.y).to.equal(30);
    })

    it('includes the relative velocity and collision magnitude in the hit data', () => {
        const c1 = {x: 0, y: 0, size: 10}
        const r1 = {x: 0, y: -5, width: 10, height: 10}
        const hit = circleIntersectsRectangle(c1, r1);
        expect(hit.relativeVelocity).to.deep.equal({x: 0, y: 0});
        expect(hit.speed).to.equal(0);

        const c2 = {x: 0, y: 0, vx: 10, size: 10}
        const r2 = {x: 9, y: -5, width: 10, height: 10}
        const hit2 = circleIntersectsRectangle(c2, r2);
        expect(hit2.relativeVelocity).to.deep.equal({x: 10, y: 0});
        expect(hit2.speed).to.equal(10);
    })

    it('includes changes in velocity based on the collision', () => {
        const rect = {x: -10, y: -10, vx: 1, vy: 0, width: 20, height: 20}
        const circle = {x: 19, y: 0, vx: -1, vy: 0, size: 10}

        const hit = circleIntersectsRectangle(rect, circle)
        expect(hit.result).to.deep.equal([
            {
                vx: -1.759,
                vy: 0
            },
            {
                vx: 2.241,
                vy: 0
            }
        ])

        /* Order should not matter */
        const hit2 = circleIntersectsRectangle(circle, rect)
        expect(hit2.result).to.deep.equal([
            {
                vx: 2.241,
                vy: 0
            },
            {
                vx: -1.759,
                vy: 0
            }
        ])
    })
})

describe('Test Scenarios', () => {

})