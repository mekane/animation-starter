# JavaScript Animation Framework

This project started as a sandbox to figure out how to do proper animation
in JavaScript using a Canvas and turned into a 2D physics simulator module
and then evolved into a framework for implementing little browser games.

The source directory has some basic classes and class-like modules that can
be extended to add different behavior to a game.

## Bounce House

A bounce house is like a sandbox, but whatever goes in gets bounced around.
This is pretty much the most basic demo of what the framework has to offer.
Just open it in a browser and press 'p' to un-pause and watch things go.
There is an assortment of object arrangements defined in arrangements.js,
and you can play around with a new set by defining an array of Entities or
a function that returns one and add it to the list of arrangements.

## Setup

   * `npm install`
   * `npm test` to run unit tests
   * Open `bounceHouse/index.html` in a browser to view initial animations
