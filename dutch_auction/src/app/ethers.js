// lib/ethers.js
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "YOUR_ETHEREUM_PROVIDER_URL"
);

export { provider };
