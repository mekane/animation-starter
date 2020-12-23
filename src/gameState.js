const defaults = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    entities: []
};

let physics = {
    circleIntersectsCircle: _ => _,
    rectangleIntersectsRectangle: _ => _,
    circleIntersectsRectangle: _ => _,
    collide: _ => _
}

export function setPhysics(newPhysics) {
    physics = newPhysics;
}

export function getInitialState() {
    return Object.assign({}, defaults);
}

/**
 * Apply Forces
 * Update Positions and Velocities
 * Detect Collisions
 * Solve Constraints
 */
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
            const hit = checkForCollision(e1, e2)
            if (hit) {
                console.log(hit)
                e1.hit = hit;
                e2.hit = hit;

                const de1 = hit.result[0];
                const de2 = hit.result[1];

                e1.vx += de1.vx;
                e1.vy += de1.vy;

                e2.vx += de2.vx;
                e2.vy += de2.vy;
            }
        }
    }

    return nextState;
}

function checkForCollision(e1, e2) {
    if (e1.size && e2.size)
        return physics.circleIntersectsCircle(e1, e2)
    else if (!e1.size && !e2.size)
        return physics.rectangleIntersectsRectangle(e1, e2)
    else
        return physics.circleIntersectsRectangle(e1, e2)
}
