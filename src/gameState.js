const defaults = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    entities: []
};

export function getInitialState(numObjects) {
    const state = Object.assign({}, defaults);

    for (let i = 0; i < numObjects; i++) {
        state.entities.push(newEntity());
    }

    return state;
}

export function step(oldState, controls = {}, timeStep = .1) {
    const time = Math.min(timeStep, 0.1);

    const nextState = Object.assign({}, defaults, oldState);

    if (controls.up)
        nextState.vy--;
    if (controls.down)
        nextState.vy++;
    if (controls.left)
        nextState.vx--;
    if (controls.right)
        nextState.vx++;

    nextState.vx = Math.min(Math.max(-20, nextState.vx), 20);
    nextState.vy = Math.min(Math.max(-20, nextState.vy), 20);

    nextState.x += (nextState.vx * time);
    nextState.y += (nextState.vy * time);

    nextState.entities = [];
    if (oldState.entities) {
        oldState.entities.forEach(e => {
            const entity = Object.assign({}, e);
            entity.hit = false;

            entity.x += (entity.vx * time);
            entity.y += (entity.vy * time);

            nextState.entities.push(entity);
        })
    }

    for (let i = 0; i < nextState.entities.length; i++) {
        const e1 = nextState.entities[i]

        for (let j = i + 1; j < nextState.entities.length; j++) {
            const e2 = nextState.entities[j];
            if (hit(e1, e2)) {
                e1.hit = true;
                e2.hit = true;
            }
        }
    }

    return nextState;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function evenOrOdd(number) {
    return getRandomInt(2) ? number : number * -1;
}

function newEntity() {
    if (getRandomInt(2) - 1)
        return {
            size: 12,
            x: getRandomInt(100) + 450,
            y: getRandomInt(100) + 450,
            vx: evenOrOdd(getRandomInt(4) + 1),
            vy: evenOrOdd(getRandomInt(4) + 1)
        }
    else return {
        x: getRandomInt(100) + 450,
        y: getRandomInt(100) + 450,
        width: 20 + getRandomInt(30),
        height: 20 + getRandomInt(30),
        vx: evenOrOdd(getRandomInt(5) + 1),
        vy: evenOrOdd(getRandomInt(5) + 1)
    }
}

export function circleHit(c1 = {}, c2 = {}) {
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

export function hit(e1, e2) {
    if (e1.size && e2.size)
        return circleHit(e1, e2)
    else if (e1.size && !e2.size)
        return circleHitRectangle(e1, e2)
    else if (!e1.size && e2.size)
        return circleHitRectangle(e2, e1)
    else
        return rectangleHit(e1, e2)
}
