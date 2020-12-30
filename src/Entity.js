import {Vector} from "./Vector.js";

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
}

function _number(n) {
    return typeof n === 'number' ? n : 0;
}