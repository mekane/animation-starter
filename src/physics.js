import {
    dot,
    Vector
} from './Vector.js'

const rectangleEdgeToNormal = {
    '': new Vector(0, 0),
    'top': new Vector(0, 1),
    'right': new Vector(1, 0),
    'bottom': new Vector(0, -1),
    'left': new Vector(-1, 0)
}

const rectangleNormalReversed = {};
Object.keys(rectangleEdgeToNormal).forEach(name => {
    rectangleNormalReversed[name] = rectangleEdgeToNormal[name].reverse()
})

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
        const speed = dot(normal, relativeVelocity);

        return {
            normal,
            relativeVelocity,
            speed,
            result: collide(c1, c2, normal, speed)
        }
    }
    return false;
}

export function rectangleIntersectsRectangle(r1 = {}, r2 = {}) {
    const rightEdge = (r1.x + r1.width) >= r2.x;
    const leftEdge = r1.x <= (r2.x + r2.width);
    const topEdge = (r1.y + r1.height) >= r2.y;
    const bottomEdge = r1.y <= (r2.y + r2.height);

    const hit = rightEdge && leftEdge && topEdge && bottomEdge;

    if (hit) {
        const c1 = getCenter(r1);
        const c2 = getCenter(r2);
        const dx = c2.x - c1.x;
        const dy = c2.y - c1.y;
        const dSquared = (dx * dx) + (dy * dy);
        const d = Math.sqrt(dSquared);
        const normal = {
            x: dx / d,
            y: dy / d
        };

        const relativeVelocity = getRelativeVelocity(r1, r2);
        const speed = dot(normal, relativeVelocity);

        return {
            normal,
            relativeVelocity,
            speed,
            result: collide(r1, r2, normal, speed)
        }
    }

    return false;
}

export function circleIntersectsRectangle(e1 = {}, e2 = {}) {
    let c;
    let r;
    let rectNormal;
    const circleHitsRectangle = e1.size && !e2.size;
    const rectangleHitsCircle = e2.size && !e1.size;

    if (circleHitsRectangle) {
        c = e1;
        r = e2;
        rectNormal = rectangleNormalReversed;
    } else if (rectangleHitsCircle) {
        c = e2;
        r = e1;
        rectNormal = rectangleEdgeToNormal;
    } else
        return false;

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
        const normal = rectNormal[hitEdge];
        const relativeVelocity = getRelativeVelocity(e1, e2);
        const speed = dot(normal, relativeVelocity);

        return {
            edge: hitEdge,
            normal,
            relativeVelocity,
            speed,
            x: horizontalEdge,
            y: verticalEdge,
            result: collide(e1, e2, normal, speed)
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

function getRelativeVelocity(e1 = {}, e2 = {}) {

    return {
        x: (e1.vx || 0) - (e2.vx || 0),
        y: (e1.vy || 0) - (e2.vy || 0)
    };
}

function collide(e1 = {}, e2 = {}, normal, speed) {
    if (speed < 0 || isNaN(speed))
        return [
            {vx: 0, vy: 0},
            {vx: 0, vy: 0}
        ];

    const e1Mass = getArea(e1);
    const e2Mass = getArea(e2);
    const impulse = 2 * speed / (e1Mass + e2Mass);

    return [
        {
            vx: roundTo(-impulse * e2Mass * normal.x, 3),
            vy: roundTo(-impulse * e2Mass * normal.y, 3)
        },
        {
            vx: roundTo(impulse * e1Mass * normal.x, 3),
            vy: roundTo(impulse * e1Mass * normal.y, 3)
        }
    ]
}

function getArea(entity = {}) {
    if (entity.size)
        return 3.14 * entity.size * entity.size;
    else
        return entity.width * entity.height;
}

function roundTo(number, decimalPlaces) {
    return Number(Math.round(number + 'e' + decimalPlaces) + "e-" + decimalPlaces)
}

export default {
    circleIntersectsCircle,
    circleIntersectsRectangle,
    collide,
    rectangleIntersectsRectangle
}