/**
 * Module for defining how the animation loop gets triggered (repeated).
 * Implementations need to actually invoke the callback in the tick method
 * according to their timing mechanism.
 * This base class provides default "no-op" and is used by the unit tests as a stub
 */
export class Timer {
    /**
     * Request that the callback be executed at the next possible time
     * according to the Timer. Must pass a timestamp to the callback
     * so it can keep track of time elapsed between calls.
     * @param callback {Timer~tick}
     */
    tick(callback) {

    }

    /**
     * @callback Timer~tick
     * @param time {Number} the current timestamp
     */

    //cancel
    //pause?
}


/**
 * This Timer implementation uses the `requestAnimationFrame` browser API
 * to make sure the ticks happen smoothly and as fast as possible without
 * hampering the browser's performance.
 */
export class BrowserTimer extends Timer {
    tick(callback) {
        requestAnimationFrame(callback)
    }
}

/**
 * This Timer implementation uses a plain setTimeout to call
 * the tick callback on a defined interval.
 * Use 16.6 (1000/60) to lock it in at 60 animation loops per second (fps)
 * @param msInterval how many ms to wait before invoking the callback
 */
export class IntervalTimer extends Timer {
    msDelay = 1000
    timeoutRef;

    constructor(delay) {
        super()
        this.msDelay = delay
    }

    /**
     * @param {number} newDelay new delay in ms
     */
    setDelay(newDelay) {
        this.msDelay = newDelay
    }

    tick(callback) {
        this.timeoutRef = setTimeout(() => callback(performance.now()), this.msDelay)
    }
}
