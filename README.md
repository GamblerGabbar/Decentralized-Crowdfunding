# DeFund: Decentralized Crowdfunding Platform

DeFund is a decentralized crowdfunding platform built on blockchain technology. It allows users to create, fund, and manage crowdfunding projects in a transparent and decentralized manner.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Connecting to Blockchain](#connecting-to-blockchain)
- [Running the Application](#running-the-application)

## Features

- Create and manage crowdfunding projects
- Donate to projects using cryptocurrency
- Milestone-based funding release
- Project image upload
- Commenting system
- Responsive design for various screen sizes

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building the frontend
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Ethers.js](https://docs.ethers.io/v5/) - Library for interacting with Ethereum
- [Hardhat](https://hardhat.org/) - Development environment for Ethereum software
- [Solidity](https://docs.soliditylang.org/) - Programming language for Ethereum smart contracts

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)
- [MetaMask](https://metamask.io/) browser extension

## Installation

 1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/defund.git
   cd defund
   ```
 2. Install dependencies using Bun:
   ```sh
   bun install
   ```
 3. Create an .env file in the root directory and add your environment variables:
   ```sh
   NEXT_PUBLIC_RPC_URL=your_rpc_url
   NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
   NEXT_PUBLIC_CHAIN_ID=your_chain_id
   ```


 ## Connecting to Blockchain
 1. Install MetaMask browser extension if you haven't already
 2.  Create or import a wallet
 3.  Connect to the appropriate network:
     For development: Local Hardhat network (chainId: 31337)
     For testing: Sepolia Testnet
     For production: Ethereum Mainnet

 Local Development Network
   To run a local blockchain:To run a local blockchain:
   ```sh
      npx hardhat node
   ```
   To deploy smart contracts:
   ```sh
      npx hardhat run scripts/deploy.js --network localhost
   ```


 ## Running the Application

   1. Start the development server:
      ```sh
      npm run dev
      
   2. Open http://localhost:3000 in your browser
   
   3. For production build:
      ```sh
      npm run build
      npm start
      
   ### Smart Contract Testing
   
   Run the test suite:
   ```sh
   npx hardhat test
   ```
   ###  Environment Variables

   The following environment variables are required:
   
      NEXT_PUBLIC_RPC_URL: RPC URL for the blockchain network
      NEXT_PUBLIC_CONTRACT_ADDRESS: Deployed contract address
      NEXT_PUBLIC_CHAIN_ID: Chain ID of the network
