// #region module
export type CacherManagerGet<T = any, C = any> = (
    index: string,
    context?: C,
) => (T | undefined) | Promise<T | undefined>;

export type CacherManagerUnset<T = any, C = any> = (
    index: string,
    cache: T,
    context?: C,
) => boolean | Promise<boolean>;
// #endregion module
