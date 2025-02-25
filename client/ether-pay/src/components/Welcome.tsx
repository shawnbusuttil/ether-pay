import { useContext, useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { SiEthereum } from 'react-icons/si';

import { WalletContext } from '../providers/WalletProvider';
import { Send } from '../types/send-transaction';
import { shortenAddress } from '../utils/shortenAddress';

import { Input } from './Input';
import { Loader } from './Loader';

const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

export const Welcome = () => {
    const { connectedAccount, connectWallet, sendTransaction, isSending } = useContext(WalletContext);

    const [formData, setFormData] = useState<Send>({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    });

    const handleChange = (e: any, name: string) => {
        setFormData((prevState: Send) => ({
            ...prevState,
            [name]: e.target?.value
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        const { addressTo, amount } = formData;
        if (!addressTo || !amount) return;

        sendTransaction?.(formData);
    };

    return (
        <div className='flex w-full justify-center items-center'>
            <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
                <div className='flex flex-1 justify-start flex-col mf:mr-10'>
                    <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
                        Send Ethereum <br /> Across The World
                    </h1>
                    <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
                        Send or gift Ethereum easily on Ethereum Pay.
                    </p>
                    {!connectedAccount && <button type='button' onClick={connectWallet} className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'>
                        <span className='text-white text-base font-semibold'>Connect Wallet</span>
                    </button>}

                    <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>
                        <div className={commonStyles}>
                            Security
                        </div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            Web 3
                        </div>
                        <div className={commonStyles}>
                            Low Fees
                        </div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
                    <div className='p-3 justify-end items-start flex-col rounded-xl 
                        h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism'>
                        <div className='flex justify-between flex-col w-full h-full'>
                            <div className='flex justify-between items-start'>
                                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                                    <SiEthereum fontSize={22} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={18} color="#fff" />
                            </div> 
                            <div>
                                <p className='text-white font-light text-sm'>
                                    {connectedAccount && shortenAddress(connectedAccount, 8)}
                                </p>
                                <p className='text-white font-semibold text-lg mt-1'>
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
                        <Input name="addressTo" placeholder="Address To" onChange={(e) => handleChange!(e, 'addressTo')} />
                        <Input name="amount" type="number" placeholder="Amount (ETH)" step="0.0001" onChange={(e) => handleChange!(e, 'amount')} />
                        <Input name="keyword" placeholder="Keyword" onChange={(e) => handleChange!(e, 'keyword')} />
                        <Input name="message" placeholder="Enter Message" onChange={(e) => handleChange!(e, 'message')} />

                        <div className='h-[1px] w-full bg-gray-400 my-2' />
                        
                        {isSending ? <Loader /> 
                        : (
                            <button onClick={handleSubmit} type='button' className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full hover:bg-[#3d4f7c] cursor-pointer'>
                                Send Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
