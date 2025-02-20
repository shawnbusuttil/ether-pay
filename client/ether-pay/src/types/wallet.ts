import { Transaction } from "./transaction";
import { Send } from "./send-transaction";

export type Wallet = {
    connectedAccount?: string;
    connectWallet: () => Promise<void>;
    transactions: Transaction[];
    sendTransaction?: (formData: Send) => Promise<void>;
    isSending?: boolean;
}