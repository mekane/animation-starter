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

    /** @abstract */
    get area() {
    }

    /** @abstract */
    hit(otherEntity) {
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

    hit(e) {
        return this.hitsCircle(e)
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
            const relativeVelocity = this.velocity.subtract(c2.velocity)
            const speed = roundTo(normal.dot(relativeVelocity), 2)

            return {
                normal,
                relativeVelocity,
                speed
            }
        }
        return false;
    }

    /**
     *
     * @param r {Rectangle}
     */
    hitsRectangle(r) {
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

    constructor(x, y, width, height, velocity) {
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

    /**
     * @param e {Entity}
     */
    hit(e) {
        return this.hitsCircle(e)
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
            const relativeVelocity = this.velocity.subtract(c.velocity);
            const speed = normal.dot(relativeVelocity);

            return {
                edge: hitEdge,
                normal,
                relativeVelocity,
                speed,
                x: horizontalEdge,
                y: verticalEdge
            }
        }

        return false;
    }
}

function _number(n) {
    return typeof n === 'number' ? n : 0;
}