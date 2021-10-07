// #region imports
    // #region external
    import {
        CacherOptions,
        CachedObject,
    } from '~data/interfaces';

    import {
        ONE_HOUR,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
class Cacher<T = any> {
    private objects: Map<string, CachedObject<T>> = new Map();
    private options: CacherOptions;


    constructor(
        options?: Partial<CacherOptions>,
    ) {
        this.options = this.resolveOptions(options);

        if (this.options.cleanupInterval > 0) {
            setInterval(
                () => {
                    this.cleanup();
                },
                this.options.cleanupInterval
            );
        }
    }


    private resolveOptions(
        options?: Partial<CacherOptions>,
    ) {
        const resolvedOptions: CacherOptions = {
            cacheTime: options?.cacheTime ?? ONE_HOUR,
            cleanupInterval: options?.cleanupInterval ?? ONE_HOUR,
        };

        return resolvedOptions;
    }

    private cleanup() {
        const now = Date.now();
        const objects = this.objects.entries();

        for (const [index, object] of objects) {
            if (now > object.expiration) {
                this.unset(index);
            }
        }
    }



    public get(
        index: string,
    ) {
        const cached = this.objects.get(index);
        if (!cached) {
            return;
        }

        if (Date.now() > cached.expiration) {
            this.unset(index);
            return;
        }

        return cached.data;
    }

    public set(
        index: string,
        data: T,
        cacheTime?: number,
    ) {
        const resolvedCacheTime = cacheTime ?? this.options.cacheTime;
        const expiration = Date.now() + resolvedCacheTime;

        this.objects.set(
            index,
            {
                expiration,
                data,
            },
        );
    }

    public unset(
        index: string,
    ) {
        this.objects.delete(index);
    }

    public reset() {
        this.objects = new Map();
    }
}
// #endregion module



// #region exports
export default Cacher;
// #endregion exports
