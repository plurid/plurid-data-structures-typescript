// #region module
export type DeposedStringStageStepAdd = [
    '+',    // type
    number, // start
    string, // value
];

export type DeposedStringStageStepRemove = [
    '-',    // type
    number, // start
    number, // length
];

export type DeposedStringStageStep =
    | DeposedStringStageStepAdd
    | DeposedStringStageStepRemove;

export type DeposedStringStage = DeposedStringStageStep[];

export type DeposedStringStages = DeposedStringStage[];

export interface DeposedStringData {
    stages: DeposedStringStages;
}
// #endregion module
