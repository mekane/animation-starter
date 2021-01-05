/**
 * This basically serves the purpose of documenting the interface
 * The IDE picks up this definition and connects it to the JSDocs
 */
class View {
    draw() {

    }

    /**
     * returns {{width: {Number}, height: {Number}}}
     */
    getBounds() {

    }

    showPaused() {
    }
}

/**
 * This is the implementation of a View for use in a browser.
 * It does _not_ actually use the class above, but must match it
 * @param win {Window}
 * @param canvasElement {HTMLCanvasElement}
 */
export function HtmlView(win, canvasElement) {
    let width = 300;
    let height = 150;
    let w2 = width / 2;
    let h2 = height / 2;

    /** INITIALIZE **/
    const g = canvasElement.getContext('2d');
    win.addEventListener('resize', resize);
    resize();

    return {
        draw,
        getBounds,
        showPaused
    }

    function resize() {
        canvasElement.width = canvasElement.clientWidth;
        canvasElement.height = canvasElement.clientHeight;

        width = canvasElement.clientWidth;
        height = canvasElement.clientHeight;
        w2 = width / 2;
        h2 = height / 2;
    }

    function draw(state, time) {
        g.clearRect(0, 0, width, height);

        const fps = Math.round(1 / time);
        showFPS(fps)

        state.entities.forEach(e => {
            if (e.size) { //TODO: better Entity -> View function mapping (including injectable)
                drawCircle(e)
            } else {
                drawRectangle(e)
            }
        })
    }

    function getBounds() {
        return {
            height,
            width
        }
    }

    function showPaused() {
        g.fillStyle = 'white';
        g.fillRect(0, 0, 110, 40);
        g.font = '25px Arial';
        g.fillStyle = 'black';
        g.fillText("Paused", 10, 30);
    }

    function showFPS(fps) {
        g.fillStyle = 'white';
        g.fillRect(0, 0, 110, 40);
        g.font = '25px Arial';
        g.fillStyle = 'black';
        g.fillText(`${fps} fps`, 10, 30);
    }

    function showPosition(x, y) {
        g.font = '25px Arial';
        g.fillStyle = 'black';
        g.fillText(`(${x}, ${height - y})`, 10, window.innerHeight - 10);
    }

    function drawCircle(c) {
        g.lineWidth = 2;
        g.fillStyle = '#333';

        if (c.lastHit)
            g.strokeStyle = '#c66';
        else
            g.strokeStyle = '#666';

        g.beginPath();
        g.arc(c.x, height - c.y, c.size, 0, 2 * Math.PI);
        g.fill();
        g.stroke();
    }

    function drawRectangle(r) {
        g.lineWidth = 2;
        g.fillStyle = '#333';

        g.strokeStyle = '#666';

        g.fillRect(r.x, height - (r.y + r.height), r.width, r.height);
        g.strokeRect(r.x, height - (r.y + r.height), r.width, r.height);

        if (r.lastHit) {
            g.strokeStyle = '#c66';
            if (r.lastHit.edge === 'top')
                g.strokeRect(r.x, height - (r.y + r.height), r.width, 2);
            else if (r.lastHit.edge === 'right')
                g.strokeRect(r.x + r.width, height - (r.y + r.height), 2, r.height);
            else if (r.lastHit.edge === 'bottom')
                g.strokeRect(r.x, height - r.y, r.width, 2);
            else if (r.lastHit.edge === 'left')
                g.strokeRect(r.x, height - (r.y + r.height), 2, r.height);
            else
                g.strokeRect(r.x, height - (r.y + r.height), r.width, r.height);
        }
    }
}
