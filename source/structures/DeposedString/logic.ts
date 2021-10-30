// #region imports
    // #region external
    import {
        patienceDiffPlus,
        PatienceDiffPlusLine,
    } from '~libraries/jonTrent';

    import {
        DeposedStringStage,
        DeposedStringStages,
        DeposedStringStageStep,
        DeposedStringStageStepAdd,
        DeposedStringStageStepRemove,
        DeposedStringStageStepKind,

        DesposedStringModifier,
    } from '~data/interfaces/DeposedString';
    // #endregion external
// #endregion imports



// #region module
export const getComposedString = (
    index: number,
    start: string,
    stages: DeposedStringStages,
) => {
    let dataValue = start;

    for (const [stageIndex, stage] of stages.entries()) {
        if (index < stageIndex) {
            return dataValue;
        }

        for (const step  of stage) {
            const type = step[0];

            switch (type) {
                case '+': {
                    const start = step[1];
                    const value = step[2];
                    dataValue = dataValue.slice(0, start) + value + dataValue.slice(start);
                    break;
                }
                case '-': {
                    const start = step[1];
                    const length = step[2];
                    dataValue = dataValue.slice(0, start) + dataValue.slice(start + length);
                    break;
                }
            }
        }
    }

    return dataValue;
}



const groupModifiers = (
    lines: PatienceDiffPlusLine[],
) => {
    const linesLength = lines.length;

    let type: DeposedStringStageStepKind | '' = '';
    let temporaryStep: PatienceDiffPlusLine[] = [];
    let modifiers: DesposedStringModifier[] = [];


    const collectModifiers = () => {
        if (!type) {
            return;
        }

        if (temporaryStep.length > 0) {
            modifiers.push({
                type,
                data: temporaryStep,
            });
            temporaryStep = [];
        }
    }

    const endModifiers = (
        index: any,
        line: any,
    ) => {
        if (!type) {
            return;
        }

        if (index === linesLength - 1) {
            modifiers.push({
                type,
                data: [
                    line,
                ],
            });
        }
    }

    const runChecks = (
        checkType: DeposedStringStageStepKind,
        index: number,
        line: PatienceDiffPlusLine,
    ) => {
        if (type === checkType) {
            temporaryStep.push(line);

            if (index === linesLength - 1) {
                collectModifiers();
            }
        } else {
            collectModifiers();

            type = checkType;
            temporaryStep.push(line);

            endModifiers(
                index,
                line,
            );
        }
    }


    for (const [index, line] of lines.entries()) {
        const {
            aIndex,
            bIndex,
        } = line;

        const aEqualB = aIndex === bIndex;
        const aRemoved = aIndex === -1;
        const bRemoved = bIndex === -1;

        if (
            aEqualB
            || (!aRemoved && !bRemoved && !line.moved)
        ) {
            collectModifiers();

            type = '';
        } else if (aRemoved) {
            runChecks(
                '+',
                index,
                line,
            );
        } else if (bRemoved) {
            runChecks(
                '-',
                index,
                line,
            );
        } else if (line.moved) {
            runChecks(
                'm',
                index,
                line,
            );
        }
    }

    return modifiers;
}


const processModifiers = (
    modifiers: DesposedStringModifier[],
) => {
    const changes: DeposedStringStageStep[] = [];
    let offset = 0;

    for (const modifier of modifiers) {
        const {
            type,
            data,
        } = modifier;

        const value = data.reduce((accumulator, item) => accumulator + item.line, '');

        switch (type) {
            case '+': {
                offset += value.length;
                const startIndex = data[0].bIndex;
                const change: DeposedStringStageStepAdd = [
                    '+',
                    startIndex,
                    value,
                ];
                changes.push(change);
                break;
            }
            case '-': {
                const startIndex = offset + data[0].aIndex;
                offset -= value.length;
                const change: DeposedStringStageStepRemove = [
                    '-',
                    startIndex,
                    value.length,
                ];
                changes.push(change);
                break;
            }
            case 'm':
                break;
        }
    }

    return changes;
}


export const generateStage = (
    baseValue: string,
    differenceValue: string,
): DeposedStringStage => {
    if (baseValue === differenceValue) {
        return [];
    }

    const patienceDiffPlusResult = patienceDiffPlus(
        baseValue,
        differenceValue,
    );

    const modifiers = groupModifiers(
        patienceDiffPlusResult.lines,
    );

    const changes = processModifiers(
        modifiers,
    );

    return changes;
}
// #endregion module
