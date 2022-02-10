// #region imports
    // #region external
    import {
        StepperOptions,
        StepperDefinition,
        StepperUpdaterFunction,
        StepperDefineOptions,
    } from '~data/interfaces/Stepper';

    import {
        STEPPER_DEFAULT_RUN_INTERVAL,
        STEPPER_DEFAULT_UPDATE_TIME,
    } from '~data/constants/Stepper';
    // #endregion external
// #endregion imports



// #region module
class Stepper {
    private definitions: Record<string, StepperDefinition | undefined> = {};
    private values: Record<string, number | undefined> = {};
    private firstHits: Record<string, number | undefined> = {};
    private lastHits: Record<string, number | undefined> = {};
    private runInterval;


    constructor(
        options?: StepperOptions,
    ) {
        const runIntervalTime = options?.runInterval || STEPPER_DEFAULT_RUN_INTERVAL;

        this.runInterval = setInterval(
            () => {
                this.run();
            },
            runIntervalTime,
        );
    }


    public define(
        id: string,
        updater: StepperUpdaterFunction,
        options?: StepperDefineOptions,
    ) {
        if (this.definitions[id]) {
            return;
        }

        const currentValue = options?.currentValue;
        const limits = options?.limits;
        const updateTime = options?.updateTime;

        const lowerLimit = limits
            ? limits[0]
            : undefined;
        const upperLimit = limits
            ? limits[1]
            : undefined;

        this.definitions[id] = {
            updater,
            updateTime,
            lowerLimit,
            upperLimit,
        };

        if (typeof currentValue !== undefined) {
            this.values[id] = currentValue;
        }
    }

    public step(
        id: string,
        value: number,
    ) {
        const definition = this.definitions[id];
        if (!definition) {
            return;
        }

        if (typeof this.firstHits[id] === 'undefined') {
            this.firstHits[id] = Date.now();
        }
        this.lastHits[id] = Date.now();

        const currentValue = this.values[id];
        if (typeof currentValue === 'undefined') {
            this.values[id] = 0;
        }

        const newValue = (this.values[id] as number) + value;

        if (typeof definition.lowerLimit === 'number') {
            if (newValue < definition.lowerLimit) {
                this.values[id] = definition.lowerLimit;
                return;
            }
        }

        if (typeof definition.upperLimit === 'number') {
            if (newValue > definition.upperLimit) {
                this.values[id] = definition.upperLimit;
                return;
            }
        }

        this.values[id] = newValue;
    }

    public stop() {
        clearInterval(this.runInterval);
    }


    private run() {
        const now = Date.now();

        for (const [id, firstHit] of Object.entries(this.firstHits)) {
            const definition = this.definitions[id];
            if (!definition) {
                continue;
            }

            if (typeof firstHit === 'undefined') {
                continue;
            }

            const lastHit = this.lastHits[id];
            if (typeof lastHit === 'undefined') {
                continue;
            }

            const resolvedUpdateTime = definition.updateTime || STEPPER_DEFAULT_UPDATE_TIME;

            if (now - lastHit > resolvedUpdateTime) {
                this.execute(id);
            }
        }
    }

    private async execute(
        id: string,
    ) {
        const definition = this.definitions[id];
        if (!definition) {
            return;
        }

        const value = this.values[id];
        if (typeof value === 'undefined') {
            return;
        }

        delete this.values[id];
        delete this.firstHits[id];
        delete this.lastHits[id];

        const updater = definition.updater;
        delete this.definitions[id];

        await updater(value);
    }
}
// #endregion module



// #region exports
export default Stepper;
// #endregion exports
