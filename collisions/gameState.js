/**
 * This game state just checks for and applies collisions on the list of entities in the scene
 */

/**
 * Apply Forces
 * Update Positions and Velocities
 * Detect Collisions
 * Solve Constraints
 */
export function step(oldState, controls = {}, timeStep = .1) {
    const time = Math.min(timeStep, 0.1);

    const nextState = Object.assign({}, oldState);

    nextState.entities = [];
    if (oldState.entities) {
        oldState.entities.forEach(e => {
            const entity = Object.assign({}, e);
            entity.lastHit = false;

            entity.x += (entity.vx * time);
            entity.y += (entity.vy * time);

            nextState.entities.push(entity);
        })
    }

    for (let i = 0; i < nextState.entities.length; i++) {
        const e1 = nextState.entities[i]
        console.log(e1)
        for (let j = i + 1; j < nextState.entities.length; j++) {
            const e2 = nextState.entities[j];
            const hit = e1.hit(e2)
            if (hit) {
                e1.lastHit = hit;
                e2.lastHit = hit;

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
