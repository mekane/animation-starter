export function reverse({x = -0, y = -0} = {}) {
    return {
        x: x * -1 || 0,
        y: y * -1 || 0
    }
}

export function dot(v1 = {x: 0, y: 0}, v2 = {x: 0, y: 0}) {
    return (v1.x || 0) * (v2.x || 0) + (v1.y || 0) * (v2.y || 0)
}
