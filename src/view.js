let width = 300;
let height = 150;

let w2 = width / 2;
let h2 = height / 2;

export function draw(g, time, state) {
    g.clearRect(0, 0, width, height);

    if (state.paused) {
        showPaused();
        return;
    } else {
        const fps = Math.round(1 / time);
        showFPS(g, fps)
    }

    state.entities.forEach(e => {
        if (e.size) {
            drawCircle(g, e)
        } else {
            drawRectangle(g, e)
        }
    });
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

function drawCircle(g, c) {
    g.lineWidth = 2;
    g.fillStyle = '#333';

    if (c.hit)
        g.strokeStyle = '#c66';
    else
        g.strokeStyle = '#666';

    g.beginPath();
    g.arc(c.x, c.y, c.size, 0, 2 * Math.PI);
    g.fill();
    g.stroke();
}

function drawRectangle(g, r) {
    g.lineWidth = 2;
    g.fillStyle = '#333';

    g.strokeStyle = '#666';

    g.fillRect(r.x, r.y, r.width, r.height);
    g.strokeRect(r.x, r.y, r.width, r.height);

    if (r.hit) {
        g.strokeStyle = '#c66';
        if (r.hit.edge === 'top')
            g.strokeRect(r.x, r.y, r.width, 2);
        else if (r.hit.edge === 'right')
            g.strokeRect(r.x + r.width, r.y, 2, r.height);
        else if (r.hit.edge === 'bottom')
            g.strokeRect(r.x, r.y + r.height, r.width, 2);
        else if (r.hit.edge === 'left')
            g.strokeRect(r.x, r.y, 2, r.height);
        else
            g.strokeRect(r.x, r.y, r.width, r.height);
    }
}