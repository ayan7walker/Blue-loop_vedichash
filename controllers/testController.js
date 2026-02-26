

const benchmark = require("../utils/benchmark");
const bulkTest = require("../utils/bulktest");
const collisionAnalyzer = require("../utils/collisionAnalyzer");
const comparisonTest = require("../utils/comparisonTest");
const entropyAnalyzer = require("../utils/entropyAnalyzer");


// ==========================================
// BENCHMARK TEST
// ==========================================
exports.runBenchmark = async (req, res) => {
    try {

        const { input } = req.body;

        if (!input) {
            return res.status(400).json({
                success: false,
                message: "Input is required"
            });
        }

        const result = benchmark.compareBenchmark(input);

        res.json({
            success: true,
            result
        });

    } catch (error) {

        console.error("Benchmark error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ==========================================
// BULK TEST
// ==========================================
exports.runBulkTest = async (req, res) => {
    try {

        const testCount = req.body?.testCount || 10000;

        const result = bulkTest.runBulkTest(testCount);

        res.json({
            success: true,
            result
        });

    } catch (error) {

        console.error("Bulk test error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ==========================================
// COLLISION TEST
// ==========================================
exports.runCollisionTest = async (req, res) => {
    try {

        const testCount = req.body?.testCount || 10000;

        const result =
            collisionAnalyzer.generateAndAnalyze(testCount);

        res.json({
            success: true,
            result
        });

    } catch (error) {

        console.error("Collision test error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ==========================================
// COMPARISON TEST
// ==========================================
exports.runComparisonTest = async (req, res) => {
    try {

        const testCount = req.body?.testCount || 10000;

        const result =
            comparisonTest.runComparisonTest(testCount);

        res.json({
            success: true,
            result
        });

    } catch (error) {

        console.error("Comparison test error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ==========================================
// ENTROPY TEST
// ==========================================
exports.runEntropyTest = async (req, res) => {
    try {

        const testCount = req.body?.testCount || 10000;

        const result =
            entropyAnalyzer.runEntropyTest(testCount);

        res.json({
            success: true,
            result
        });

    } catch (error) {

        console.error("Entropy test error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ==========================================
// MASTER TEST (RUN ALL)
// ==========================================
exports.runAllTests = async (req, res) => {

    try {

        const testCount = req.body?.testCount || 10000;

        const benchmarkResult =
            benchmark.compareBenchmark("123456789");

        const bulkResult =
            bulkTest.runBulkTest(testCount);

        const collisionResult =
            collisionAnalyzer.generateAndAnalyze(testCount);

        const comparisonResult =
            comparisonTest.runComparisonTest(testCount);

        const entropyResult =
            entropyAnalyzer.runEntropyTest(testCount);

        res.json({

            success: true,

            summary: {
                totalTests: testCount,
                timestamp: new Date()
            },

            benchmark: benchmarkResult,
            bulk: bulkResult,
            collision: collisionResult,
            comparison: comparisonResult,
            entropy: entropyResult

        });

    } catch (error) {

        console.error("Master test error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};