const rectangleEdgeToNormal = {
    '': {x: 0, y: 0},
    'top': {x: 0, y: 1},
    'right': {x: 1, y: 0},
    'bottom': {x: 0, y: -1},
    'left': {x: -1, y: 0}
}

export function circleIntersectsCircle(c1 = {}, c2 = {}) {
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    const dSquared = (dx * dx) + (dy * dy);

    const dr = (c1.size + c2.size);
    const rSquared = dr * dr;

    const hit = (dSquared <= rSquared);

    if (hit) {
        const d = Math.sqrt(dSquared);

        const normal = {
            x: dx / d,
            y: dy / d
        };

        const relativeVelocity = getRelativeVelocity(c1, c2);

        return {
            normal,
            relativeVelocity,
            speed: dot(normal, relativeVelocity)
        }
    }
    return false;
}

export function rectangleIntersectsRectangle(r1 = {}, r2 = {}) {
    const rightEdge = (r1.x + r1.width) >= r2.x;
    const leftEdge = r1.x <= (r2.x + r2.width);
    const topEdge = (r1.y + r1.height) >= r2.y;
    const bottomEdge = r1.y <= (r2.y + r2.height);

    return rightEdge && leftEdge && topEdge && bottomEdge;
    //TODO: normal and other hit data
}

export function circleIntersectsRectangle(c = {}, r = {}) {
    const leftEdge = r.x;
    const rightEdge = (r.x + r.width);
    let horizontalEdge = c.x;
    let hitEdge = '';

    if (c.x < leftEdge) {
        horizontalEdge = leftEdge;
        hitEdge = 'left';
    } else if (c.x > rightEdge) {
        horizontalEdge = rightEdge;
        hitEdge = 'right'
    }

    const bottomEdge = r.y;
    const topEdge = r.y + r.height;
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
        const relativeVelocity = getRelativeVelocity(c, r);
        return {
            edge: hitEdge,
            normal,
            relativeVelocity,
            speed: dot(normal, relativeVelocity),
            x: horizontalEdge,
            y: verticalEdge
        }
    }

    return false;
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

export function collide(e1 = {}, e2 = {}, hitData = {}) {
    const normal = hitData.normal;
    const speed = hitData.speed;

    // this is bad for squares but good for circles
    if (speed < 0 || isNaN(speed))
        return;

    const e1Mass = getArea(e1);
    const e2Mass = getArea(e2);
    const impulse = 2 * speed / (e1Mass + e2Mass);

    e1.vx -= impulse * e2Mass * normal.x;
    e1.vy -= impulse * e2Mass * normal.y;

    e2.vx += impulse * e1Mass * normal.x;
    e2.vy += impulse * e1Mass * normal.y;
}

function getArea(entity = {}) {
    if (entity.size)
        return 3.14 * entity.size * entity.size;
    else
        return entity.width * entity.height;
}

function getRelativeVelocity(e1 = {}, e2 = {}) {

    return {
        x: (e1.vx || 0) - (e2.vx || 0),
        y: (e1.vy || 0) - (e2.vy || 0)
    };
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