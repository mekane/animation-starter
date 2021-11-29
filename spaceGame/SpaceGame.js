import { Plugin } from "../src/Plugin.js";
import { Circle } from "../src/Entities.js";
import { Vector } from "../src/Vector.js";
import { Planet } from "./Planet.js";
import { BlackHole } from "./BlackHole.js";

const adjust = 80;

export class SpaceGamePlugin extends Plugin {
    blackHole;

    getInitialState(initialView = { width: 300, height: 150 }) {
        const { width, height } = initialView;
        //add black hole
        this.blackHole = new BlackHole(width / 2, height / 2, 15)
        this.blackHole.isBlackHole = true

        const state = super.getInitialState();
        state.entities = [this.blackHole]

        //add 15 little rocky planets
        for (let i = 0; i < 15; i++)
            state.entities.push(getRandomPlanet(width, height, 18))

        //add 10 small red planets
        for (let i = 0; i < 10; i++)
            state.entities.push(getRandomPlanet(width, height, 29))

        //add 5 medium blue planets
        for (let i = 0; i < 10; i++)
            state.entities.push(getRandomPlanet(width, height, 39))

        //add 3 large green planets
        for (let i = 0; i < 10; i++)
            state.entities.push(getRandomPlanet(width, height, 49))

        //add one or two gas giants
        state.entities.push(getRandomPlanet(width, height, 75))
        state.entities.push(getRandomPlanet(width, height, 90))


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

        //console.log(this.blackHole.velocity)

        if (controls.reset)
            state.entities = this.getInitialState({ width: state.maxX, height: state.maxY })['entities']
    }
}

function getRandomInt(rangeMin, rangeMax) {
    const min = Math.ceil(rangeMin);
    const max = Math.floor(rangeMax);
    return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
}

function getRandomPlanet(w, h, maxSize = 25) {
    return new Planet(getRandomInt(50, w),
        getRandomInt(50, h),
        getRandomInt(10, maxSize),
        new Vector(getRandomInt(-15, 15), getRandomInt(-15, 15))
    );
}
