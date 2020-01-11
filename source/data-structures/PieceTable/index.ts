interface PieceTableOptions {

}


interface Piece {
    /**
     * The index in the buffer where the `Piece` starts.
     */
    start: number;

    /**
     * The length of the `Piece`.
     */
    length: number;

    /**
     * The buffer to which the `Piece` points to.
     */
    source: 'add' | 'original';
}


interface IPieceTable {
    /**
     * Inserts a string into the piece table
     * @param {string} text - the string to insert
     * @param {number} start - the offset at which to insert the string
     */
    insert: (text: string, start: number) => void;

    /**
     * Deletes a string from the piece table
     * @param {number} offset - the offset at which to begin deletion
     * @param {number} length - the number of characters to delete. If negative, deletes backwards
     */
    delete: (offset: number, length: number) => any;

    /**
     * Gets the sequence as a string.
     * @returns {string} - the sequence
     */
    getSequence: () => string;


    /**
     * Gets a string of a particular length from the piece table at a particular offset
     * @param {number} offset - the offset from which to get the string
     * @param {number} length - the number of characters to return from the offset. If negative, looks backwards
     */
    stringAt: (offset: number, length: number) => string | undefined;
}


class PieceTable implements IPieceTable {
    private options?: PieceTableOptions;
    private original: string;
    private add: string = '';
    private pieces: Piece[] = [];

    /**
     * An error thrown when an attempt is made to access the sequence at an invalid index
     */
    private outOfBoundsError = new Error("Index out of bounds.");


    constructor(
        original: string,
        options?: PieceTableOptions,
    ) {
        this.options = options;

        this.original = original;

        const originalPiece: Piece = {
            start: 0,
            length: original.length,
            source: 'original',
        };
        this.pieces = [originalPiece];
    }


    /**
     * Returns the index in the pieces table of the piece that contains the character at offset,
     * and the offset into that piece's buffer corresponding to the offset
     *
     * @param offset - an index into the sequence (not into the piece table)
     * @returns {number[]} A 2-number array where the first number is the piece table index, and the second is the offset into that piece's buffer
     */
    private sequenceOffsetToPieceIndexAndBufferOffset = (
        offset: number
    ): number[] => {
        if (offset < 0) {
            throw this.outOfBoundsError;
        }

        let remainingOffset = offset;
        for (let i = 0; i < this.pieces.length; i++) {
            let piece = this.pieces[i];
            if (remainingOffset <= piece.length) {
                return [i, piece.start + remainingOffset];
            }
            remainingOffset -= piece.length;
        }

        // If this is reached, the offset is greater than the sequence length
        throw this.outOfBoundsError;
    }


    insert (
        text: string,
        start: number,
    ): void {
        const textLength = text.length;

        if (textLength === 0) {
            return;
        }

        const addBufferOffset = this.add.length;
        this.add += text;
        const [pieceIndex, bufferOffset] = this.sequenceOffsetToPieceIndexAndBufferOffset(start);
        let originalPiece = this.pieces[pieceIndex];

        /**
         * If the piece points to the end of the add buffer,
         * and we are inserting at its end, simply increase its length
         */
        if (
            originalPiece.source === 'add'
            && bufferOffset === originalPiece.start + originalPiece.length
            && originalPiece.start + originalPiece.length === addBufferOffset
        ) {
            originalPiece.length += textLength;
            return;
        }


        const startPiece: Piece = {
            source: originalPiece.source,
            start: originalPiece.start,
            length: bufferOffset - originalPiece.start
        };

        const middlePiece: Piece = {
            source: 'add',
            start: addBufferOffset,
            length: textLength,
        }

        const endPiece: Piece = {
            source: originalPiece.source,
            start: bufferOffset,
            length: originalPiece.length - (bufferOffset - originalPiece.start),
        }

        const insertPieces = [
            startPiece,
            middlePiece,
            endPiece,
        ].filter((piece) => {
            return piece.length > 0;
        });

        this.pieces.splice(pieceIndex, 1, ...insertPieces);
    }


