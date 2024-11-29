const { ethers } = require("ethers");

// Connect to the Berachain network
const provider = new ethers.providers.JsonRpcProvider("https://bartio.rpc.berachain.com/");

// BeraChef contract address and ABI
const beraChefAddress = "0xfb81E39E3970076ab2693fA5C45A07Cc724C93c2";
const beraChefABI = require('./berachef.json');
;

// Create a contract instance
const beraChefContract = new ethers.Contract(beraChefAddress, beraChefABI, provider);

// Validator address
const validatorAddress = "0x40495A781095932e2FC8dccA69F5e358711Fdd41";

async function main() {
  try {
    const activeCB = await beraChefContract.getActiveCuttingBoard(validatorAddress);
    console.log("Active Cutting Board:", {
      startBlock: activeCB.startBlock.toString(),
      weights: activeCB.weights.map(w => ({
        receiver: w.receiver,
        percentageNumerator: w.percentageNumerator.toString()
      }))
    });

    const queuedCB = await beraChefContract.getQueuedCuttingBoard(validatorAddress);
    console.log("Queued Cutting Board:", {
      startBlock: queuedCB.startBlock.toString(),
      weights: queuedCB.weights.map(w => ({
        receiver: w.receiver,
        percentageNumerator: w.percentageNumerator.toString()
      }))
    });
  } catch (err) {
    console.error("Error:", err.message);
  }
}

main();
