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

    async getOwner() {
        const result = await this.contract.owner()
        return result
    }

    async getBids(address) {
        const result = await this.contract.bids(address)
        console.log(result)
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

    async bid(amount, address) {
        // amount is in float
        const signer = await this.provider.getSigner()
        const contract = new ethers.Contract(this.address, this.abi, signer)
        console.log('bidding with price= ', parseEther(amount.toString()))
        const tx = await contract.bid(address, { value: parseEther(amount.toString()) })
    }
    async claim() {
        // need get signer
        const signer = await this.provider.getSigner()
        const contract = new ethers.Contract(this.address, this.abi, signer)
        console.log('bidding with price= ', parseEther(amount.toString()))
        const tx = await contract.bid(address, { value: parseEther(amount.toString()) })
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
    async updateStage() {
        const state = await this.getStage()
        if (state == 'AuctionStarted') {
            const signer = await this.provider.getSigner()
            const contract = new ethers.Contract(this.address, this.abi, signer)
            await contract.updateStage()
        } else {
            console.log('current auction state is ', state)
        }
        // need get signer
    }
}

const AUCTION_ADDRESS = "0x9262996C3411d6AE519448Bd7a1A5482f8816a7C";


export const dutchAuction = new DutchAuction(AUCTION_ADDRESS, dutchAuctionArtifact['abi'])

