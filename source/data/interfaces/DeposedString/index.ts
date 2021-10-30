// #region imports
    // #region external
    import {
        PatienceDiffLine,
    } from '~libraries/jonTrent';
    // #endregion external
// #endregion imports



// #region module
export type DeposedStringStageStepKind = '+' | '-' | 'm';

export type DeposedStringStageStepAdd = [
    '+',    // type
    number, // start
    string, // value
];

export type DeposedStringStageStepMove = [
    'm',    // type
    number, // from
    number, // length
    number, // to
];

export type DeposedStringStageStepRemove = [
    '-',    // type
    number, // start
    number, // length
];

export type DeposedStringStageStep =
    | DeposedStringStageStepAdd
    | DeposedStringStageStepMove
    | DeposedStringStageStepRemove;

export type DeposedStringStage = DeposedStringStageStep[];

export type DeposedStringStages = DeposedStringStage[];

export interface DeposedStringData {
    stages: DeposedStringStages;
}


export interface DesposedStringModifier {
    type: DeposedStringStageStepKind;
    data: PatienceDiffLine[];
}
// #endregion module
