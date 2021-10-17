// #region imports
    // #region external
    import {
        BatcherOptions,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
class Batcher<T> {
    private action;
    private options: BatcherOptions;
    private data: T[] = [];
    private interval: NodeJS.Timeout | undefined = undefined;


    constructor(
        action: (batch: T[]) => Promise<void> | void,
        options?: Partial<BatcherOptions>,
    ) {
        this.action = action;

        this.options = {
            size: options?.size || 1_000,
            time: options?.time || 5_000,
            logger: options?.logger,
        };
    }


    private async act() {
        if (this.data.length === 0) {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = undefined;
            }

            return;
        }


        const size = this.data.length <= this.options.size
            ? this.data.length
            : this.options.size;

        const batch = this.data.slice(0, size);

        this.data = this.data.slice(size);

        try {
            await this.action(batch);
        } catch (error) {
            if (this.options.logger) {
                this.options.logger(error);
            }

            return;
        }
    }

    /**
     * TODO?: throttle/debounce the method
     */
    private setInterval() {
        if (!this.interval) {
            this.interval = setInterval(
                () => this.act(),
                this.options.time,
            );
        }
    }


    public push(
        data: T,
    ) {
        this.data.push(data);

        this.setInterval();
    }
}
// #endregion module



// #region exports
export default Batcher;
// #endregion exports
