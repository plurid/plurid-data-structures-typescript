// #region imports
    // #region external
    import Stepper from '../index';
    // #endregion external
// #endregion imports



// #region module
describe('Stepper', () => {
    it('works', async () => {
        const id = 'one';
        const stepper = new Stepper();

        stepper.define(
            id,
            async (value) => {
                console.log(value);
            },
        );

        stepper.step(
            id,
            1,
        );
        stepper.step(
            id,
            -1,
        );
        stepper.step(
            id,
            2,
        );

        // await new Promise ((resolve) => {
        //     setTimeout(() => {
        //         console.log('ended');
        //         resolve(true);
        //     }, 10_000);
        // });
    });
});
// #endregion module
