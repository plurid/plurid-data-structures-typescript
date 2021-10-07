// #region imports
    // #region external
    import PieceTable from '../';
    // #endregion external
// #endregion imports



// #region module
describe('PieceTable', () => {
    it('basic test - insert()', () => {
        const pieceTable = new PieceTable('original string');
        pieceTable.insert(' text', 15);
        const text = pieceTable.stringAt(0, 20);
        expect(text).toBe('original string text');
    });

    it('basic test - delete()', () => {
        const pieceTable = new PieceTable('original string');
        pieceTable.insert(' text', 15);
        pieceTable.delete(8, 1);
        const text = pieceTable.stringAt(0, 19);
        expect(text).toBe('originalstring text');
    });

    it('basic test - getSequence()', () => {
        const pieceTable = new PieceTable('original string');
        pieceTable.insert('\ntext', 15);
        const text = pieceTable.getSequence();
        expect(text).toBe('original string\ntext');
    });
});
// #endregion module
