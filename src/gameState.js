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

            entity.x += (entity.vx * time);
            entity.y += (entity.vy * time);

            nextState.entities.push(entity);
        })
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
    return {
        size: 10,
        x: evenOrOdd(getRandomInt(100) + 10),
        y: evenOrOdd(getRandomInt(100) + 10),
        vx: evenOrOdd(getRandomInt(4) + 1),
        vy: evenOrOdd(getRandomInt(4) + 1)
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