import {Vector} from "./Vector.js";
import {roundTo} from './math.js'

/**
 * Base class for objects within games. Should not be used directly.
 * @abstract
 */
export class Entity {
    _xPosition
    _yPosition
    _velocity

    /**
     *
     * @param x {Number}
     * @param y {Number}
     * @param v {Vector | {x: Number, y: Number}}
     */
    constructor(x = 0, y = 0, v = new Vector(0, 0)) {
        this._xPosition = _number(x)
        this._yPosition = _number(y)

        this._velocity = new Vector(v.x, v.y)
    }

    get x() {
        return this._xPosition
    }

    set x(val) {
        return false
    }

    get y() {
        return this._yPosition
    }

    set y(val) {
        return false
    }

    /**
     * @returns {Vector}
     */
    get velocity() {
        return this._velocity
    }

    set velocity(val) {
        return false
    }

    /**
     * @param v {Vector}
     */
    accelerate(v) {
        this._velocity = this._velocity.add(v)
    }

    /** @abstract */
    get area() {
    }

    /** @abstract */
    get centerPoint() {
    }

    /**
     * Returns the acceleration that the Circle and other Entity would
     * experience if they collided.
     * @param e {Entity}
     * @param normal {Vector} - the normalized direction of the collision (from hit)
     */
    collisionEffects(e, normal) {
        const relativeVelocity = this._velocity.subtract(e.velocity)
        const speed = normal.dot(relativeVelocity);

        if (speed < 0 || isNaN(speed))
            return [
                new Vector(0, 0),
                new Vector(0, 0)
            ];

        const mass1 = this.area;
        const mass2 = e.area;
        const impulse = 2 * speed / (mass1 + mass2);

        return [
            new Vector(
                roundTo(-impulse * mass2 * normal.x, 3),
                roundTo(-impulse * mass2 * normal.y, 3)
            ),
            new Vector(
                roundTo(impulse * mass1 * normal.x, 3),
                roundTo(impulse * mass1 * normal.y, 3)
            )
        ]
    }

    /** @abstract */
    hit(otherEntity) {
    }

    /**
     * Updates this Entity's position according to its current velocity, scaled
     * according to a time parameter.
     * @param time {Number}
     */
    updatePosition(time) {
        this.lastHit = null
        this._xPosition += roundTo(this.velocity.x * time, 2)
        this._yPosition += roundTo(this.velocity.y * time, 2)
    }

}

/**
 *
 */
export class Circle extends Entity {
    _size = 1

    constructor(x, y, size = 1, velocity) {
        super(x, y, velocity)
        this._size = size
    }

    get size() {
        return this._size
    }

    set size(val) {
        return false
    }

    get area() {
        return roundTo(3.14 * this._size * this._size, 2);
    }

    get centerPoint() {
        return {
            x: this._xPosition,
            y: this._yPosition
        }
    }

    /**
     * @param e {Entity}
     */
    hit(e) {
        if (e instanceof Circle)
            return this.hitsCircle(e)
        if (e instanceof Rectangle)
            return this.hitsRectangle(e)
        return false
    }

    /**
     * @param c2 {Circle}
     */
    hitsCircle(c2) {
        const dx = c2.x - this.x;
        const dy = c2.y - this.y;
        const dSquared = (dx * dx) + (dy * dy);

        const dr = (this.size + c2.size);
        const rSquared = dr * dr;

        const hit = (dSquared <= rSquared);

        if (hit) {
            const d = Math.sqrt(dSquared);
            const normal = new Vector(roundTo(dx / d, 2), roundTo(dy / d, 2))

            return {
                normal
            }
        }
        return false;
    }

    /**
     *
     * @param r {Rectangle}
     */
    hitsRectangle(r) {
        const hit = r.hit(this);
        if (hit) {
            hit.normal = hit.normal.reverse()
        }
        return hit
    }
}


const rectangleEdgeToNormal = {
    '': new Vector(0, 0),
    'top': new Vector(0, 1),
    'right': new Vector(1, 0),
    'bottom': new Vector(0, -1),
    'left': new Vector(-1, 0)
}

/**
 *
 */
export class Rectangle extends Entity {
    _width = 1
    _height = 1

    constructor(x, y, width = 1, height = 1, velocity) {
        super(x, y, velocity)
        this._width = width;
        this._height = height
    }

    get height() {
        return this._height
    }

    set height(val) {
        return false
    }

    get width() {
        return this._width
    }

    set width(val) {
        return false
    }

    get area() {
        return roundTo(this._width * this._height, 2);
    }

    get centerPoint() {
        return {
            x: this._xPosition + this._width / 2,
            y: this._yPosition + this._height / 2
        }
    }

    /**
     * @param e {Entity}
     */
    hit(e) {
        if (e instanceof Circle)
            return this.hitsCircle(e)
        if (e instanceof Rectangle)
            return this.hitsRectangle(e)
        return false
    }

    /**
     * @param c {Circle}
     */
    hitsCircle(c) {
        const leftEdge = this.x;
        const rightEdge = (this.x + this.width);
        let horizontalEdge = c.x;
        let hitEdge = '';

        if (c.x < leftEdge) {
            horizontalEdge = leftEdge;
            hitEdge = 'left';
        } else if (c.x > rightEdge) {
            horizontalEdge = rightEdge;
            hitEdge = 'right'
        }

        const bottomEdge = this.y;
        const topEdge = this.y + this.height;
        let verticalEdge = c.y;

        if (c.y > topEdge) {
            verticalEdge = topEdge;
            hitEdge = 'top'
        } else if (c.y <= bottomEdge) {
            verticalEdge = bottomEdge;
            hitEdge = 'bottom'
        }

        const dx = c.x - horizontalEdge;
        const dy = c.y - verticalEdge;
        const dSquared = (dx * dx) + (dy * dy);

        const rSquared = c.size * c.size;

        const hit = (dSquared < rSquared);

        if (hit) {
            const normal = rectangleEdgeToNormal[hitEdge];

            return {
                edge: hitEdge,
                normal,
                x: horizontalEdge,
                y: verticalEdge
            }
        }

        return false;
    }

    /**
     * @param r2 {Rectangle}
     */
    hitsRectangle(r2) {
        const rightEdge = (this.x + this.width) >= r2.x;
        const leftEdge = this.x <= (r2.x + r2.width);
        const topEdge = (this.y + this.height) >= r2.y;
        const bottomEdge = this.y <= (r2.y + r2.height);

        const hit = rightEdge && leftEdge && topEdge && bottomEdge;

        if (hit) {
            const c1 = this.centerPoint;
            const c2 = r2.centerPoint;
            const dx = c2.x - c1.x;
            const dy = c2.y - c1.y;
            const dSquared = (dx * dx) + (dy * dy);
            const d = Math.sqrt(dSquared);
            const normal = new Vector(roundTo(dx / d, 2), roundTo(dy / d, 2));

            return {
                normal
            }
        }

        return false;
    }
}

function _number(n) {
    return typeof n === 'number' ? n : 0;
}