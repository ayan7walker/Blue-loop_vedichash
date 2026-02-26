const vedicHash = require("./vedicHash");
const sha256 = require("./sha256");

function hashPipeline(password) {

  if (!password) {
    throw new Error("Password missing in hashPipeline");
  }

  const vedicOutput = vedicHash(password);

  const finalHash = sha256(vedicOutput);

  return finalHash;
}

module.exports = hashPipeline;