import { Circle } from "../src/Entities.js";

export class BlackHole extends Circle {

    /**
     * @param acceleration {Vector} 
     * @param otherEntity {Entity}  
     */
    collision(acceleration, otherEntity) {
        super.collision(acceleration)

        if (otherEntity.area > this.area)
            return;
        else {
            console.log('black hole ate ', otherEntity)
            otherEntity._destroyed = true

            const newArea = this.area + otherEntity.area / 2;
            const newR = Math.sqrt(newArea / 3.14);
            console.log('new area ' + newArea)
            console.log('new radius ' + newR)
            this._size = newR
        }
    }
}