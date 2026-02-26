const hashPipeline = require("./hashPipeline");
const sha256 = require("./sha256");


// Generate random numeric string
function generateRandomNumber(length = 12) {

    let result = "";

    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }

    return result;
}


// Run bulk test
function runBulkTest(testCount = 10000) {

    const vedicHashes = new Map();
    const normalHashes = new Map();

    let vedicCollisions = 0;
    let normalCollisions = 0;

    let vedicTotalTime = 0;
    let normalTotalTime = 0;

    for (let i = 0; i < testCount; i++) {

        const input = generateRandomNumber(12);

        // VEDIC HASH BENCHMARK
        const vedicStart = process.hrtime.bigint();
        const vedicHash = hashPipeline(input);
        const vedicEnd = process.hrtime.bigint();

        const vedicTime = Number(vedicEnd - vedicStart) / 1e6;
        vedicTotalTime += vedicTime;

        // NORMAL HASH BENCHMARK
        const normalStart = process.hrtime.bigint();
        const normalHash = sha256(input);
        const normalEnd = process.hrtime.bigint();

        const normalTime = Number(normalEnd - normalStart) / 1e6;
        normalTotalTime += normalTime;


        // Check Vedic collision
        if (vedicHashes.has(vedicHash)) {
            vedicCollisions++;
        } else {
            vedicHashes.set(vedicHash, input);
        }


        // Check Normal collision
        if (normalHashes.has(normalHash)) {
            normalCollisions++;
        } else {
            normalHashes.set(normalHash, input);
        }

    }


    const vedicAvgTime = vedicTotalTime / testCount;
    const normalAvgTime = normalTotalTime / testCount;


    return {

        totalTests: testCount,

        vedic: {
            collisions: vedicCollisions,
            avgExecutionTimeMs: vedicAvgTime,
            uniqueHashes: vedicHashes.size
        },

        normal: {
            collisions: normalCollisions,
            avgExecutionTimeMs: normalAvgTime,
            uniqueHashes: normalHashes.size
        },

        performanceImprovementMs: normalAvgTime - vedicAvgTime

    };

}


module.exports = {
    runBulkTest
};