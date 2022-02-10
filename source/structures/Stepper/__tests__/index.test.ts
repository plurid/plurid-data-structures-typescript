// #region imports
    // #region external
    import Stepper from '../index';
    // #endregion external
// #endregion imports



// #region module
describe('Stepper', () => {
    xit('works', async () => {
        let value: number | undefined;
        const id = 'one';
        const stepper = new Stepper();

        stepper.define(
            id,
            async (stepperValue) => {
                value = stepperValue;
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

        await new Promise ((resolve) => {
            setTimeout(() => {
                stepper.stop();
                resolve(true);
            }, 6_000);
        });

        expect(value).toEqual(0);
    });


    it('works async', async () => {
        let value: number | undefined;
        const id = 'one';
        const stepper = new Stepper();

        stepper.define(
            id,
            async (stepperValue) => {
                value = stepperValue;
            },
        );

        stepper.step(
            id,
            1,
        );
        await new Promise ((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1_000);
        });
        stepper.step(
            id,
            -1,
        );
        stepper.step(
            id,
            2,
        );

        await new Promise ((resolve) => {
            setTimeout(() => {
                stepper.stop();
                resolve(true);
            }, 6_000);
        });

        expect(value).toEqual(2);
    });
});
// #endregion module
