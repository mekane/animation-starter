const twoBalls = [
    {x: 320, y: 480, vx: 16, vy: 0, size: 20},
    {x: 960, y: 480, vx: -16, vy: 0, size: 20}
]

const ballAndRectangleDirect = [
    {x: 100, y: 380, vx: 10, vy: 0, width: 200, height: 200},
    {x: 960, y: 480, vx: -20, vy: 0, size: 20}
]

const ballAndRectangleDirect2 = [
    {x: 960, y: 480, vx: -20, vy: 0, size: 20},
    {x: 100, y: 380, vx: 10, vy: 0, width: 200, height: 200}
]

// illustrates weird rectangle normal for collision
const ballAndRectangleAtAngleOk = [
    {x: 100, y: 180, vx: 0, vy: 0, width: 300, height: 500},
    {x: 800, y: 80, vx: -30, vy: 30, size: 20}
]

// illustrates weird rectangle normal for collision that's not quite right
const ballAndRectangleAtAngleWonky = [
    {x: 100, y: 180, vx: 0, vy: 0, width: 300, height: 450},
    {x: 700, y: 185, vx: -30, vy: 30, size: 20}
]

// illustrates weird rectangle normal for collision that's wrong
const ballAndRectangleAtAngleWithBadCollision = [
    {x: 800, y: 80, vx: -30, vy: 30, size: 20},
    {x: 100, y: 380, vx: 0, vy: 0, width: 200, height: 200}
]

const ballChasingOtherBallToTheRight = [
    {x: 200, y: 480, vx: 30, vy: 0, size: 20},
    {x: 500, y: 480, vx: 10, vy: 0, size: 20}
]

const ballChasingOtherBallToTheLeft = [
    {x: 900, y: 480, vx: -10, vy: 0, size: 20},
    {x: 1200, y: 480, vx: -30, vy: 0, size: 20}
]

const twoRectangles = [
    {x: 200, y: 380, vx: 20, vy: 0, width: 200, height: 200},
    {x: 900, y: 380, vx: -20, vy: 0, width: 200, height: 200}
]

const twoRectanglesAtAngle = [
    {x: 200, y: 40, vx: 20, vy: 20, width: 200, height: 200},
    {x: 900, y: 380, vx: -20, vy: 0, width: 200, height: 200}
]

const rectChasingOtherRectLeft = [
    {x: 400, y: 380, vx: -10, vy: 0, width: 200, height: 200},
    {x: 800, y: 380, vx: -30, vy: 0, width: 200, height: 200}
]

const circleOverlapCircle = [
    {x: 500, y: 380, vx: 0, vy: 0, size: 80},
    {x: 620, y: 380, vx: 0, vy: 0, size: 80}
]

const defaultArrangement = ballAndRectangleAtAngleWithBadCollision;


const arrangements = {
    default: [],
    random: [],
    billiards: [
        //big wall
        // {x: -1000, y: 0, width: 1020, height: 900, vx: 0, vy: 0},

        {x: 200, y: 431, vx: 0, vy: 0, size: 10},
        {x: 201, y: 460, vx: 0, vy: 0, size: 10},
        {x: 200, y: 492, vx: 0, vy: 0, size: 10},
        {x: 199, y: 520, vx: 0, vy: 0, size: 10},
        {x: 202, y: 550, vx: 0, vy: 0, size: 10},

        {x: 231, y: 445, vx: 0, vy: 0, size: 10},
        {x: 229, y: 475, vx: 0, vy: 0, size: 10},
        {x: 230, y: 505, vx: 0, vy: 0, size: 10},
        {x: 230, y: 535, vx: 0, vy: 0, size: 10},

        {x: 260, y: 460, vx: 0, vy: 0, size: 10},
        {x: 260, y: 490, vx: 0, vy: 0, size: 10},
        {x: 260, y: 520, vx: 0, vy: 0, size: 10},

        {x: 290, y: 475, vx: 0, vy: 0, size: 10},
        {x: 292, y: 505, vx: 0, vy: 0, size: 10},

        {x: 318, y: 490, vx: 0, vy: 0, size: 10},

        {x: 820, y: 490, vx: -95, vy: 0, size: 20},
    ],
    convergeToCenter: []
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
    return {
        size: getRandomInt(8, 16),
        x: getRandomInt(100, 1200),
        y: getRandomInt(100, 800),
        vx: getRandomInt(-7, 7),
        vy: getRandomInt(-7, 7)
    }
}

function getRandomRectangle() {
    return {
        x: getRandomInt(100, 1200),
        y: getRandomInt(100, 800),
        vx: getRandomInt(-7, 7),
        vy: getRandomInt(-7, 7),
        width: getRandomInt(30, 60),
        height: getRandomInt(30, 60)
    }
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
        onChangeCallback(getArrangement(e.target.value));
    });

    return select;
}

function getConvergeToCenterArrangement() {
    const entities = [];
    const maxX = window.innerWidth || 1280;
    const maxY = window.innerHeight || 950;

    for (let x = 20; x < maxX; x += 30) {
        entities.push({
            x,
            y: getRandomInt(15, 25),
            vx: (600 - x) / getRandomInt(20, 25),
            vy: getRandomInt(20, 35),
            size: getRandomInt(8, 12)
        })

        entities.push({
            x,
            y: getRandomInt(maxY - 5, maxY + 5),
            vx: (600 - x) / getRandomInt(20, 25),
            vy: getRandomInt(-25, -40),
            size: getRandomInt(8, 12)
        })
    }

    return entities;
}

export function getArrangement(name) {
    if (name === 'convergeToCenter') {
        return getConvergeToCenterArrangement();
    } else if (name === 'random') {
        const entities = [];

        for (let i = 0; i < 80; i++)
            entities.push(coinFlip() ? getRandomCircle() : getRandomRectangle());

        return entities;
    } else {
        const entities = arrangements[name] || [];
        console.log('get ' + name, entities);
        if (entities.length)
            return entities;
    }

    return defaultArrangement;
}