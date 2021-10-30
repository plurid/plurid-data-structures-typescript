// #region imports
    // #region external
    import {
        DeposedStringStages,
    } from '~data/interfaces/DeposedString';
    // #endregion external


    // #region internal
    import {
        getComposedString,
        generateStage,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
class DeposedString {
    private initial;
    private stages: DeposedStringStages = [];


    constructor(
        initial: string = '',
    ) {
        this.initial = initial;
    }


    /**
     * Load `DeposedString` stages.
     *
     * @param data
     */
    public load(
        data: DeposedStringStages,
    ) {
        this.stages = data;
    }

    /**
     * Extract the internal state of the `DeposedString`.
     *
     * @returns
     */
    public unload() {
        return {
            initial: this.initial,
            stages: this.stages,
        };
    }

    /**
     * Push a new `value` unto the `stages` stack.
     *
     * @param value
     */
    public push(
        value: string,
    ) {
        const currentValue = this.get();
        const stage = generateStage(currentValue, value);

        if (stage.length > 0) {
            this.stages.push(stage);
        }
    }

    /**
     * Get the string at `index`. If no `index` gets the last string.
     *
     * @param index
     * @returns
     */
    public get(
        index?: number,
    ): string {
        if (typeof index === 'undefined') {
            return this.get(this.length());
        }

        return getComposedString(
            index,
            this.initial,
            this.stages,
        );
    }

    /**
     * Removes the `index` stage.
     *
     * @param index
     */
    public remove(
        index: number,
    ) {
        if (index < 0) {
            return false;
        }

        if (index > this.length()) {
            return false;
        }

        this.stages = this.stages.splice(index, 1);

        return true;
    }

    /**
     * Get the count of string composition stages.
     *
     * @returns
     */
    public length() {
        return this.stages.length;
    }
}
// #endregion module



// #region exports
export default DeposedString;
// #endregion exports
