import {Rectangle} from "./Entities.js";

const defaultGameOptions = {
    walls: true
}

/** What if I wanted to build a non-html version?
 * What in here is HTML-specific and should be injected? */
/**
 *
 * @param controls {Controls}
 * @param view {View}
 * @param timer {Timer}
 * @param plugin {Plugin}
 * @param options {{ walls: boolean }}
 * @returns {{setState: function}}
 * @constructor
 */
export function Game(controls, view, timer, plugin, options = defaultGameOptions) {
    let gameOptions = Object.assign({}, options);

    /** Should probably inject this to separate out the BrowserControls (and a separate Controller stream one) */
    controls.initialize();
    let controlState = {};

    let secondsSinceLastUpdate = 0;
    let previousTime = 0;

    let gameState = plugin.getInitialState(view.getBounds());

    /** this is debugging, but how to properly integrate it? */
    /*
    window.addEventListener('keypress', e => {
        if (e.key === ' ' || e.key === 'n' || e.key === 's') {
            showOneFrame(.016);
        }
    })
    */

    showOneFrame(0);
    mainLoop(0);

    return { //game instance
        getOptions() {
            return gameOptions;
        },
        /** TODO: rename to reset **/
        setState: function (newState) {
            gameState = newState;
            showOneFrame(0);
        },
        step
    }


    function mainLoop(time) {
        secondsSinceLastUpdate = (time - previousTime) / 1000;
        previousTime = time;

        controlState = controls.getControlState();

	gameState.showFps = controlState.info;

        if (controlState.pause) {
            view.showPaused();
        } else {
            showOneFrame(secondsSinceLastUpdate);
        }
        timer.tick(mainLoop);
    }

    function showOneFrame(secondsSinceLastUpdate) {
        updateBoundsOnState();

        gameState = step(gameState, secondsSinceLastUpdate);
        view.draw(gameState, secondsSinceLastUpdate);
    }


    function updateBoundsOnState() {
        const { width, height } = view.getBounds();
        gameState.maxX = width;
        gameState.maxY = height;
    }

    /**
     * Apply Forces
     * Update Positions and Velocities
     * Detect Collisions
     * Solve Constraints
     */
    function step(oldState, timeStep = .1) {
        const time = Math.min(timeStep, 0.1);

        const nextState = Object.assign({entities: []}, oldState);

        plugin.preUpdate(nextState, controlState)

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

                    const a = e1.accelerationFromCollision(e2, hit.normal)
                    e1.collision(a[0], e2)
                    e2.collision(a[1], e1)
                }
            }

            if (gameOptions.walls)
                checkForHitWithWalls(nextState.maxX, nextState.maxY, e1)
        }

        nextState.entities = nextState.entities.filter(e => !e.destroyed)

        return nextState;
    }
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
        e.collision(e.accelerationFromCollision(leftWall, hitLeft.normal)[0], leftWall)

    const rightWall = new Rectangle(maxX, 0, wallSize, height)
    const hitRight = e.hit(rightWall)
    if (hitRight)
        e.collision(e.accelerationFromCollision(rightWall, hitRight.normal)[0], rightWall)

    const topWall = new Rectangle(0, maxY, maxX, wallSize)
    const hitTop = e.hit(topWall)
    if (hitTop)
        e.collision(e.accelerationFromCollision(topWall, hitTop.normal)[0], topWall)

    const bottomWall = new Rectangle(0, -wallSize, width, wallSize)
    const hitBottom = e.hit(bottomWall)
    if (hitBottom)
        e.collision(e.accelerationFromCollision(bottomWall, hitBottom.normal)[0], bottomWall)
}
