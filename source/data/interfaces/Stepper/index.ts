// #region module
export interface StepperOptions {
    runInterval?: number;
}


export type StepperUpdaterFunction = (
    value: number,
) => Promise<void> | void;


export interface StepperDefinition {
    updater: StepperUpdaterFunction;
    updateTime: number | undefined;
    lowerLimit: number | undefined;
    upperLimit: number | undefined;
}


/**
 * `[lowerLimit, upperLimit]` tuple
 */
export type StepperLimits = [
    number | undefined,
    number | undefined,
];


export interface StepperDefineOptions {
    currentValue?: number;
    limits?: StepperLimits;
    updateTime?: number;
}
// #endregion module
