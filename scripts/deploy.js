const hre = require("hardhat");

async function main() {

    const auctionContract = await hre.ethers.deployContract("DutchAuction", [2000, 1, 1000]);

    await auctionContract.waitForDeployment();

    console.log(
        `Dutch auction deployed to ${auctionContract.target}`
    );
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});