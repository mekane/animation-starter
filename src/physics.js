export function circleIntersectsCircle(c1 = {}, c2 = {}) {
    const dx = c1.x - c2.x;
    const dy = c1.y - c2.y;
    const dSquared = (dx * dx) + (dy * dy);

    const dr = (c1.size + c2.size);
    const rSquared = dr * dr;

    return dSquared <= rSquared;
}

export function rectangleIntersectsRectangle(r1 = {}, r2 = {}) {
    const rightEdge = (r1.x + r1.width) >= r2.x;
    const leftEdge = r1.x <= (r2.x + r2.width);
    const topEdge = (r1.y + r1.height) >= r2.y;
    const bottomEdge = r1.y <= (r2.y + r2.height);

    return rightEdge && leftEdge && topEdge && bottomEdge;
}

export function circleIntersectsRectangle(c = {}, r = {}) {
    const leftEdge = r.x;
    const rightEdge = (r.x + r.width);
    let horizontalEdge = c.x;

    if (c.x < leftEdge)
        horizontalEdge = leftEdge;
    else if (c.x > rightEdge)
        horizontalEdge = rightEdge;

    const bottomEdge = r.y;
    const topEdge = r.y + r.height;
    let verticalEdge = c.y;

    if (c.y > topEdge)
        verticalEdge = topEdge;
    else if (c.y <= bottomEdge)
        verticalEdge = bottomEdge;

    const dx = c.x - horizontalEdge;
    const dy = c.y - verticalEdge;
    const dSquared = (dx * dx) + (dy * dy);

    const rSquared = c.size * c.size;

    return dSquared < rSquared;
}

export function collisionNormal(e1 = {}, e2 = {}) {
    const c1 = getCenter(e1)
    const c2 = getCenter(e2)

    const magnitude = {
        x: c2.x - c1.x,
        y: c2.y - c1.y
    }

    const d = Math.sqrt(magnitude.x * magnitude.x + magnitude.y * magnitude.y)

    const normal = {
        x: magnitude.x / d,
        y: magnitude.y / d
    }

    return normal;
}

function getCenter(entity = {}) {
    if (entity.size)
        return {
            x: entity.x,
            y: entity.y
        }
    else {
        return {
            x: entity.x + entity.width / 2,
            y: entity.y + entity.height / 2
        }
    }
}

export function collide(e1 = {}, e2 = {}) {
    const norm = collisionNormal(e1, e2);

    const relativeVelocity = {
        x: e1.vx - e2.vx,
        y: e1.vy - e2.vy
    }

    const speed = dot(norm, relativeVelocity)

    if (speed <= 0 || isNaN(speed))
    return;

    const e1Mass = getArea(e1);
    const e2Mass = getArea(e2);
    const impulse = 2 * speed / (e1Mass + e2Mass);

    e1.vx -= impulse * e2Mass * norm.x;
    e1.vy -= impulse * e2Mass * norm.y;

    e2.vx += impulse * e1Mass * norm.x;
    e2.vy += impulse * e1Mass * norm.y;
}

function getArea(entity = {}) {
    if (entity.size)
        return 3.14 * entity.size * entity.size;
    else
        return entity.width * entity.height;
}

function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

export default {
    circleIntersectsCircle,
    circleIntersectsRectangle,
    collide,
    rectangleIntersectsRectangle
}