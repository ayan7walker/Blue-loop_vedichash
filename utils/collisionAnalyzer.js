const hashPipeline = require("./hashPipeline");
const sha256 = require("./sha256");


// Analyze collisions for given inputs
function analyzeCollisions(inputs = []) {

    const vedicMap = new Map();
    const normalMap = new Map();

    const vedicCollisions = [];
    const normalCollisions = [];

    for (const input of inputs) {

        const vedicHash = hashPipeline(input);
        const normalHash = sha256(input);


        // Check Vedic collision
        if (vedicMap.has(vedicHash)) {

            vedicCollisions.push({
                hash: vedicHash,
                input1: vedicMap.get(vedicHash),
                input2: input
            });

        } else {
            vedicMap.set(vedicHash, input);
        }


        // Check Normal collision
        if (normalMap.has(normalHash)) {

            normalCollisions.push({
                hash: normalHash,
                input1: normalMap.get(normalHash),
                input2: input
            });

        } else {
            normalMap.set(normalHash, input);
        }

    }


    const vedicCollisionRate =
        inputs.length === 0 ? 0 : vedicCollisions.length / inputs.length;

    const normalCollisionRate =
        inputs.length === 0 ? 0 : normalCollisions.length / inputs.length;


    return {

        totalInputs: inputs.length,

        vedic: {
            totalCollisions: vedicCollisions.length,
            collisionRate: vedicCollisionRate,
            collisions: vedicCollisions,
            uniqueHashes: vedicMap.size
        },

        normal: {
            totalCollisions: normalCollisions.length,
            collisionRate: normalCollisionRate,
            collisions: normalCollisions,
            uniqueHashes: normalMap.size
        }

    };

}


// Generate random inputs and analyze collisions
function generateAndAnalyze(testCount = 10000, length = 12) {

    const inputs = [];

    for (let i = 0; i < testCount; i++) {

        let num = "";

        for (let j = 0; j < length; j++) {
            num += Math.floor(Math.random() * 10);
        }

        inputs.push(num);
    }

    return analyzeCollisions(inputs);
}


module.exports = {
    analyzeCollisions,
    generateAndAnalyze
};