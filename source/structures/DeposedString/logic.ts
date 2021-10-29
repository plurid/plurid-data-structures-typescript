// #region imports
    // #region external
    import patienceDiff from '../../libraries/jonTrent/patienceDiff';

    import {
        DeposedStringStage,
        DeposedStringStages,
        DeposedStringStageStep,
        DeposedStringStageStepAdd,
        DeposedStringStageStepRemove,
    } from '~data/interfaces/DeposedString';
    // #endregion external
// #endregion imports



// #region module
export const getComposedString = (
    index: number,
    data: {
        start: string;
        stages: DeposedStringStages;
    },
) => {
    let dataValue = data.start;

    for (const [stageIndex, stage] of data.stages.entries()) {
        if (index < stageIndex) {
            return dataValue;
        }

        for (const step  of stage) {
            const type = step[0];

            switch (type) {
                case '+': {
                    const start = step[1];
                    const value = step[2];
                    // console.log('dataValue add', dataValue, dataValue.slice(0, start), dataValue.slice(start));
                    dataValue = dataValue.slice(0, start) + value + dataValue.slice(start);
                    // console.log('dataValue after add', dataValue);
                    break;
                }
                case '-': {
                    const start = step[1];
                    const length = step[2];
                    // console.log('dataValue remove', dataValue, dataValue.slice(0, start), dataValue.slice(start + length));
                    dataValue = dataValue.slice(0, start) + dataValue.slice(start + length);
                    // console.log('dataValue after remove', dataValue);
                    break;
                }
            }
        }
    }

    return dataValue;
}



const groupModifiers = (
    lines: any[],
) => {
    const linesLength = lines.length;

    let type = '';
    let temporaryStep: any[] = [];
    let steps: any[] = [];


    const collectSteps = () => {
        if (temporaryStep.length > 0) {
            steps.push({
                type,
                data: temporaryStep,
            });
            temporaryStep = [];
        }
    }

    const endSteps = (
        index: any,
        line: any,
    ) => {
        if (index === linesLength - 1) {
            steps.push({
                type,
                data: [
                    line,
                ],
            });
        }
    }


    for (const [index, line] of lines.entries()) {
        const {
            aIndex,
            bIndex,
        } = line;

        if (aIndex === bIndex) {
            collectSteps();

            type = '';
        } else if (aIndex === -1) {
            if (type === '+') {
                temporaryStep.push(line);

                if (index === linesLength - 1) {
                    collectSteps();
                }
            } else {
                collectSteps();

                type = '+';
                temporaryStep.push(line);

                endSteps(
                    index,
                    line,
                );
            }
        } else if (bIndex === -1) {
            if (type === '-') {
                temporaryStep.push(line);

                if (index === linesLength - 1) {
                    collectSteps();
                }
            } else {
                collectSteps();

                type = '-';
                temporaryStep.push(line);

                endSteps(
                    index,
                    line,
                );
            }
        }
    }

    return steps;
}


const processModifiers = (
    modifiers: any[],
) => {
    const changes: DeposedStringStageStep[] = [];

    for (const modifier of modifiers) {
        const {
            type,
            data,
        } = modifier;

        const value = data.reduce((accumulator: any, item: any) => accumulator + item.line, '');

        switch (type) {
            case '+': {
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
                const startIndex = data[0].aIndex;
                const change: DeposedStringStageStepRemove = [
                    '-',
                    startIndex,
                    value.length,
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

    const patienceDiffResult = patienceDiff(
        baseValue,
        differenceValue,
    );

    const modifiers = groupModifiers(
        patienceDiffResult.lines,
    );

    const changes = processModifiers(
        modifiers,
    );

    return changes;
}
// #endregion module
