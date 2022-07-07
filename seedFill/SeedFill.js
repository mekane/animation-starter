
export class SeedFillPlugin extends Plugin {
    getInitialState(initialView = { width: 300, height: 150 }) {
        this.width = initialView.width;
        this.height = initialView.height;

        state = {
            pixels: []
        }

        return state;
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
}

function getRandomInt(rangeMin, rangeMax) {
    const min = Math.ceil(rangeMin);
    const max = Math.floor(rangeMax);
    return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
}
