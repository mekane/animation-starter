let width = 300;
let height = 150;

let w2 = width / 2;
let h2 = height / 2;

export function draw(g, time, state) {

    if (state.paused) {
        showPaused();
        return;
    } else {
        const fps = Math.round(1 / time);
        showFPS(g, fps)
    }
}

export function setSize(w, h) {
    width = w;
    height = h;
    w2 = width / 2;
    h2 = height / 2;
}


function showFPS(g, fps) {
    g.fillStyle = 'white';
    g.fillRect(0, 0, 110, 40);
    g.font = '25px Arial';
    g.fillStyle = 'black';
    g.fillText(fps, 10, 30);
}

function showPosition(g, x, y) {
    g.font = '25px Arial';
    g.fillStyle = 'black';
    g.fillText(`(${x}, ${y})`, 10, window.innerHeight - 10);
}
