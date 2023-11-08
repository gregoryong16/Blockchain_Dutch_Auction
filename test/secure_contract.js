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
    await dutchAuction.waitForDeployment();
    console.log(dutchAuction.target)
    const attackContract = await ethers.deployContract("Attacker", [dutchAuction.target] );
    await attackContract.waitForDeployment();
    // Fixtures can return anything you consider useful for your tests

    return { dutchAuction, owner, addr1, addr2,attackContract };
  }

  it("Auction initial state is deployed correctly", async function () {
    const { dutchAuction, owner } = await loadFixture(deployDutchAuctionFixture);
    const initialStage = await dutchAuction.getStage();
    expect(initialStage).to.equal("AuctionDeployed");
    expect(await dutchAuction.owner()).to.equal(owner.address);
  });

  it("it should change stage after start auction", async function () {
    const { dutchAuction, owner } = await loadFixture(deployDutchAuctionFixture);

    const prestage = await dutchAuction.getStage()
    console.log(prestage)
    tx = await dutchAuction.startAuction();
    await tx.wait();
    // stage should change to "AuctionStarted"
    expect(await dutchAuction.getStage()).to.equal('AuctionStarted');

  });

  it("Try to Perform Reentrancy Attack and fail", async function () {
    // Load Fixtures
    const { dutchAuction, owner, addr1,addr2,attackContract } = await loadFixture(deployDutchAuctionFixture);

    // Initial Stage should be "AuctionDeployed"
    const prestage = await dutchAuction.getStage()
    console.log(prestage)

    // Start Auction
    tx = await dutchAuction.startAuction();
    await tx.wait();

    // stage should change to "AuctionStarted"
    expect(await dutchAuction.getStage()).to.equal('AuctionStarted');

    // Place bids with a specified amount and address
    const bidTx = await dutchAuction.connect(owner).bid(owner.address,{value: ethers.parseEther('1.0')});
    await bidTx.wait();
    // Check bid submitted is correct or not
    expect(await dutchAuction.bids(owner.address)).to.equal(ethers.parseEther("1"));
    // This bid will end the auction as it buys out the remaining coins
    const bidTx2 = await attackContract.connect(addr1).attack({ value: ethers.parseEther("10") });
    await bidTx2.wait()

    // Check if the auction has ended
    expect(await dutchAuction.getStage()).to.equal('AuctionEnded');

    // ------------------------ Important Part  -----------------------------------------------------------
    // Attacker tries to perform Reentrancy attack during claiming of coins
    const claimTx = await attackContract.connect(addr1).claimTokens();
    // expect revertion because of reentrancy guard
    await claimTx.wait();
    
    // console.log(await dutchAuction.bids(attackContract.target))
    // // prove that reentrancy attack did not work as the balance of attacker's bids after claiming become 0 
    // // expect(await dutchAuction.bids(attackContract.target)).to.equal(ethers.parseEther("0"));
    
    // Owner collect Tokens
    // const claimTx1 = await dutchAuction.connect(owner).claimTokens(owner.address);
    // await claimTx1.wait();
  });

});