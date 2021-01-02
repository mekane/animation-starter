import {Circle, Rectangle} from "../src/Entities.js";
import {Vector} from "../src/Vector.js";

const billiards = [
    new Circle(200, 431, 10, new Vector(0, 0)),
    new Circle(201, 460, 10, new Vector(0, 0)),
    new Circle(200, 492, 10, new Vector(0, 0)),
    new Circle(199, 520, 10, new Vector(0, 0)),
    new Circle(202, 550, 10, new Vector(0, 0)),

    new Circle(231, 445, 10, new Vector(0, 0)),
    new Circle(229, 475, 10, new Vector(0, 0)),
    new Circle(230, 505, 10, new Vector(0, 0)),
    new Circle(230, 535, 10, new Vector(0, 0)),

    new Circle(260, 460, 10, new Vector(0, 0)),
    new Circle(260, 490, 10, new Vector(0, 0)),
    new Circle(260, 520, 10, new Vector(0, 0)),

    new Circle(290, 475, 10, new Vector(0, 0)),
    new Circle(292, 505, 10, new Vector(0, 0)),

    new Circle(318, 490, 10, new Vector(0, 0)),

    new Circle(820, 490, 10, new Vector(-90, 0))
]

function convergeToCenter() {
    const entities = [];
    const maxX = window.innerWidth || 1280;
    const maxY = window.innerHeight || 950;

    for (let x = 20; x < maxX; x += 30) {
        const y1 = getRandomInt(5, 35);
        const size = getRandomInt(8, 12);
        const vx1 = (600 - x) / getRandomInt(20, 25);
        const vy1 = getRandomInt(20, 35);
        entities.push(new Circle(x, y1, size, new Vector(vx1, vy1)))

        const y2 = getRandomInt(maxY - 5, maxY + 25);
        const vx2 = (600 - x) / getRandomInt(20, 25);
        const vy2 = getRandomInt(-25, -40);
        const size2 = getRandomInt(8, 12)
        entities.push(new Circle(x, y2, size2, new Vector(vx2, vy2)))
    }

    return entities;
}

function random() {
    const entities = [];

    for (let i = 0; i < 80; i++)
        entities.push(coinFlip() ? getRandomCircle() : getRandomRectangle());

    return entities;
}

const arrangements = {
    billiards,
    convergeToCenter,
    random
}


function getRandomInt(rangeMin, rangeMax) {
    const min = Math.ceil(rangeMin);
    const max = Math.floor(rangeMax);
    return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
}

function coinFlip() {
    return !!getRandomInt(0, 1);
}

function evenOrOdd(number) {
    return getRandomInt(0, 1) ? number : number * -1;
}

function getRandomCircle() {
    return new Circle(getRandomInt(100, 1200),
        getRandomInt(100, 800),
        getRandomInt(8, 16),
        new Vector(getRandomInt(-7, 7), getRandomInt(-7, 7))
    );
}

function getRandomRectangle() {
    return new Rectangle(
        getRandomInt(100, 1200),
        getRandomInt(100, 800),
        getRandomInt(25, 75),
        getRandomInt(25, 75),
        new Vector(getRandomInt(-7, 7), getRandomInt(-7, 7))
    )
}

function newEntity() {
    return coinFlip() ? getRandomCircle() : getRandomRectangle();
}

export function getOptionsSelect(onChangeCallback) {
    const select = document.createElement('select');

    Object.keys(arrangements).forEach(name => {
        const option = document.createElement('option');
        option.textContent = name;
        option.value = name;
        select.appendChild(option);
    })

    select.addEventListener('change', e => {
        onChangeCallback({entities: getArrangement(e.target.value)});
    });

    return select;
}

export function getArrangement(name) {
    console.log(`getArrangement(${name})`)
    const arrangement = arrangements[name];

    if (typeof arrangement === 'function')
        return arrangement();
    else if (Array.isArray(arrangement))
        return arrangement
    else
        return random();
}