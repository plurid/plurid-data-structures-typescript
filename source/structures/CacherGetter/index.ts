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
class CacheGetter<T> {
    private cacher;
    private getters: CacherGetterCall<T>[];


    constructor(
        options: CacherOptions,
        ...getters: CacherGetterCall<T>[]
    ) {
        this.cacher = new Cacher<T>(options);
        this.getters = getters;
    }

    public get(
        index: string,
    ): T | undefined {
        const inCache = this.cacher.get(index);
        if (inCache) {
            return inCache;
        }

        for (const getter of this.getters) {
            try {
                const getterResult = getter(index) as T | undefined;

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
    ): Promise<T | undefined> {
        const inCache = this.cacher.get(index);
        if (inCache) {
            return inCache;
        }

        for (const getter of this.getters) {
            try {
                const getterResult = await getter(index);

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

    public reset() {
        this.cacher.reset();

        return true;
    }
}
// #endregion module



// #region exports
export default CacheGetter;
// #endregion exports
