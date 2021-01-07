/**
 * Other games can extend this and provide them to the main Game module
 * during setup to override and extend parts of the animation loop and
 * to implement their custom logic.
 * This base class returns stub values and is used in unit tests.
 */
export class Plugin {
    /**
     * This is how the plugin sets up the initial game state including Entities
     * @returns {{
     *   entities: Entity[]
     * }}
     */
    getInitialState() {
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
}