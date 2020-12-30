export function add(v1 = {x: 0, y: 0}, v2 = {x: 0, y: 0}) {
    return {
        x: _(v1.x) + _(v2.x),
        y: _(v1.y) + _(v2.y),
    }
}

export function reverse({x = -0, y = -0} = {}) {
    return {
        x: x * -1 || 0,
        y: y * -1 || 0
    }
}

export function dot(v1 = {x: 0, y: 0}, v2 = {x: 0, y: 0}) {
    return (v1.x || 0) * (v2.x || 0) + (v1.y || 0) * (v2.y || 0)
}

function _(x) {
    return typeof x === 'number' ? x : 0;
}