    delete (
        offset: number,
        length: number,
    ): any {
        if (length === 0) {
            return;
        }

        if (length < 0) {
            return this.delete(offset + length, -length);
        }

        if (offset < 0) {
            throw this.outOfBoundsError;
        }

        // First, find the affected pieces, since a delete can span multiple pieces
        let [initialAffectedPieceIndex, initialBufferOffset] = this.sequenceOffsetToPieceIndexAndBufferOffset(offset);
        let [finalAffectedPieceIndex, finalBufferOffset] = this.sequenceOffsetToPieceIndexAndBufferOffset(offset + length);

        // If the delete occurs at the end or the beginning of a single piece, simply adjust the window
        if (initialAffectedPieceIndex === finalAffectedPieceIndex) {
            let piece = this.pieces[initialAffectedPieceIndex];
            // Is the delete at the beginning of the piece?
            if (initialBufferOffset === piece.start) {
                piece.start += length;
                piece.length -= length;
                return;
            }
            // Or at the end of the piece?
            else if (finalBufferOffset === piece.start + piece.length) {
                piece.length -= length;
                return;
            }
        }

        const deletePieces: Piece[] = [
            {
                source: this.pieces[initialAffectedPieceIndex].source,
                start: this.pieces[initialAffectedPieceIndex].start,
                length: initialBufferOffset - this.pieces[initialAffectedPieceIndex].start,
            },
            {
                source: this.pieces[finalAffectedPieceIndex].source,
                start: finalBufferOffset,
                length: this.pieces[finalAffectedPieceIndex].length - (finalBufferOffset - this.pieces[finalAffectedPieceIndex].start),
            },
        ].filter(function(piece) {
            return piece.length > 0;
        });

        this.pieces.splice(
            initialAffectedPieceIndex,
            finalAffectedPieceIndex - initialAffectedPieceIndex + 1,
            ...deletePieces,
        );

        return;
    }


    getSequence () {
        let str = '';
        this.pieces.forEach((piece) => {
            if (piece.source === 'add') {
                str += this.add.substr(piece.start, piece.length);
            }
            else {
                str += this.original.substr(piece.start, piece.length);
            }
        });
        return str;
    }


    stringAt (
        offset: number,
        length: number,
    ): string | undefined {
        if (length < 0) {
            return this.stringAt(offset + length, -length);
        }

        let str = '';

        const [initialPieceIndex, initialBufferOffset] = this.sequenceOffsetToPieceIndexAndBufferOffset(offset);
        const [finalPieceIndex, finalBufferOffset] = this.sequenceOffsetToPieceIndexAndBufferOffset(offset + length);

        let piece = this.pieces[initialPieceIndex];
        let buf = piece.source === 'add'
            ? this.add
            : this.original;

        let remainingPieceLength = initialBufferOffset - piece.start;

        if (length < piece.length - (remainingPieceLength)) {
            str = buf.substr(initialBufferOffset, length);
        } else {
            str += buf.substr(initialBufferOffset, remainingPieceLength);

            // Iterate through remaining pieces
            for (let i = initialPieceIndex; i <= finalPieceIndex; i++) {
                piece = this.pieces[i];
                buf = piece.source === 'add'
                    ? this.add
                    : this.original;

                // If this is the final piece, only add the remaining length to the string
                if (i === finalPieceIndex) {
                    str += buf.substr(piece.start, finalBufferOffset - piece.start);
                }
                // Otherwise, add the whole piece to the string
                else {
                    str += buf.substr(piece.start, piece.length);
                }
            }
        }

        return str === '' ? undefined : str;
    }


    /**
     * PieceTable iterator
     */
    [Symbol.iterator] = () => {
        let currentPiece = 0;
        let currentOffset = 0;

        return {
            next: () => {
                if (currentOffset > this.pieces[currentPiece].length - 1) {
                    currentPiece++;
                    currentOffset = 0;
                }

                if (currentPiece > this.pieces.length - 1) {
                    return {done: true};
                } else {
                    const piece = this.pieces[currentPiece];
                    let val;

                    if (piece.source === 'add') {
                        val = this.add.substr(piece.start + currentOffset, 1);
                    } else {
                        val = this.original.substr(piece.start + currentOffset, 1);
                    }
                    currentOffset++;

                    return {value: val, done: false};
                }
            }
        };
    }
}


export default PieceTable;
