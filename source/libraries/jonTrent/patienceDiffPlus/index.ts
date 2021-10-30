// #region imports
    // #region external
    import {
        PatienceDiffPlusResult,
    } from '../data';

    import patienceDiff from '../patienceDiff';
    // #endregion external
// #endregion imports



// #region module
/**
 * https://github.com/jonTrent/PatienceDiff
 *
 * ``` text
 * program: "patienceDiffPlus" algorithm implemented in javascript.
 * author: Jonathan Trent
 * version: 2.0
 * ```
 *
 * use: `patienceDiffPlus(aLines, bLines)`
 *
 * where:
 * ``` text
 *      aLines[] contains the original text lines.
 *      bLines[] contains the new text lines.
 *
 * returns an object with the following properties:
 *      lines[] with properties of:
 *          line containing the line of text from aLines or bLines.
 *          aIndex referencing the index in aLine[].
 *          bIndex referencing the index in bLines[].
 *              (Note:  The line is text from either aLines or bLines, with aIndex and bIndex
 *               referencing the original index. If aIndex === -1 then the line is new from bLines,
 *               and if bIndex === -1 then the line is old from aLines.)
 *          moved is true if the line was moved from elsewhere in aLines[] or bLines[].
 *      lineCountDeleted is the number of lines from aLines[] not appearing in bLines[].
 *      lineCountInserted is the number of lines from bLines[] not appearing in aLines[].
 *      lineCountMoved is the number of lines moved outside of the Longest Common Subsequence.
 * ```
 *
 */
function patienceDiffPlus(
    aLines: string,
    bLines: string,
): PatienceDiffPlusResult {
    let difference: any = patienceDiff(aLines, bLines, true);

    let aMoveNext = difference.aMove;
    let aMoveIndexNext = difference.aMoveIndex;
    let bMoveNext = difference.bMove;
    let bMoveIndexNext = difference.bMoveIndex;

    delete difference.aMove;
    delete difference.aMoveIndex;
    delete difference.bMove;
    delete difference.bMoveIndex;

    do {
        let aMove: any = aMoveNext;
        let aMoveIndex: any = aMoveIndexNext;
        let bMove: any = bMoveNext;
        let bMoveIndex: any = bMoveIndexNext;

        aMoveNext = [];
        aMoveIndexNext = [];
        bMoveNext = [];
        bMoveIndexNext = [];

        let subDiff = patienceDiff(aMove as any, bMove as any);

        var lastLineCountMoved = difference.lineCountMoved;

        subDiff.lines.forEach((v: any, i: any) => {
            if (0 <= v.aIndex && 0 <= v.bIndex) {
                difference.lines[aMoveIndex[v.aIndex]].moved = true;
                difference.lines[bMoveIndex[v.bIndex]].aIndex = aMoveIndex[v.aIndex];
                difference.lines[bMoveIndex[v.bIndex]].moved = true;
                difference.lineCountInserted--;
                difference.lineCountDeleted--;
                difference.lineCountMoved++;
                // foundFlag = true;
            } else if (v.bIndex < 0) {
                aMoveNext.push(aMove[v.aIndex]);
                aMoveIndexNext.push(aMoveIndex[v.aIndex]);
            } else {  // if (v.aIndex < 0)
                bMoveNext.push(bMove[v.bIndex]);
                bMoveIndexNext.push(bMoveIndex[v.bIndex]);
            }
        });
    } while (0 < difference.lineCountMoved - lastLineCountMoved);

    return {
        lines: difference.lines,
        deleted: difference.lineCountDeleted,
        inserted: difference.lineCountInserted,
        moved: difference.lineCountMoved,
    };
}
// #endregion module



// #region exports
export default patienceDiffPlus;
// #endregion exports
