import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import { Wallet } from "../types/wallet";
import { Transaction } from "../types/transaction";

import { getEthereumContract } from "../ethereum/getEthereumContract";
import { Send } from "../types/send-transaction";

const { ethereum } = window as any;

export const WalletContext = createContext<Wallet>({
    connectWallet: async () => {},
    transactions: [],
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [connectedAccount, setConnectedAccount] = useState<string>("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isSending, setIsSending] = useState(false);

    const connectWallet = async () => {
        try {
            const { ethereum } = window as any;
            if (!ethereum) {
                alert("Please install Metamask");
                return;
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setConnectedAccount(accounts[0]);
        } catch (error) {
            throw new Error("No Ethereum object."); 
        }
    }

    const verifyWallet = async () => {
        if (!ethereum) {
            return alert("Please install Metamask");
        }
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length) {
            setConnectedAccount(accounts[0]);
            getAllTransactions();
        } else console.log("No accounts found.");
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum) {
                return alert("Please install Metamask");
            }
            const transactionContract = await getEthereumContract();
            const transactionsOnChain = await transactionContract.getAllTransactions();

            const transactions = transactionsOnChain.map((tx: any, idx: number) => ({
                id: `${idx}-${tx.receiver}`,
                addressFrom: tx.sender,
                addressTo: tx.receiver,
                amount: ethers.formatUnits(tx.amount, "ether"),
                timestamp: new Date(Number(tx.timestamp) * 1000).toLocaleString(),
                message: tx.message,
                keyword: tx.keyword
            }));

            setTransactions(transactions);
        } catch (error) {
            console.log(error);
        }
    }   
    
    const checkForTransactions = async () => {
        try {
            const transactionContract = await getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount);
        } catch (error) {
            throw new Error("No Ethereum object.");
        }
    }

    const sendTransaction = async (formData: Send) => {
        try {
            if (!ethereum) {
                return alert("Please install Metamask");
            }

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = await getEthereumContract();

            const parsedAmount = ethers.parseEther(amount);

            await ethereum.request({ 
                method: 'eth_sendTransaction', 
                params: [{
                    from: connectedAccount,
                    to: addressTo,
                    value: parsedAmount.toString()
                }]
            });

            const txHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsSending(true);

            await txHash.wait();
            setIsSending(false);
        } catch (error) {
            throw new Error("No Ethereum object.");
        }
    }

    useEffect(() => { 
        verifyWallet();
        checkForTransactions();
    }, []);

    
    return (
        <WalletContext.Provider value={{ connectWallet, connectedAccount, transactions, sendTransaction, isSending }}>
            {children}
        </WalletContext.Provider>
    );
}