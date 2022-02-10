// #region imports
    // #region external
    import Stepper from '../index';
    // #endregion external
// #endregion imports



// #region module
xdescribe('Stepper', () => {
    it('works', async () => {
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


    it('works async in the limit', async () => {
        let value: number | undefined;
        const id = 'one';
        const stepper = new Stepper();

        stepper.define(
            id,
            async (stepperValue) => {
                value = stepperValue;
            },
            {
                updateTime: 3_000,
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
            -2,
        );
        await new Promise ((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 4_000);
        });

        stepper.define(
            id,
            async (stepperValue) => {
                value = stepperValue;
            },
            {
                currentValue: -1,
                updateTime: 3_000,
            },
        );
        stepper.step(
            id,
            3,
        );

        await new Promise ((resolve) => {
            setTimeout(() => {
                stepper.stop();
                resolve(true);
            }, 4_500);
        });

        expect(value).toEqual(2);
    });
});
// #endregion module
