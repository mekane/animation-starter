/**
 * This basically serves the purpose of documenting the interface
 * The IDE picks up this definition and connects it to the JSDocs
 */
export class View {
    draw() {

    }

    /**
     * returns {{width: {Number}, height: {Number}}}
     */
    getBounds() {
        return {
            height: 10,
            width: 10
        }
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

	if (state.showFps) {
          const fps = Math.round(1 / time);
          showFPS(fps)
	}

	if (state.showInfo && state.info) 
	  showInfo(state.info)

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
        const boxWidth = 110;
        const boxHeight = 40;
        const bounds = getBounds();
        const x = bounds.width / 2 - boxWidth / 2;

	g.fillStyle = 'white';
        g.fillRect(x, 0, boxWidth, boxHeight);
        g.font = '25px Arial';
        g.fillStyle = 'black';
        g.fillText("Paused", x + 12, boxHeight - 10);
    }

    function showInfo(infoString) {
	const boxWidth = infoString.length * 16;
	const boxHeight = 40;

	g.fillStyle = 'white';
        g.fillRect(0, 0, boxWidth, boxHeight);
        g.font = '25px Arial';
        g.fillStyle = 'black';
        g.fillText(infoString, 10, boxHeight - 10);
    }

    function showFPS(fps) {
	const boxWidth = 100;
	const boxHeight = 40;
	const bounds = getBounds();
	const x = bounds.width - boxWidth;

	g.fillStyle = 'white';
        g.fillRect(x, 0, boxWidth, boxHeight);
        g.font = '25px Arial';
        g.fillStyle = 'black';
        g.fillText(`${fps} fps`, x + 10, boxHeight - 10);
    }

    function showPosition(x, y) {
        g.font = '25px Arial';
        g.fillStyle = 'black';
        g.fillText(`(${x}, ${height - y})`, 10, window.innerHeight - 10);
    }

    /**
     * @param {Circle} c 
     */
    function drawCircle(c) {
        const style = c.style

        g.fillStyle = style.background
        g.lineWidth = style.borderWidth

        if (c.lastHit) 
            g.strokeStyle = style.borderColorHit
        else 
            g.strokeStyle = style.borderColor

        g.beginPath();
        g.arc(c.x, height - c.y, c.size, 0, 2 * Math.PI);
        g.fill();
        g.stroke();
    }

    /**
     * @param {Rectangle} r 
     */
    function drawRectangle(r) {
        const style = c.style

        g.lineWidth = style.borderWidth
        g.fillStyle = style.background
        g.strokeStyle = style.borderColor

        g.fillRect(r.x, height - (r.y + r.height), r.width, r.height);
        g.strokeRect(r.x, height - (r.y + r.height), r.width, r.height);

        if (r.lastHit) {
            g.strokeStyle = style.borderColorHit
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
