import {Plugin} from "../src/Plugin.js";
import {Vector as Point} from "../src/Vector.js";

const RED = 0;
const GREEN = 1;
const BLUE = 2;
const ALPHA = 3;

const red = {
    red: 250,
    green: 50,
    blue: 50,
    alpha: 255
}

const yellow = {
    red: 255,
    green: 255,
    blue: 50,
    alpha: 255
}

var iterations = 0;

export class SeedFillPlugin extends Plugin {
    width = 300;
    height = 150;

    pointsToTry = [];

    getInitialState(initialView = {width: 300, height: 150}) {
        this.width = initialView.width;
        this.height = initialView.height;

        const p1 = new Point(getRandomInt(50, this.width - 50), getRandomInt(50, this.height - 50));

        this.pointsToTry.push(p1);

        //console.log('init', this.pointsToTry);

        return {
            entities: []
        }
    }

    preUpdate(state, controls) {
        console.log('update');

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

    /**
     * Set up the next set of pixels to draw
     * @param currentImageData ImageData
     * @param newImageData ImageData
     */
    imageUpdate(currentImageData, newImageData) {
        const nextIteration = [];

        iterations++;
        // if (iterations > 3) {
        //     return currentImageData;
        // }

        console.log(`Iteration ${iterations}`);
        console.log('  points length', this.pointsToTry.length);

        while (this.pointsToTry.length > 0) {
            const p = this.pointsToTry.pop();

            if (this.isOutOfBounds(p)) {
                console.log('  ** out of bounds', p);
                continue;
            }

            const pixel = this.getPixel(currentImageData.data, p.x, p.y)

            if (this.isBlack(pixel)) {
                this.putPixel(currentImageData.data, p.x, p.y, red);

                nextIteration.push(new Point(p.x - 1, p.y - 1));
                nextIteration.push(new Point(p.x - 1, p.y + 0));
                nextIteration.push(new Point(p.x - 1, p.y + 1));

                nextIteration.push(new Point(p.x, p.y - 1));
                nextIteration.push(new Point(p.x, p.y + 1));

                nextIteration.push(new Point(p.x + 1, p.y - 1));
                nextIteration.push(new Point(p.x + 1, p.y + 0));
                nextIteration.push(new Point(p.x + 1, p.y + 1));
            }
        }

        this.pointsToTry = nextIteration;

        /* draw test square in upper-left corner
        for ( let x = 0 ; x < 100 ; x++ ) {
            for (let y = 0; y < 100; y++) {
                this.putPixel(currentImageData.data, x, y, red);
            }
        }
        */

        // console.log('  imageData', currentImageData.data);

        return currentImageData;
    }

    /**
     * Check whether a point is valid to be painted
     * @param point Point
     * @return boolean whether the coordinates are in bounds
     */
    isOutOfBounds(point) {
        return (
            point.x < 0 ||
            point.x > this.width ||
            point.y < 0 ||
            point.y > this.height
        );
    }

    /**
     * @param imageData ImageData
     * @param x number
     * @param y number
     * @returns {{
     *      red: number,
     *      green:number,
     *      blue: number,
     *      alpha: number
     * }}
     */
    getPixel(imageData, x, y) {
        const offset = (y * this.width + this.width) * 4;

        return {
            red: imageData[offset + RED],
            green: imageData[offset + GREEN],
            blue: imageData[offset + BLUE],
            alpha: imageData[offset + ALPHA]
        }
    }

    /**
     * @param imageData ImageData
     * @param x number
     * @param y number
     * @param color {{
     *      red: number,
     *      green:number,
     *      blue: number,
     *      alpha: number
     * }}
     */
    putPixel(imageData, x, y, color) {
        const offset = (y * this.width + x) * 4;
        // console.log(`  put pixel (${x}, ${y}) -> ${offset}`);

        imageData[offset + RED] = color.red;
        imageData[offset + GREEN] = color.green;
        imageData[offset + BLUE] = color.blue;
        imageData[offset + ALPHA] = color.alpha;
    }

    /**
     * Determines whether the given pixel is black
     * NOTE: we're using a threshold here so dark grays are counted as black
     * @param pixel {{ red: number, blue: number, green: number }}
     * @returns boolean
     */
    isBlack(pixel) {
        return (pixel.red < 35 && pixel.green < 35 && pixel.blue < 35)
    }
}


function getRandomInt(rangeMin, rangeMax) {
    const min = Math.ceil(rangeMin);
    const max = Math.floor(rangeMax);
    return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
}
