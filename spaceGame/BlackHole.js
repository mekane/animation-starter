import { Circle, Rectangle } from "../src/Entities.js";
import { Planet } from "./Planet.js";

export class BlackHole extends Circle {

    /**
     * @param acceleration {Vector} 
     * @param otherEntity {Entity}  
     */
    collision(acceleration, otherEntity) {
        super.collision(acceleration)

        if (otherEntity.area > this.area || otherEntity instanceof Rectangle)
            return;
        else {
            console.log('black hole ate ', otherEntity)
            otherEntity._destroyed = true

            const newArea = this.area + otherEntity.area / 2;
            const newR = Math.sqrt(newArea / 3.14);
            this._size = newR
        }
    }

    get style() {
        const base = super.style;
        base.background = '#111'
        base.borderColor = '#333'
        base.borderWidth = 2
        base.borderColorHit = '#66c'

        return base;
    }
}