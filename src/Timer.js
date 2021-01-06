/**
 * This basically serves the purpose of documenting the interface
 * The IDE picks up this definition and connects it to the JSDocs
 * We use this default "no-op" one as a test stub
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
 * @param msInterval
 */
export class IntervalTimer extends Timer {
    msDelay = 1000
    timeoutRef;

    constructor(delay) {
        super()
        this.msDelay = delay
    }

    tick(callback) {
        this.timeoutRef = setTimeout(() => callback(performance.now()), msDelay)
    }
}
