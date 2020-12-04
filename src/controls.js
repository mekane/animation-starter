export function initializeControls() {
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
}

let up = 0;
let right = 0;
let down = 0;
let left = 0;

let pause = false;

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

export function getControlState() {
    return {
        up,
        right,
        down,
        left,
        pause
    }
}
