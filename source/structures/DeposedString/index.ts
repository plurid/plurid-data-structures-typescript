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
        initial: string,
    ) {
        this.initial = initial;
    }


    public load(
        data: DeposedStringStages,
    ) {
        this.stages = data;
    }

    public unload() {
        return {
            initial: this.initial,
            stages: this.stages,
        };
    }

    public push(
        value: string,
    ) {
        const currentValue = this.get(this.length());
        const stage = generateStage(currentValue, value);

        if (stage.length > 0) {
            this.stages.push(stage);
        }
    }

    public get(
        index: number,
    ) {
        return getComposedString(
            index,
            {
                start: this.initial,
                stages: this.stages,
            },
        );
    }

    public length() {
        return this.stages.length;
    }
}
// #endregion module



// #region exports
export default DeposedString;
// #endregion exports
