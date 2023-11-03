'use client'
import { ethers, BrowserProvider, parseUnits, Signature, parseEther, formatEther } from "ethers";
import dutchAuctionArtifact from "@/../../artifacts/contracts/DutchAuction.sol/DutchAuction.json"
class DutchAuction {
    constructor(address, abi) {
        this.address = address
        this.abi = abi
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.contract = new ethers.Contract(address, abi, this.provider, this.signer);
    }
    async getEndAt() {
        const result = await this.contract.endAt()
        const dt = new Date(Number(result) * 1000)
        return dt.toLocaleString();
    }
    async getStage() {
        const result = await this.contract.getStage()
        return result
    }
    async getCurrentPrice() {
        const stage = await this.getStage()
        if (stage == 'AuctionDeployed') {
            const startPrice = await this.getStartingPrice()
            return startPrice
        }
        if (stage == 'AuctionStarted') {
            const result = await this.contract.calculateCurrentPrice()
            return formatEther(result)
        }
    }

    async getFinalPrice() {
        const result = await this.contract.finalPrice()
        return formatEther(result)
    }

    async getOwner() {
        const result = await this.contract.owner()
        return result
    }

    async getBids(address) {
        const result = await this.contract.bids(address)
        return formatEther(result)
    }

    async getStartingPrice() {
        const result = await this.contract.startingPrice()
        return formatEther(result)
    }
    async getTokenSupply() {
        const result = await this.contract.totalSupply()
        return Number(result)
    }
    async getTotalReceived() {
        const result = await this.contract.totalReceived()
        return formatEther(result)
    }
    async getIsClaimable() {
        const result = await this.contract.isClaimable()
        return Boolean(result)
    }

    async bid(amount, address) {
        // amount is in float
        const signer = await this.provider.getSigner()
        const contract = new ethers.Contract(this.address, this.abi, signer)
        console.log('bidding with price= ', parseEther(amount.toString()))
        const tx = await contract.bid(address, { value: parseEther(amount.toString()) })
    }
    async claim(address) {
        // need get signer
        const signer = await this.provider.getSigner()
        const contract = new ethers.Contract(this.address, this.abi, signer)
        await contract.claimTokens(address)
    }
    async startAuction() {
        const state = await this.getStage()
        if (state !== 'AuctionStarted') {
            const signer = await this.provider.getSigner()
            const contract = new ethers.Contract(this.address, this.abi, signer)
            await contract.startAuction()
            console.log('auction started')
        } else {
            console.log('current auction state is ', state, ' unable to start!')
        }

    }
    async finalizeAuction() {
        const signer = await this.provider.getSigner()
        const contract = new ethers.Contract(this.address, this.abi, signer)
        await contract.finalizeAuction()
        // need get signer
    }
    async getTime() {
        const result = await this.contract.getTime()
        const date = new Date(Number(result) * 1000)
        return date
    }
}

const AUCTION_ADDRESS = "0x4A679253410272dd5232B3Ff7cF5dbB88f295319";


export const dutchAuction = new DutchAuction(AUCTION_ADDRESS, dutchAuctionArtifact['abi'])

