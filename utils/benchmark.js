const hashPipeline = require("./hashPipeline");
const sha256 = require("./sha256");


// Benchmark Vedic Hash Pipeline
function benchmarkVedic(input) {

    const start = process.hrtime.bigint();

    const hash = hashPipeline(input);

    const end = process.hrtime.bigint();

    const executionTimeNs = end - start;
    const executionTimeMs = Number(executionTimeNs) / 1e6;

    return {
        input,
        hash,
        executionTimeNs: executionTimeNs.toString(),
        executionTimeMs
    };

}


// Benchmark Normal SHA256 (no preprocessing)
function benchmarkNormal(input) {

    const start = process.hrtime.bigint();

    const hash = sha256(input);

    const end = process.hrtime.bigint();

    const executionTimeNs = end - start;
    const executionTimeMs = Number(executionTimeNs) / 1e6;

    return {
        input,
        hash,
        executionTimeNs: executionTimeNs.toString(),
        executionTimeMs
    };

}


// Compare both
function compareBenchmark(input) {

    const vedic = benchmarkVedic(input);
    const normal = benchmarkNormal(input);

    return {
        input,

        vedic: {
            hash: vedic.hash,
            timeMs: vedic.executionTimeMs
        },

        normal: {
            hash: normal.hash,
            timeMs: normal.executionTimeMs
        },

        improvementMs: normal.executionTimeMs - vedic.executionTimeMs
    };

}


module.exports = {
    benchmarkVedic,
    benchmarkNormal,
    compareBenchmark
};