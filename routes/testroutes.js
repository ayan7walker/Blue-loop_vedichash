const express = require("express");

const router = express.Router();

const testController = require("../controllers/testController");


// Benchmark
router.post("/benchmark", testController.runBenchmark);


// Bulk test
router.post("/bulk", testController.runBulkTest);


// Collision test
router.post("/collision", testController.runCollisionTest);


// Comparison test
router.post("/comparison", testController.runComparisonTest);


// Entropy test
router.post("/entropy", testController.runEntropyTest);


// MASTER TEST (IMPORTANT)
router.post("/all", testController.runAllTests);


module.exports = router;