// #region module
export interface PatienceDiffLine {
    line: string;
    aIndex: number;
    bIndex: number;
}

export interface PatienceDiffResult {
    lines: PatienceDiffLine[];
    deleted: number;
    inserted: number;
}


export interface PatienceDiffPlusLine extends PatienceDiffLine {
    moved?: boolean;
}

export interface PatienceDiffPlusResult extends PatienceDiffResult{
    lines: PatienceDiffPlusLine[];
    moved: number;
}
// #endregion module
