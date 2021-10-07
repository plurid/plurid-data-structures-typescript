// #region module
export interface CacherOptions {
    cacheTime: number;
    cleanupInterval: number;
}

export interface CachedObject<T = any> {
    expiration: number;
    data: T;
}
// #endregion module
