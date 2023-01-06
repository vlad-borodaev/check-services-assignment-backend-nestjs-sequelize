const awaitTheTimeout = (delayMs: number) => {
    if (!delayMs || isNaN(Number(delayMs))) {
        return Promise.reject({
            message: "Invalid delay time",
        });
    }
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject({
                message: "Cannot fetch data"
            });
        }, delayMs);
    });
};

export const wrapPromiseWithTimeout = (promise: Promise<any>, delayMs: number) => {
    return Promise.race([
        promise,
        awaitTheTimeout(delayMs),
    ]);
}
