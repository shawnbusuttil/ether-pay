import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/edalgws1Olb1KjpK7sFubMbmTt7y272L",
      accounts: [process.env.SEPOLIA_PRIVATE_KEY!]
    }
  }
};

export default config;
