import {Circle} from "./Entities.js";

export class Projectile extends Circle {

    collision(acceleration) {
        super.collision(acceleration)
        this._destroyed = true
    }
}