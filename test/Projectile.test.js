import chai from 'chai';
import {Vector} from "../src/Vector.js";
import {Projectile} from "../src/Projectile.js";

const expect = chai.expect;

describe('Projectile class', () => {
    it('derives from Circle', () => {
        const p = new Projectile(1, 2, 3, new Vector(4, 5))
        expect(p.x).to.equal(1)
        expect(p.y).to.equal(2)
        expect(p.size).to.equal(3)
        expect(p.velocity).to.deep.equal(new Vector(4, 5))
    })

    it('marks itself destroyed on collision', () => {
        const p = new Projectile(1, 2, 3)
        expect(p.destroyed).to.equal(false)
        p.collision(new Vector(1, 1))
        expect(p.destroyed).to.equal(true)
    })
})
