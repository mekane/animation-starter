import { Plugin } from "../src/Plugin.js";
import { Circle } from "../src/Entities.js";
import { Vector } from "../src/Vector.js";
import { Planet } from "./Planet.js";
import { BlackHole } from "./BlackHole.js";

const adjust = 80;

export class SpaceGamePlugin extends Plugin {
    blackHole;
    width = 300;
    height = 150;

    addMeteor(state) {
        state.entities.push(getRandomPlanet(this.width, this.height, 18))
    }

    addEarth(state) {
        state.entities.push(getRandomPlanet(this.width, this.height, 39, 20))
    }

    addJupiter(state) {
        state.entities.push(getRandomPlanet(this.width, this.height, 90, 50))
    }


    getInitialState(initialView = { width: 300, height: 150 }) {
        this.width = initialView.width;
        this.height = initialView.height;

        //add black hole
        this.blackHole = new BlackHole(this.width / 2, this.height / 2, 15)
        this.blackHole.isBlackHole = true

        const state = super.getInitialState();
        state.entities = [this.blackHole]

        //add 15 little rocky planets
        for (let i = 0; i < 15; i++)
            this.addMeteor(state)

        //add 10 small red planets
        for (let i = 0; i < 10; i++)
            state.entities.push(getRandomPlanet(this.width, this.height, 29, 19))

        //add 5 medium blue planets
        for (let i = 0; i < 10; i++)
            this.addEarth(state)

        //add 3 large green planets
        for (let i = 0; i < 10; i++)
            state.entities.push(getRandomPlanet(this.width, this.height, 49))

        //add one or two gas giants
        this.addJupiter(state)
        this.addJupiter(state)

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

        if (controls.m)
            this.addMeteor(state);

        if (controls.e)
            this.addEarth(state);

        if (controls.j)
            this.addJupiter(state);

        if (controls.reset)
            state.entities = this.getInitialState({ width: state.maxX, height: state.maxY })['entities']
    }
}

function getRandomInt(rangeMin, rangeMax) {
    const min = Math.ceil(rangeMin);
    const max = Math.floor(rangeMax);
    return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
}

function getRandomPlanet(w, h, maxSize = 25, minSize = 10) {
    const p = new Planet(getRandomInt(50, w),
        getRandomInt(50, h),
        getRandomInt(minSize, maxSize),
        new Vector(getRandomInt(-15, 15), getRandomInt(-15, 15))
    );

    return p;
}
