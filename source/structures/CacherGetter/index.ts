// #region imports
    // #region external
    import {
        CacherOptions,
        CacherGetterCall,
    } from '~data/interfaces';

    import Cacher from '~structures/Cacher';
    // #endregion external
// #endregion imports



// #region module
class CacherGetter<T, C> {
    private cacher;
    private getters: CacherGetterCall<T, C>[];


    constructor(
        getters: CacherGetterCall<T, C>[],
        options?: Partial<CacherOptions>,
    ) {
        this.cacher = new Cacher<T>(options);
        this.getters = getters;
    }

    public get(
        index: string,
        context?: C,
    ): T | undefined {
        const inCache = this.cacher.get(index);
        if (inCache) {
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
        const inCache = this.cacher.get(index);
        if (inCache) {
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

    /**
     * Resets all the cache data. The `CacherGetter` is still usable.
     *
     * @returns
     */
    public reset() {
        return this.cacher.reset();
    }

    /**
     * Destroys the cache. The `CacherGetter` becomes unusable.
     *
     * @returns
     */
    public destroy() {
        return this.cacher.destroy();
    }
}
// #endregion module



// #region exports
export default CacherGetter;
// #endregion exports
