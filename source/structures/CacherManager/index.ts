// #region imports
    // #region external
    import {
        CacherOptions,
        CacherManagerGet,
        CacherManagerUnset,
    } from '~data/interfaces';

    import Cacher from '~structures/Cacher';
    // #endregion external
// #endregion imports



// #region module
class CacherManager<T = any, C = any> {
    private cacher;
    private getters: CacherManagerGet<T, C>[];
    private unsetters: CacherManagerUnset<T, C>[];


    constructor(
        getters: CacherManagerGet<T, C>[] = [],
        unsetters: CacherManagerUnset<T, C>[] = [],
        options?: Partial<CacherOptions>,
    ) {
        this.cacher = new Cacher<T>(options);
        this.getters = getters;
        this.unsetters = unsetters;
    }

    public get(
        index: string,
        context?: C,
    ): T | undefined {
        const inCache = this.cacher.get(
            index,
            () => {
                this.unset(
                    index,
                    context,
                );
            },
        );
        if (typeof inCache !== 'undefined') {
            return inCache;
        }

        for (const getter of this.getters) {
            try {
                const getterResult = getter(
                    index,
                    context,
                ) as T | undefined;

                if (getterResult) {
                    this.cacher.set(index, getterResult);

                    return getterResult;
                }
            } catch (error) {
                continue;
            }
        }

        return;
    }

    public async getAsynchronous(
        index: string,
        context?: C,
    ): Promise<T | undefined> {
        const inCache = this.cacher.get(
            index,
            () => {
                this.unsetAsynchronous(
                    index,
                    context,
                );
            },
        );
        if (typeof inCache !== 'undefined') {
            return inCache;
        }

        for (const getter of this.getters) {
            try {
                const getterResult = await getter(
                    index,
                    context,
                );

                if (getterResult) {
                    this.cacher.set(index, getterResult);

                    return getterResult;
                }
            } catch (error) {
                continue;
            }
        }

        return;
    }

    public set(
        index: string,
        data: T,
    ) {
        this.cacher.set(index, data);
    }

    public unset(
        index: string,
        context?: C,
    ) {
        const cleanup = (
            cache: T,
        ) => {
            for (const unsetter of this.unsetters) {
                try {
                    unsetter(
                        index,
                        cache,
                        context,
                    );
                } catch (error) {
                    continue;
                }
            }
        }

        const cache = this.cacher.get(
            index,
            (cache) => {
                cleanup(cache);
            },
        );
        if (typeof cache === 'undefined') {
            return true;
        }

        cleanup(cache);

        return true;
    }

    public async unsetAsynchronous(
        index: string,
        context?: C,
    ) {
        const cleanup = async (
            cache: T,
        ) => {
            for (const unsetter of this.unsetters) {
                try {
                    await unsetter(
                        index,
                        cache,
                        context,
                    );
                } catch (error) {
                    continue;
                }
            }
        }

        const cache = this.cacher.get(
            index,
            (cache) => {
                cleanup(cache);
            },
        );
        if (typeof cache === 'undefined') {
            return true;
        }

        cleanup(cache);

        return true;
    }

    /**
     * Resets all the cache data. The `CacherManager` is still usable.
     *
     * @returns
     */
    public reset(
        context?: C,
    ) {
        const keys = this.cacher.getIndexes();

        for (const key of keys) {
            this.unsetAsynchronous(key, context);
        }

        return this.cacher.reset();
    }

    /**
     * Destroys the cache. The `CacherManager` becomes unusable.
     *
     * @returns
     */
    public destroy(
        context?: C,
    ) {
        this.reset(context);

        return this.cacher.destroy();
    }
}
// #endregion module



// #region exports
export default CacherManager;
// #endregion exports
