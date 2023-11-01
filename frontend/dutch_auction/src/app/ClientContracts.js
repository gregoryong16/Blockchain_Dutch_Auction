'use client'
import { ethers, BrowserProvider, parseUnits } from "ethers";
import dutchAuctionArtifact from "@/../../artifacts/contracts/DutchAuction.sol/DutchAuction.json"
class DutchAuction {
    constructor(address, abi) {
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.contract = new ethers.Contract(address, abi, this.provider);
    }
    async getEndAt() {
        const result = await this.contract.endAt()
        console.log(Number(result))
        const dt = new Date(result * 1000)
        return dt.toLocaleString();
    }
    async getStage() {

    }
    async getCurrentPrice() {
        const result = await this.contract.calculateCurrentPrice()
        return result
    }
    async getOwner() {
        const result = await this.contract.owner()
        return result
    }
    async bid(amount) {
        // need get signer
    }
    async claim() {
        // need get signer
    }
    async startAuction() {
        // need get signer
    }
    async endAuction() {
        // need get signer
    }


}

const AUCTION_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";


export const dutchAuction = new DutchAuction(AUCTION_ADDRESS, dutchAuctionArtifact['abi'])

