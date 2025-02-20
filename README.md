# Ethereum Pay

- This app consists of two folders: one for the client and the other for the smart contract that is used to hold the transactions.

## Client

- To run the client, refer to the README inside that folder.
- The client uses ethers.js to get contract functions and display transactions sent by the connected wallet.

## Smart Contract

The smart contract exposes methods such as `getTransactionCount` and `getAllTransactions` to be used by the client.
