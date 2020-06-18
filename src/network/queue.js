import PQueue from "p-queue";

export default {
    SCORESABER: new PQueue({
        concurrency: 3,
        timeout: 8000,
        throwOnTimeout: true,
        intervalCap: 60,
        interval: 60 * 1000
    }),
    SCORESABER_API: new PQueue({
        concurrency: 8,
        timeout: 8000,
        throwOnTimeout: true,
        intervalCap: 60,
        interval: 60 * 1000
    }),
    BEATSAVER: new PQueue({
        concurrency: 8,
        timeout: 8000,
        throwOnTimeout: true,
        intervalCap: 10,
        interval: 1 * 1000
    })
};