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
    pause = false;
    fire = false;
    reset = false;
    info = false;
    m = false;
    j = false;
    e = false;
    key = {};

    constructor() {
        super()
        window.addEventListener('keydown', e => this.keyDown(e));
        window.addEventListener('keyup', e => this.keyUp(e));
    }

    keyDown(e) {
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
            default:
                this.key[e.key] = true;
                break;
        }
    }

    keyUp(e) {
        switch (e.key) {
            case 'ArrowUp':
                this.up = 0;
                break;
            case 'ArrowDown':
                this.down = 0;
                break;
            case 'ArrowRight':
                this.right = 0;
                break;
            case 'ArrowLeft':
                this.left = 0;
                break;
            case 'f':
                this.fire = true;
                break;
            case 'p':
                this.pause = !this.pause;
                break;
            case 'r':
                this.reset = true;
                break;
	    case 'm':	
		this.m = true;
		break;
	    case 'e':
		this.e = true;
		break;
	    case 'i':
		this.info = !this.info;
		break;
           case 'j':
		this.j = true;
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
            reset: this.reset,
	    m: this.m,
            e: this.e,
	    j: this.j,
	    info: this.info,
            key: this.key
        })
        this.fire = false
        this.reset = false
	this.m = false
	this.e = false
	this.j = false
        return state
    }
}
