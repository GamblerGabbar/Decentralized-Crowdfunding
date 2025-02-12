const hre = require("hardhat")

async function main() {
  try {
  
    const CrowdfundingPlatform = await hre.ethers.getContractFactory("CrowdfundingPlatform")
    
    console.log("Deploying CrowdfundingPlatform...")
    const crowdfundingPlatform = await CrowdfundingPlatform.deploy()

    await crowdfundingPlatform.deployed()

    console.log("Waiting for block confirmations...")
    await crowdfundingPlatform.deployTransaction.wait(5)

    console.log("CrowdfundingPlatform deployed successfully to:", crowdfundingPlatform.address)
    
    console.log("Contract owner:", await crowdfundingPlatform.signer.getAddress())
    console.log("Initial project count:", await crowdfundingPlatform.projectCount())
  } catch (error) {
    console.error("Error during deployment:", error)
    throw error
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })