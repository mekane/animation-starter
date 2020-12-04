const defaults = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0
};

export function step(oldState) {
    return Object.assign({}, defaults, oldState);
}


function __step(currentState, controls) {
    const nextState = Object.assign({}, currentState);

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

    nextState.x += nextState.vx;
    nextState.y += nextState.vy;

    return nextState;
}