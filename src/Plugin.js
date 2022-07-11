/**
 * Other games can extend this and provide them to the main Game module
 * during setup to override and extend parts of the animation loop and
 * to implement their custom logic.
 * This base class returns stub values and is used in unit tests.
 */
export class Plugin {
    /**
     * This is how the plugin sets up the initial game state including Entities
     * @param bounds {{
     *   width: number,
     *   height: number
     * }}
     * @returns {{
     *   entities: Entity[]
     * }}
     */
    getInitialState( bounds ) {
        return {entities: []}
    }

    /**
     * Called every game loop before the Entities are updated for position,
     * velocity, etc. Chance for the plugin to add new Entities, add new
     * effects like gravity, or check for conditions.
     * @param state {{}}
     * @param controls {{}}
     * @returns state {{}}
     */
    preUpdate(state, controls) {
        return state
    }

    /**
     * Called every game loop before drawing to give the plugin a chance
     * to draw pixels for the background. The plugin is given an array of
     * unsigned bytes, four for each pixel RGBA. It should modify and return
     * the pixel data.
     * @param data Uint8ClampedArray
     * @return Uint8ClampedArray
     */
    imageUpdate(data) {
        return data
    }
}