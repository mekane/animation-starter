export class Vector {
    x = 0
    y = 0

    constructor(x = 0, y = 0) {
        this.x = _number(x)
        this.y = _number(y)
    }

    /**
     * @param v2 Vector
     * return Vector
     */
    add(v2) {
        return new Vector(this.x + v2.x, this.y + v2.y)
    }

    /**
     * @param v2 Vector
     * return Number
     */
    dot(v2) {
        return this.x * v2.x + this.y * v2.y
    }

    /**
     * return Vector
     */
    reverse() {
        return new Vector(-this.x, -this.y)
    }

    /**
     * @param v2 Vector
     * return Vector
     */
    subtract(v2) {
        return new Vector(this.x - v2.x, this.y - v2.y)
    }
}

export function dot(v1 = {x: 0, y: 0}, v2 = {x: 0, y: 0}) {
    return (v1.x || 0) * (v2.x || 0) + (v1.y || 0) * (v2.y || 0)
}

function _number(n) {
    return typeof n === 'number' ? n : 0;
}