import {Game} from '../src/Game.js';
import {HtmlView} from "../src/View.js";
import {BrowserTimer} from "../src/Timer.js";
import {BrowserControls} from "../src/Controls.js";
import {SpaceGamePlugin} from "./SpaceGame.js";
import "../src/Help.js";

const controls = new BrowserControls()
const view = HtmlView(window, document.getElementById('main'))
const timer = new BrowserTimer();
const game = Game(controls, view, timer, new SpaceGamePlugin(), {walls: true});
game.step();

