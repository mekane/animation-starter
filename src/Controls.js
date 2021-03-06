/**
 * Module for defining and customizing game behavior, gets injected into the main Game module
 * This base class is intentionally a no-op and gets used as a stub for testing
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

/**
 * Uses browser window key up and down event listeners to figure out controls
 */
export class BrowserControls extends Controls {
    up = 0;
    right = 0;
    down = 0;
    left = 0;
    pause = true;
    fire = false;
    key = {};

    constructor() {
        super()
        window.addEventListener('keydown', e => this.keyDown(e));
        window.addEventListener('keyup', e => this.keyUp(e));
    }

    keyDown(e) {
        switch (e.key) {
            case 'ArrowUp':
                this.up = true;
                break;
            case 'ArrowDown':
                this.down = true;
                break;
            case 'ArrowRight':
                this.right = true;
                break;
            case 'ArrowLeft':
                this.left = true;
                break;
            default:
                this.key[e.key] = true;
                break;
        }
    }

    keyUp(e) {
        switch (e.key) {
            case 'ArrowUp':
                this.up = 100;
                break;
            case 'ArrowDown':
                this.down = 100;
                break;
            case 'ArrowRight':
                this.right = 100;
                break;
            case 'ArrowLeft':
                this.left = 100;
                break;
            case 'p':
                this.pause = !this.pause;
                break;
            case 'f':
                this.fire = true;
                break;
            default:
                this.key[e.key] = false;
                break;
        }
    }

    getControlState() {
        const state = Object.assign({}, {
            up: this.up,
            right: this.right,
            down: this.down,
            left: this.left,
            pause: this.pause,
            fire: this.fire,
            key: this.key
        })
        this.fire = false
        return state
    }
}
