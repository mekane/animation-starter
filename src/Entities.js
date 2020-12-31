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
}

/**
 *
 */
export class Circle extends Entity {
    _size = 1

    constructor(x, y, velocity, size = 1) {
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
}

/**
 *
 */
export class Rectangle extends Entity {
    _width = 1
    _height = 1

    constructor(x, y, velocity, width, height) {
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
}

function _number(n) {
    return typeof n === 'number' ? n : 0;
}