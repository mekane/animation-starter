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

    const nextState = Object.assign({entities: []}, oldState);

    nextState.entities.forEach(e => {
        e.updatePosition(timeStep)
    })

    for (let i = 0; i < nextState.entities.length; i++) {
        const e1 = nextState.entities[i]

        for (let j = i + 1; j < nextState.entities.length; j++) {
            const e2 = nextState.entities[j];
            const hit = e1.hit(e2)
            if (hit) {
                e1.lastHit = hit;
                e2.lastHit = hit;

                const a = e1.collisionEffects(e2, hit.normal)
                e1.accelerate(a[0])
                e2.accelerate(a[1])
            }
        }
    }

    return nextState;
}
