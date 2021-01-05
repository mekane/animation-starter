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
     * @returns {{
        up: number,
        right: number,
        down: number,
        left: number,
        pause: boolean
     * }}
     */
    getControlState() {
        return {
            up: 0,
            right: 0,
            down: 0,
            left: 0,
            pause: false
        }
    }
}

export function BrowserControls() {
    let up = 0;
    let right = 0;
    let down = 0;
    let left = 0;
    let pause = true;

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
        }
    }

    function getControlState() {
        return {
            up,
            right,
            down,
            left,
            pause
        }
    }

    return {
        initialize,
        getControlState
    }
}
