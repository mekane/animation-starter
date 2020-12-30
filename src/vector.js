export function reverse({x = -0, y = -0} = {}) {
    return {
        x: x * -1 || 0,
        y: y * -1 || 0
    }
}
