# Blockchain_Dutch_Auction

Implemented smart contracts on Ethereum with a front end webapp(developed using NextJS and styled using ChakraUI) for a new token launch (**AToken**) whose tokens are bid with Ether and distributed via a Dutch Auction over 20 minutes time.

## Technology Stack & Dependencies

- Solidity (Writing Smart Contract)
- [NextJS](https://nextjs.org/) and [ChakraUI](https://chakra-ui.com/) (Frontend Webapp)
- [Hardhat](https://hardhat.org/) (for compiling and deploying Smart Contract on local Ethereum Testnet, also used for conducting tests-reentry attack)

### 1. Clone/Download the Repository

### 2. Install Dependencies:

```
$ npm install
```

### 3. Compile Smart Contracts

```
$ npx hardhat compile
```

### 4. Start local Ethereum development node

```
$ npx hardhat node
```

### 5. Run Deployment Scripts

```
$ npx hardhat run --network localhost scripts/deploy.js
```

Ensure the output after deploying smart contracts gives the correct address that matches the dutch auction contract address at in the file [ClientContract.js](./frontend/dutch_auction/src/app/ClientContracts.js?plain=124) line 124 const AUCTION_ADDRESS = [Deployed auction address based on output]

### 6. Launch Frontend WebApp (by changing directory to ./frontend/dutch_auction)

```
$ cd frontend/dutch_auction
$ cd npm i // install dependencies
$ npm run dev
```

### 7. Head to [webpage](http://localhost:3000) at local host port 3000.

### 8. Connect to MetaMask with wallet of choice.

If you connect to the account who is the owner of the address, you will have elevated permissions such as being able to start/end the auction. <br>
Else, you will be directed to the normal user landing page where you will be able to bid for the tokens when the auction has started.


### At the end of the auction, after clicking on the **Claim Tokens button**, you can check your claimed tokens in your metamask wallet by following these steps: 
1. Go to the Tokens tab in the metmask wallet
2. Click on **Import Tokens** 
3. Input the AToken Contract Address into Metamask. 