export function circleIntersectsCircle(c1 = {}, c2 = {}) {
    const dx = c1.x - c2.x;
    const dy = c1.y - c2.y;
    const dSquared = (dx * dx) + (dy * dy);

    const dr = (c1.size + c2.size);
    const rSquared = dr * dr;

    return dSquared <= rSquared;
}

export function rectangleHit(r1 = {}, r2 = {}) {
    const rightEdge = (r1.x + r1.width) >= r2.x;
    const leftEdge = r1.x <= (r2.x + r2.width);
    const topEdge = (r1.y + r1.height) >= r2.y;
    const bottomEdge = r1.y <= (r2.y + r2.height);

    return rightEdge && leftEdge && topEdge && bottomEdge;
}

export function circleHitRectangle(c = {}, r = {}) {
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


export function collide(e1, e2) {

}

export default {
    circleIntersectsCircle,
    circleHitRectangle,
    collide,
    rectangleHit,
}