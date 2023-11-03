const hre = require("hardhat");

async function main() {

    const tokenContract = await hre.ethers.deployContract('AToken')

    const start = hre.ethers.parseEther('0.0001')
    const decrease = hre.ethers.parseEther('0.000000041')
    const totalSupply = 100000
    // const floorPrice = hre.ethers.parseEther('0.01')

    const auctionContract = await hre.ethers.deployContract("DutchAuction", [start, decrease, totalSupply]);

    await auctionContract.waitForDeployment();


    console.log(
        `Dutch auction deployed to ${auctionContract.target}`
    );
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});