import { Circle } from "../src/Entities.js";

export class Planet extends Circle {
    _color

    constructor(x, y, s, v) {
        super(x, y, s, v)

        if (s <= 19)
            this._color = '#333'
        if (s > 19)
            this._color = '#633'
        if (s > 29)
            this._color = '#336'
        if (s > 39)
            this._color = '#363'
        if (s > 49)
            this._color = '#863'

    }


    get style() {
        const base = super.style
        base.background = this._color
        return base
    }
}