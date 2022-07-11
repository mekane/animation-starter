import {Plugin} from "../src/Plugin.js";

import { Circle } from "../src/Entities.js";
import {Vector} from "../src/Vector.js";

export class SeedFillPlugin extends Plugin {
    width = 300;
    height = 150;

    getInitialState(initialView = {width: 300, height: 150}) {
        this.width = initialView.width;
        this.height = initialView.height;
        return {
            entities: [
                new Circle(100, 100, 100, new Vector(10,10))
            ],
            pixels: []
        }
    }

    preUpdate(state, controls) {
        if (controls.plus) {
            console.log('controls plus');
        }

        if (controls.minus) {
            console.log('controls minus');

        }

        if (controls.reset) {
            console.log('reset');
        }
    }

    imageUpdate(imageData) {
        const data = imageData.data;

        for (let i = 0; i < 1000; i++) {
            const w = getRandomInt(0, this.width);
            const h = getRandomInt(0, this.height);

            const p = (this.width * h + w) * 4;

            data[p] = 25; //red
            data[p + 1] = 255; //green
            data[p + 2] = 0; //blue
            data[p + 3] = 200; //alpha
        }

        return data;
    }
}


function getRandomInt(rangeMin, rangeMax) {
    const min = Math.ceil(rangeMin);
    const max = Math.floor(rangeMax);
    return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
}
