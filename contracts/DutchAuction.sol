/* Code */
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./AToken.sol";

contract DutchAuction {
    // Constants
    uint private constant DURATION = 20 minutes;

    // Events
    event BidSubmission(address indexed sender, uint256 amount);
    
    // Enums
    enum Stages {
        AuctionDeployed,
        AuctionStarted,
        AuctionEnded
    }

    // Storage
    AToken public aToken;
    uint public totalSupply;
    uint public startingPrice;
    uint public floorPrice;
    uint public decrementRate;
    uint public startAt;
    uint public endAt;
    uint public totalReceived;
    uint public finalPrice;
    
    Stages private stage;
    mapping (address => uint) public bids;
    address private owner = msg.sender;

    // Modifiers
    // Checks if contract owner is the one executing the function
    modifier onlyBy(address _account) {
        require(msg.sender == _account);
        _;
    }

    modifier stageAt(Stages _expectedStage) {
        require(stage == _expectedStage);
        _;
    }

    modifier timedTransition() {
        if ((stage == Stages.AuctionStarted && calculateCurrentPrice() < floorPrice) || (stage == Stages.AuctionStarted && block.timestamp > endAt)){
            finalizeAuction();
        }
        _;
    }

    constructor(
        uint _startingPrice,
        uint _decrementRate,
        uint _totalSupply
    ) {
        startingPrice = _startingPrice;
        decrementRate = _decrementRate;
        floorPrice = startingPrice - decrementRate*DURATION;
        require(floorPrice > 0, "Floorprice cannot be 0.");
        totalSupply = _totalSupply;
        stage = Stages.AuctionDeployed;
    }

    // Change ownership
    function changeOwner(address _newOwner) public onlyBy(owner) {
        owner = _newOwner;
    }

    function updateStage() public timedTransition returns (Stages) {
        return stage;
    }

    function getStage() public view returns (string memory) {
        string memory stageName;
        if (stage == Stages.AuctionDeployed) {
            return "AuctionDeployed";
        } else if (stage == Stages.AuctionStarted) {
            return "AuctionStarted";
        } else if (stage == Stages.AuctionEnded) {
            return "AuctionEnded";
        }
        return stageName;
        // return stage;
    }

    function startAuction() public onlyBy(owner) stageAt(Stages.AuctionDeployed) timedTransition {
        startAt = block.timestamp;
        endAt = startAt + DURATION;
        totalReceived = 0;
        stage = Stages.AuctionStarted;
    }

    function calculateCurrentPrice() public view returns (uint) {
        uint timeElapsed = block.timestamp - startAt;
        uint decrement = timeElapsed * decrementRate;
        return startingPrice - decrement;
    }

    function bid(address _bidder) external payable stageAt(Stages.AuctionStarted) timedTransition {
        require(block.timestamp < endAt, "Auction has ended!");
        address payable bidder;

        if (_bidder == address(0)) {
            bidder = payable(msg.sender);
        } else {
            bidder = payable(_bidder);
        }
        uint amount = msg.value;
        uint maxAmountPurchasable = totalSupply * calculateCurrentPrice() - totalReceived;
        if (amount > maxAmountPurchasable) {
            uint change = amount - maxAmountPurchasable;
            amount = maxAmountPurchasable;
            bidder.transfer(change);
        }
        bids[msg.sender] += amount;
        totalReceived += amount;

        if (amount == maxAmountPurchasable) {
            finalizeAuction();
        }

        emit BidSubmission(_bidder, amount);
    }

    function finalizeAuction() public onlyBy(owner) {
        stage = Stages.AuctionEnded;
        uint price = calculateCurrentPrice();
        uint unsoldTokens = totalSupply - totalReceived/price;
        if (unsoldTokens == 0) {
            finalPrice = price;
        } else {
            finalPrice = floorPrice;
            // Burn the rest of the tokens
            aToken.transfer(address(0), unsoldTokens);
        }
    }

    function claimTokens(address _recipient) external stageAt(Stages.AuctionEnded) timedTransition {
        address payable recipient;
        if (_recipient == address(0)) {
            recipient = payable(msg.sender);
        } else {
            recipient = payable(_recipient);
        }
        uint tokens = bids[recipient] / finalPrice;

        // Prevent against reentrancy
        bids[recipient] = 0;
        aToken.transfer(recipient, tokens);
        
        //emit event for successful claim
    }
}