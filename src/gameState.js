const defaults = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0
};

export function getInitialState(numObjects) {
    const state = Object.assign({}, defaults);
    return state;
}

export function step(oldState, controls, timeStep = .1) {
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

    return nextState;
}
