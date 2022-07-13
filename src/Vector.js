export class Vector {
    x = 0
    y = 0

    constructor(x = 0, y = 0) {
        this.x = _number(x)
        this.y = _number(y)
        Object.freeze(this)
    }

    /**
     * @param v2 {Vector}
     * @returns {Vector}
     */
    add(v2) {
        return new Vector(this.x + v2.x, this.y + v2.y)
    }

    /**
     * @param v2 {Vector}
     * @returns {Number}
     */
    dot(v2) {
        return this.x * v2.x + this.y * v2.y
    }

    /**
     * @returns {Vector}
     */
    reverse() {
        return new Vector(-this.x, -this.y)
    }

    /**
     * @param v2 {Vector}
     * @returns {Vector}
     */
    subtract(v2) {
        return new Vector(this.x - v2.x, this.y - v2.y)
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

function _number(n) {
    return typeof n === 'number' ? n : 0;
}