const path = require('path');

const spaceGameBundle = {
    entry: './spaceGame/app.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'spacegame.bundle.js'
    }
};

module.exports = [
    spaceGameBundle
];
