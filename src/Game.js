import {Rectangle} from "./Entities.js";

/** What if I wanted to build a non-html version?
 * What in here is HTML-specific and should be injected? */
/**
 *
 * @param controls {Controls}
 * @param view {View}
 * @param timer {Timer}
 * @param plugin {Plugin}
 * @returns {{setState: function}}
 * @constructor
 */
export function Game(controls, view, timer, plugin) {
    /** Should probably inject this to separate out the BrowserControls (and a separate Controller stream one) */
    controls.initialize();
    let controlState = {};

    let secondsSinceLastUpdate = 0;
    let previousTime = 0;

    let gameState = plugin.getInitialState();

    /** this is debugging, but how to properly integrate it? */
    /*
    window.addEventListener('keypress', e => {
        if (e.key === ' ' || e.key === 'n' || e.key === 's') {
            showOneFrame(.016);
        }
    })
    */

    mainLoop();

    /** Needs to also export the 'step' function (but might not need to be tied to instance) */
    return {
        /** rename to reset **/
        setState: function (newState) {
            gameState = newState;
            showOneFrame(0);
        }
    }


    function mainLoop(time) {
        secondsSinceLastUpdate = (time - previousTime) / 1000;
        previousTime = time;

        controlState = controls.getControlState();

        if (controlState.pause) {
            view.showPaused();
        } else {
            showOneFrame(secondsSinceLastUpdate);
        }
        timer.tick(mainLoop);
    }

    function showOneFrame(secondsSinceLastUpdate) {
        const {width, height} = view.getBounds();
        gameState.maxX = width;
        gameState.maxY = height;

        gameState = step(gameState, controlState);
        view.draw(gameState, secondsSinceLastUpdate);
    }
}

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
                e1.collision(a[0])
                e2.collision(a[1])
            }
        }

        checkForHitWithWalls(nextState.maxX, nextState.maxY, e1)
    }

    nextState.entities = nextState.entities.filter(e => !e.destroyed)

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
        e.collision(e.collisionEffects(leftWall, hitLeft.normal)[0])

    const rightWall = new Rectangle(maxX, 0, wallSize, height)
    const hitRight = e.hit(rightWall)
    if (hitRight)
        e.collision(e.collisionEffects(rightWall, hitRight.normal)[0])

    const topWall = new Rectangle(0, maxY, maxX, wallSize)
    const hitTop = e.hit(topWall)
    if (hitTop)
        e.collision(e.collisionEffects(topWall, hitTop.normal)[0])

    const bottomWall = new Rectangle(0, -wallSize, width, wallSize)
    const hitBottom = e.hit(bottomWall)
    if (hitBottom)
        e.collision(e.collisionEffects(bottomWall, hitBottom.normal)[0])
}