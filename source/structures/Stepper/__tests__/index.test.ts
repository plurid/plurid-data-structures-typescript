// #region imports
    // #region external
    import Stepper from '../index';
    // #endregion external
// #endregion imports



// #region module
describe('Stepper', () => {
    it('works', () => {
        const id = 'one';
        const stepper = new Stepper();

        stepper.define(
            id,
            (value) => {
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
    });
});
// #endregion module
