import {getControlState, initializeControls} from './controls.js';
import {draw, setSize} from './view.js';

let controls = getControlState();
let graphicsContext = null;
let gameState = {};
let step = _ => _;

export function Game(stepFunction, initialState) {
    step = stepFunction;
    gameState = initialState;

    initializeControls();
    resizeGraphics();
    showOneFrame(0);
    animationLoop();

    return {
        setState: function (newState) {
            gameState = newState;
            showOneFrame(0);
        }
    }
}

function resizeGraphics() {
    const main = document.getElementById('main');
    main.width = main.clientWidth;
    main.height = main.clientHeight;
    graphicsContext = main.getContext('2d');

    setSize(main.clientWidth, main.clientHeight);
}

window.addEventListener('resize', resizeGraphics);


let secondsSinceLastUpdate = 0;
let previousTime = 0;

function animationLoop(time) {
    secondsSinceLastUpdate = (time - previousTime) / 1000;
    previousTime = time;

    controls = getControlState();

    if (controls.pause) {
        showPaused(graphicsContext);
    } else {
        showOneFrame(secondsSinceLastUpdate);
    }
    requestAnimationFrame(animationLoop);
}

function showOneFrame(secondsSinceLastUpdate) {
    gameState = step(gameState, getControlState());
    draw(graphicsContext, secondsSinceLastUpdate, gameState);
}

function showPaused(g) {
    g.fillStyle = 'white';
    g.fillRect(0, 0, 110, 40);
    g.font = '25px Arial';
    g.fillStyle = 'black';
    g.fillText("Paused", 10, 30);
}

window.addEventListener('keypress', e => {
    if (e.key === ' ' || e.key === 'n' || e.key === 's') {
        showOneFrame(.016);
    }
})