/**
 * This game state just checks for and applies collisions on the list of entities in the scene
 */

import {
    circleIntersectsCircle,
    rectangleIntersectsRectangle,
    circleIntersectsRectangle
} from '../src/physics.js';

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
        return circleIntersectsCircle(e1, e2)
    else if (!e1.size && !e2.size)
        return rectangleIntersectsRectangle(e1, e2)
    else
        return circleIntersectsRectangle(e1, e2)
}
