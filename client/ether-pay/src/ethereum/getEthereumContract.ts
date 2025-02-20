import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

const { ethereum } = window as any;

export const getEthereumContract = async () => {
    // Connect to the MetaMask EIP-1193 object. This is a standard
    // protocol that allows Ethers access to make all read-only
    // requests through MetaMask.
    const provider = new ethers.BrowserProvider(ethereum);

    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user.
    const signer = await provider.getSigner();

    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract
}