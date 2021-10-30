// #region module
export type DeposedStringStageStepAdd = [
    '+',    // type
    number, // start
    string, // value
];

// export type DeposedStringStageStepMove = [
//     'm',    // type
//     number, // from
//     number, // length
//     number, // to
// ];

export type DeposedStringStageStepRemove = [
    '-',    // type
    number, // start
    number, // length
];

export type DeposedStringStageStep =
    | DeposedStringStageStepAdd
    // | DeposedStringStageStepMove
    | DeposedStringStageStepRemove;

export type DeposedStringStage = DeposedStringStageStep[];

export type DeposedStringStages = DeposedStringStage[];

export interface DeposedStringData {
    stages: DeposedStringStages;
}
// #endregion module
