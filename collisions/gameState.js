/**
 * This game state just checks for and applies collisions on the list of entities in the scene
 */

import {Rectangle} from "../src/Entities.js";

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

        checkForHitWithWalls(nextState.maxX, nextState.maxY, e1)
    }

    return nextState;
}

/**
 * Sets up temporary rectangles to function as walls
 * @param maxX {Number}
 * @param maxY {Number}
 * @param e {Entity}
 */
function checkForHitWithWalls(maxX, maxY, e) {
    const width = maxX;
    const height = maxY;
    const wallSize = 200;

    const leftWall = new Rectangle(-wallSize, 0, wallSize, height)
    const hitLeft = e.hit(leftWall)
    if (hitLeft)
        e.accelerate(e.collisionEffects(leftWall, hitLeft.normal)[0])

    const rightWall = new Rectangle(maxX, 0, wallSize, height)
    const hitRight = e.hit(rightWall)
    if (hitRight)
        e.accelerate(e.collisionEffects(rightWall, hitRight.normal)[0])

    const topWall = new Rectangle(0, maxY, maxX, wallSize)
    const hitTop = e.hit(topWall)
    if (hitTop)
        e.accelerate(e.collisionEffects(topWall, hitTop.normal)[0])

    const bottomWall = new Rectangle(0, -wallSize, width, wallSize)
    const hitBottom = e.hit(bottomWall)
    if (hitBottom)
        e.accelerate(e.collisionEffects(bottomWall, hitBottom.normal)[0])
}