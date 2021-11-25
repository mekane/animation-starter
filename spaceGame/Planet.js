import {Circle} from "../src/Entities.js";

export class Planet extends Circle {

    collision(acceleration, otherEntity) {
        super.collision(acceleration)

        if (otherEntity.isBlackHole) {
            console.log('planet hit the black hole!')
            this._destroyed = true
        }
    }
}