// #region module
export type CacherGetterCall<T = any, C = any> = (
    index: string,
    context?: C,
) => (T | undefined) | Promise<T | undefined>;
// #endregion module
