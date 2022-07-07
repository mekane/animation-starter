import {Game} from '../src/Game.js';
import {HtmlView} from "../src/View.js";
import {BrowserTimer} from "../src/Timer.js";
import {BrowserControls} from "../src/Controls.js";
import {SeedFillPlugin} from "./SeedFill.js";
import "../src/Help.js";

const controls = new BrowserControls()
const view = HtmlView(window, document.getElementById('main'))
const timer = new BrowserTimer();
const game = Game(controls, view, timer, new SeedFillPlugin());
game.step();


//Setup controls
window.addEventListener('keyup', e => {
	if (e.key === '-') {
        if ( speed <= 10 )
            return;
        else if ( speed < 300 )
    		speed -= 10;
        else 
            speed -= 100;
		console.log(`speed ${speed}`);
	}
	else if (e.key === '=' || e.key === '+') {
		if ( speed < 300 )
            speed = 300;
        else 
            speed += 100;
		console.log(`speed ${speed}`);
	}
});

