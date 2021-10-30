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
        DeposedStringStageStepMove,
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
    // console.log('start', start);
    let dataValue = start;

    for (const [stageIndex, stage] of stages.entries()) {
        // console.log('dataValue FOR', dataValue, stage);

        if (index < stageIndex) {
            return dataValue;
        }

        for (const step of stage) {
            // console.log('dataValue FOR STEP', dataValue, step);

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
                case 'm': {
                    // console.log('m', step, dataValue);
                    const from = step[1];
                    const length = step[2];
                    const to = step[3];

                    const segment = dataValue.slice(from, from + length);
                    // console.log('segment', segment);

                    // remove segment from previous location
                    // console.log('dataValue before removed', dataValue);
                    dataValue = dataValue.slice(0, from) + dataValue.slice(from + length);
                    // console.log('dataValue segment removed', dataValue);

                    // insert segment into new location
                    // console.log('dataValue before inserted', dataValue);
                    dataValue = dataValue.slice(0, to) + segment + dataValue.slice(from + length);
                    // console.log('dataValue inserted', dataValue);
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
        } else if (aRemoved && !line.moved) {
            runChecks(
                '+',
                index,
                line,
            );
        } else if (bRemoved && !line.moved) {
            runChecks(
                '-',
                index,
                line,
            );
        } else if (line.moved && !aRemoved && !bRemoved) {
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
            case 'm': {
                const fromIndex = data[0].aIndex;
                const toIndex = data[0].bIndex;
                const change: DeposedStringStageStepMove = [
                    'm',
                    fromIndex,
                    value.length,
                    toIndex,
                ];
                changes.push(change);
                break;
            }
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
    // console.log('patienceDiffPlusResult', patienceDiffPlusResult);

    const modifiers = groupModifiers(
        patienceDiffPlusResult.lines,
    );
    // console.log('modifiers', JSON.stringify(modifiers, null, 4));

    const changes = processModifiers(
        modifiers,
    );
    // console.log('changes', JSON.stringify(changes, null, 4));

    return changes;
}
// #endregion module
