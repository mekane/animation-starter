import chai from 'chai';
import deepFreeze from "deep-freeze";
import {circleIntersectsCircle, circleIntersectsRectangle, collide, rectangleIntersectsRectangle} from "../src/physics.js";

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

    it('returns true for circles at a distance equal to their radii', () => {
        const c1 = {size: 10, x: 10, y: 0};
        const c2 = {size: 10, x: 30, y: 0};

        expect(circleIntersectsCircle(c1, c2)).to.equal(true)
    })

    it('returns true for circles at a distance less than their radii', () => {
        const c1 = {size: 10, x: 10, y: 10};
        const c2 = {size: 10, x: 15, y: 15};

        expect(circleIntersectsCircle(c1, c2)).to.equal(true)
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

    it('returns true if r1 right edge overlaps r2 left edge', () => {
        const r1 = {x: 10, y: 10, width: 15, height: 10};
        const r2 = {x: 20, y: 0, width: 30, height: 30};

        expect(rectangleIntersectsRectangle(r1, r2)).to.equal(true)
    })

    it('returns true if r1 left edge overlaps r2 right edge', () => {
        const r1 = {x: 20, y: 0, width: 30, height: 30};
        const r2 = {x: 45, y: 10, width: 15, height: 10};

        expect(rectangleIntersectsRectangle(r1, r2)).to.equal(true)
    })

    it('returns true if r1 bottom edge overlaps r2 top edge', () => {
        const r1 = {x: 20, y: 20, width: 10, height: 15};
        const r2 = {x: 10, y: 10, width: 30, height: 30};

        expect(rectangleIntersectsRectangle(r1, r2)).to.equal(true)
    })

    it('returns true if r1 top edge overlaps r2 bottom edge', () => {
        const r1 = {x: 20, y: 0, width: 10, height: 15};
        const r2 = {x: 10, y: 10, width: 20, height: 20};

        expect(rectangleIntersectsRectangle(r1, r2)).to.equal(true)
    })
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

    it('returns true if the circle overlaps the left edge of the rectangle', () => {
        const r = {x: 30, y: 30, width: 30, height: 30}
        const c = {x: 20, y: 45, size: 15}
        expect(circleIntersectsRectangle(c, r)).to.equal(true)
    })

    it('returns true if the circle overlaps the right edge of the rectangle', () => {
        const r = {x: 30, y: 30, width: 30, height: 30}
        const c = {x: 70, y: 45, size: 15}
        expect(circleIntersectsRectangle(c, r)).to.equal(true)
    })

    it('returns true if the circle overlaps the top edge of the rectangle', () => {
        const r = {x: 30, y: 30, width: 30, height: 30}
        const c = {x: 45, y: 70, size: 15}
        expect(circleIntersectsRectangle(c, r)).to.equal(true)
    })

    it('returns true if the circle overlaps the bottom edge of the rectangle', () => {
        const r = {x: 30, y: 30, width: 30, height: 30}
        const c = {x: 45, y: 20, size: 15}
        expect(circleIntersectsRectangle(c, r)).to.equal(true)
    })
})

describe('Entity Physics - collision effects', () => {
    it('does nothing to missing or bogus arguments', () => {
        const e1 = deepFreeze({});
        const e2 = deepFreeze({});
        expect(f => collide()).not.to.throw();
        expect(f => collide(e1)).not.to.throw();
        expect(f => collide(e1, e2)).not.to.throw();
    })


})