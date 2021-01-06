import {Projectile} from "../src/Projectile.js";
import {Vector} from "../src/Vector.js";
import {Plugin} from "../src/Plugin.js";

const G = new Vector(0, -3)

export class CannonGamePlugin extends Plugin {
    getInitialState() {
        return super.getInitialState();
    }

    preUpdate(state, controls) {
        //apply gravity
        state.entities.forEach(e => {
            e.accelerate(G)
        })

        if (controls.fire)
            state.entities.push(new Projectile(30, 400, 10, new Vector(400, 120)))
    }
}