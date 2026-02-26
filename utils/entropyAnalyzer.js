const hashPipeline = require("./hashPipeline");
const sha256 = require("./sha256");


// Calculate Shannon Entropy
function calculateEntropy(str) {

    if (!str || str.length === 0) return 0;

    const frequency = {};

    for (const char of str) {
        frequency[char] = (frequency[char] || 0) + 1;
    }

    let entropy = 0;
    const length = str.length;

    for (const char in frequency) {

        const prob = frequency[char] / length;

        entropy -= prob * Math.log2(prob);
    }

    return entropy;
}


// Analyze entropy for single input
function analyzeSingleInput(input) {

    const vedicHash = hashPipeline(input);
    const normalHash = sha256(input);

    const vedicEntropy = calculateEntropy(vedicHash);
    const normalEntropy = calculateEntropy(normalHash);

    return {

        input,

        vedic: {
            hash: vedicHash,
            entropy: vedicEntropy
        },

        normal: {
            hash: normalHash,
            entropy: normalEntropy
        },

        higherEntropy:
            vedicEntropy > normalEntropy ? "VEDIC" : "NORMAL",

        entropyDifference:
            Math.abs(vedicEntropy - normalEntropy)

    };
}


// Generate random input
function generateRandomInput(length = 12) {

    let result = "";

    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }

    return result;
}


// Bulk entropy analysis
function runEntropyTest(testCount = 10000) {

    let vedicTotalEntropy = 0;
    let normalTotalEntropy = 0;

    let vedicHigherCount = 0;
    let normalHigherCount = 0;

    const sampleResults = [];

    for (let i = 0; i < testCount; i++) {

        const input = generateRandomInput();

        const result = analyzeSingleInput(input);

        vedicTotalEntropy += result.vedic.entropy;
        normalTotalEntropy += result.normal.entropy;

        if (result.higherEntropy === "VEDIC") {
            vedicHigherCount++;
        } else {
            normalHigherCount++;
        }

        // store first 10 samples
        if (i < 10) {
            sampleResults.push(result);
        }

    }


    return {

        totalTests: testCount,

        vedic: {
            avgEntropy: vedicTotalEntropy / testCount,
            higherEntropyCount: vedicHigherCount
        },

        normal: {
            avgEntropy: normalTotalEntropy / testCount,
            higherEntropyCount: normalHigherCount
        },

        entropyDifference:
            (vedicTotalEntropy - normalTotalEntropy) / testCount,

        sampleResults

    };

}


module.exports = {
    calculateEntropy,
    analyzeSingleInput,
    runEntropyTest
};