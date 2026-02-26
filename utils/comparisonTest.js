const hashPipeline = require("./hashPipeline");
const sha256 = require("./sha256");


// Generate random numeric input
function generateRandomInput(length = 12) {

    let result = "";

    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }

    return result;
}


// Compare single input
function compareSingle(input) {

    // VEDIC
    const vedicStart = process.hrtime.bigint();
    const vedicHash = hashPipeline(input);
    const vedicEnd = process.hrtime.bigint();

    const vedicTime = Number(vedicEnd - vedicStart) / 1e6;


    // NORMAL
    const normalStart = process.hrtime.bigint();
    const normalHash = sha256(input);
    const normalEnd = process.hrtime.bigint();

    const normalTime = Number(normalEnd - normalStart) / 1e6;


    return {

        input,

        vedic: {
            hash: vedicHash,
            executionTimeMs: vedicTime
        },

        normal: {
            hash: normalHash,
            executionTimeMs: normalTime
        },

        fasterMethod:
            vedicTime < normalTime ? "VEDIC" : "NORMAL",

        timeDifferenceMs:
            Math.abs(normalTime - vedicTime)

    };

}


// Compare multiple inputs
function runComparisonTest(testCount = 10000) {

    let vedicTotalTime = 0;
    let normalTotalTime = 0;

    let vedicFasterCount = 0;
    let normalFasterCount = 0;

    const results = [];

    for (let i = 0; i < testCount; i++) {

        const input = generateRandomInput(12);

        const result = compareSingle(input);

        vedicTotalTime += result.vedic.executionTimeMs;
        normalTotalTime += result.normal.executionTimeMs;

        if (result.fasterMethod === "VEDIC") {
            vedicFasterCount++;
        } else {
            normalFasterCount++;
        }

        if (i < 10) {
            results.push(result);
        }

    }


    return {

        totalTests: testCount,

        vedic: {
            totalTimeMs: vedicTotalTime,
            avgTimeMs: vedicTotalTime / testCount,
            fasterCount: vedicFasterCount
        },

        normal: {
            totalTimeMs: normalTotalTime,
            avgTimeMs: normalTotalTime / testCount,
            fasterCount: normalFasterCount
        },

        performanceGainMs:
            (normalTotalTime - vedicTotalTime),

        performanceGainPercent:
            ((normalTotalTime - vedicTotalTime) / normalTotalTime) * 100,

        sampleResults: results

    };

}


module.exports = {
    compareSingle,
    runComparisonTest
};