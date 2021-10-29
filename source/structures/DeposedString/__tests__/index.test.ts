// #region imports
    // #region external
    import DeposedString from '../';
    // #endregion external
// #endregion imports



// #region module
describe('DeposedString', () => {
    it('works', () => {
        const deposedString = new DeposedString('');

        deposedString.push('a');
        deposedString.push('ab');
        deposedString.push('abc');

        const a = deposedString.get(0);
        expect(a).toEqual('a');

        const ab = deposedString.get(1);
        expect(ab).toEqual('ab');

        const abc = deposedString.get(2);
        expect(abc).toEqual('abc');
    });
});
// #endregion module
