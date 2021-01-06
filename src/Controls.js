/**
 * This basically serves the purpose of documenting the interface
 * The IDE picks up this definition and connects it to the JSDocs
 */
export class Controls {
    /**
     * Do whatever is needed to set up control handling (listeners, etc.)
     */
    initialize() {

    }

    /**
     * @returns {object}
     */
    getControlState() {
        return {
            up: 0,
            right: 0,
            down: 0,
            left: 0,
            pause: false,
            key: {}
        }
    }
}

export function BrowserControls() {
    let up = 0;
    let right = 0;
    let down = 0;
    let left = 0;
    let pause = true;
    let fire = false;
    const key = {};

    function initialize() {
        window.addEventListener('keydown', keyDown);
        window.addEventListener('keyup', keyUp);
    }

    function keyDown(e) {
        switch (e.key) {
            case 'ArrowUp':
                up = true;
                break;
            case 'ArrowDown':
                down = true;
                break;
            case 'ArrowRight':
                right = true;
                break;
            case 'ArrowLeft':
                left = true;
                break;
            default:
                key[e.key] = true;
                break;
        }
    }

    function keyUp(e) {
        switch (e.key) {
            case 'ArrowUp':
                up = 100;
                break;
            case 'ArrowDown':
                down = 100;
                break;
            case 'ArrowRight':
                right = 100;
                break;
            case 'ArrowLeft':
                left = 100;
                break;
            case 'p':
                pause = !pause;
                break;
            case 'f':
                fire = true;
                break;
            default:
                key[e.key] = false;
                break;
        }
    }

    function getControlState() {
        const state = Object.assign({}, {
            up,
            right,
            down,
            left,
            pause,
            fire,
            key
        })
        fire = false
        return state
    }

    return {
        initialize,
        getControlState
    }
}
