// #region module
export type CacherGetterCall<T = any> = (
    index: string,
) => (T | undefined) | Promise<T | undefined>;
// #endregion module
