// #region module
export interface BatcherOptions {
    size: number;
    time: number;
    logger: ((error: null | any, message?: string) => void) | undefined;
}
// #endregion module
