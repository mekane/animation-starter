import { Plugin } from "../src/Plugin.js";
import { Circle } from "../src/Entities.js";
import { Vector } from "../src/Vector.js";

const adjust = 100;

export class SpaceGamePlugin extends Plugin {
    blackHole;

    getInitialState({ width, height }) {
        //add black hole
        this.blackHole = new Circle(width / 2, height / 2, 100)
        const planet1 = new Circle(100, 100, 10, new Vector(1, 1))
        const planet2 = new Circle(600, 100, 10, new Vector(1, 5))

        const state = super.getInitialState();
        state.entities = [
            this.blackHole,
            planet1,
            planet2
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
            state.entities = this.getInitialState({width: state.maxX, height: state.maxY})['entities']
    }
}