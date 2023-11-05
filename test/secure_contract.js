const { expect } = require('chai');
const { ethers } = require('hardhat');
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("DutchAuction", function () {
  async function deployDutchAuctionFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const start = ethers.parseEther('0.0001');
    const decrease = ethers.parseEther('0.000000041');
    const totalSupply = 100000;

    const dutchAuction = await ethers.deployContract("DutchAuction", [start, decrease, totalSupply]);
    // const attackContract = await ethers.deployContract("Attacker");
    await dutchAuction.waitForDeployment();
    // Fixtures can return anything you consider useful for your tests

    return { dutchAuction, owner, addr1, addr2 };
  }

  it("Auction initiate state is deploy correctly", async function () {
    const { dutchAuction, owner } = await loadFixture(deployDutchAuctionFixture);
    const initialStage = await dutchAuction.getStage();
    // check for 
    expect(initialStage).to.equal("AuctionDeployed");
    expect(await dutchAuction.owner()).to.equal(owner.address);
  });

  it("it should change state after start auction", async function () {
    const { dutchAuction, owner } = await loadFixture(deployDutchAuctionFixture);

    const prestage = await dutchAuction.getStage()
    console.log(prestage)
    tx = await dutchAuction.startAuction();
    await tx.wait();
    expect(await dutchAuction.getStage()).to.equal('AuctionStarted');
    // console.log(poststage)

    // // Check if the stage changes to "AuctionStarted"
  });
});