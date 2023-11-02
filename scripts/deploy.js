const hre = require("hardhat");

async function main() {
    // console.log('%c \n Deploying contracts with the account:', 'color:', signer.address);
    // console.log('%c \n Account balance:', 'color:', (await signer.getBalance()).toString());
    const start = hre.ethers.parseEther('0.2')
    const decrease = hre.ethers.parseEther('0.0001')
    const totalSupply = '100'
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