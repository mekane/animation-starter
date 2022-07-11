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
     * to draw pixels for the background.
     *
     * The method will be called with two ImageData objects, the first
     * one will have the current pixels and the second will be the
     * same size but blank. The plugin is free to modify and return
     * either one, which will be used to draw the next frame.
     *
     * Note that the current image data includes pixels drawn by any
     * entities in the scene!
     *
     * @param currentPixels ImageData
     * @param newPixels ImageData
     * @return ImageData - the next set of pixels to draw
     */
    imageUpdate(currentPixels, newPixels) {
        return currentPixels;
    }
}