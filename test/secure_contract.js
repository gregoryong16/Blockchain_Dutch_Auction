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
  
    it("it should start the auction", async function () {
        const { dutchAuction, owner } = await loadFixture(deployDutchAuctionFixture);
        // Check the initial stage of the auction
        const initialStage = await dutchAuction.getStage();
        expect(initialStage).to.equal("AuctionDeployed");
        // Verify that the owner address matches the address you are using to connect to the contract.
        expect(await dutchAuction.owner()).to.equal(owner.address);
        // Start the auction
        await dutchAuction.connect(owner).startAuction();
        console.log(await dutchAuction.getStage())
        // // Check if the stage changes to "AuctionStarted"
        // const startedStage = await dutchAuction.getStage();
        // expect(startedStage).to.equal("AuctionStarted");
    });
  });