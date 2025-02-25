import { useContext } from 'react';

import { shortenAddress } from '../utils/shortenAddress';
import { useGif } from '../hooks/useGif';
import { WalletContext } from '../providers/WalletProvider';

type Props = {
    addressTo: string;
    addressFrom: string;
    amount: string;
    timestamp: string;
    message?: string;
    keyword?: string;
    url?: string;
}

const TransactionCard = ({ 
    addressTo, 
    addressFrom, 
    timestamp, 
    message, 
    keyword, 
    amount 
}: Props) => {
    const gifUrl = useGif(keyword);

    return (
        <div className='
            bg-[#181918] m-4 flex flex-1 
            2xl:min-w-[450px] 2xl:max-w-[500px]
            sm:min-w-[270px]
            sm:max-w-[300px]
            flex-col p-3 rounded-md hover:shadow-2xl
        '>
            <div className='flex flex-col items-center w-full mt-3'>
                <div className='w-full mb-6 p-2'>
                    <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target='_blank' rel="noopener noreferrer">
                        <p className='text-white text-base'>From: {shortenAddress(addressFrom, 8)}</p>
                    </a>
                    <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target='_blank' rel="noopener noreferrer">
                        <p className='text-white text-base'>To: {shortenAddress(addressTo, 8)}</p>
                    </a>
                    <p className='text-white text-base'>Amount: {amount} ETH</p>

                    {message && (
                        <>
                            <br />
                            <p className='text-white text-base'>Message: {message}</p>
                        </>
                    )}
                </div>

                {gifUrl && (
                    <img src={gifUrl} 
                        alt="gif" 
                        className='w-full h-64 2x:h-96 rounded-md shadow-lg object-cover' 
                    />
                )}
                <div className='bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl'>
                    <p className='text-[#37c7da] font-bold'>{timestamp}</p>
                </div>
            </div>
        </div>
    )
};

export const Transactions = () => {
    const { connectedAccount, transactions } = useContext(WalletContext);

    return (
        <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
            <div className='flex flex-col md:p-12 py-12 px-4'>
                <h3 className='text-white text-3xl text-center my-2'>
                    {connectedAccount ? 'Latest Transactions' : 'Connect your account to see the latest changes.'}
                </h3>

                {transactions && <div className='flex flex-wrap justify-center items-center mt-10'>
                    {[transactions.reverse().map(tx => (
                        <TransactionCard key={tx.id} {...tx} />
                    ))]}
                </div>}
            </div>
        </div>
    )
}
