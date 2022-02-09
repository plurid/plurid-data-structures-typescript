// #region module
export type UpdaterFunction = (
    value: number,
) => Promise<void> | void;

export interface StepperDefinition {
    updater: UpdaterFunction;
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
// #endregion module
