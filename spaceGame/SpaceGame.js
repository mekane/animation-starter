import { Plugin } from "../src/Plugin.js";
import { Circle } from "../src/Entities.js";
import { Vector } from "../src/Vector.js";

const adjust = 100;

export class SpaceGamePlugin extends Plugin {
    blackHole;

    getInitialState({ width, height }) {
        //add black hole
        this.blackHole = new Circle(width / 2, height / 2, 100)

        const state = super.getInitialState();
        state.entities = [
            this.blackHole,
            getRandomPlanet(width, height),
            getRandomPlanet(width, height),
            getRandomPlanet(width, height),
            getRandomPlanet(width, height),
            getRandomPlanet(width, height)
        ]

        return state;
    }

    preUpdate(state, controls) {
        if (controls.up)
            this.blackHole.accelerate(new Vector(0, controls.up / adjust));

        if (controls.down)
            this.blackHole.accelerate(new Vector(0, -controls.down / adjust));

        if (controls.left)
            this.blackHole.accelerate(new Vector(-controls.left / adjust, 0));

        if (controls.right)
            this.blackHole.accelerate(new Vector(controls.right / adjust, 0));

        console.log(this.blackHole.velocity)

        if (controls.reset)
            state.entities = this.getInitialState({ width: state.maxX, height: state.maxY })['entities']
    }
}

function getRandomInt(rangeMin, rangeMax) {
    const min = Math.ceil(rangeMin);
    const max = Math.floor(rangeMax);
    return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
}

function getRandomPlanet(w, h) {
    return new Circle(getRandomInt(50, w),
        getRandomInt(50, h),
        getRandomInt(2, 5) * 5,
        new Vector(getRandomInt(-10, 10), getRandomInt(-10, 10))
    );
}
