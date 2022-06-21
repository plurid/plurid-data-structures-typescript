// #region imports
    // #region external
    import CacherManager from '..';
    // #endregion external
// #endregion imports



// #region module
describe('CacherManager', () => {
    it('works', () => {
        const cache = new CacherManager<string, string>([
            (
                index,
                context,
            ) => {
                if (!context) {
                    return 'contextless';
                }

                if (index === 'two') {
                    return 'twoData';
                }

                return 'true';
            },
        ]);

        const one = cache.get('one');
        expect(one).toEqual('contextless');

        const two = cache.get('two', 'context');
        expect(two).toEqual('twoData');

        cache.set('three', 'threeData');
        const three = cache.get('three', 'context');
        expect(three).toEqual('threeData');

        cache.destroy();
    });
});
// #endregion module
