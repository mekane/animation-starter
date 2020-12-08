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

export function collision(e1 = {}, e2 = {}) {
    const dx = e1.x - e2.x;
    const dy = e1.y - e2.y;
    const dSquared = (dx * dx) + (dy * dy);

    const dr = (e1.size + e2.size);
    const rSquared = dr * dr;

    return dSquared <= rSquared;
}