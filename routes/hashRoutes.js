const express = require("express");
const crypto = require("crypto");

const router = express.Router();

const hashPipeline = require("../utils/hashPipeline");


// compare route
router.post("/compare", (req, res) => {

    try {

        const password = req.body.password;

        if (!password) {
            return res.status(400).json({
                message: "Password required"
            });
        }

        // Normal SHA256
        const normalStart = Date.now();

        const normalHash = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        const normalEnd = Date.now();


        // Vedic SHA256
        const vedicStart = Date.now();

        const vedicHash = hashPipeline(password);

        const vedicEnd = Date.now();


        res.json({

            input: password,

            normalSHA256: normalHash,
            normalTime: (normalEnd - normalStart) + " ms",

            vedicSHA256: vedicHash,
            vedicTime: (vedicEnd - vedicStart) + " ms"

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;