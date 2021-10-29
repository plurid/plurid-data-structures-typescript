// #region module
export interface PieceTableOptions {
}


export interface Piece {
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


export interface IPieceTable {
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
// #endregion module
