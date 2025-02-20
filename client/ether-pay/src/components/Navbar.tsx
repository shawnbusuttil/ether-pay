import { useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../../images/logo.png';

type NavbarItemProps = {
    title: string;
    classes?: string;
}

const NavbarItem = ({ title, classes }: NavbarItemProps) => {
    return (
        <li className={`mx-4 cursor-pointer ${classes}`}>
            {title}
        </li>
    );
};

export const Navbar = () => {
    const [isMenuToggled, setMenuToggled] = useState(false);

    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>
            <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                <img src={logo} alt="logo" className='w-32 cursor-pointer' />
            </div>
            <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
                {["Market", "Exchange", "Tutorials", "Wallets"].map(item => <NavbarItem key={item} title={item} />)}
                <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
                    Login
                </li>
            </ul>
            <div className='flex relative'>
                {isMenuToggled ? 
                    <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setMenuToggled(false)} /> 
                    : <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setMenuToggled(true)} />
                }
                {isMenuToggled && 
                    <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden 
                        list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism
                        text-white animate-slide-in'
                    >
                        <li className='text-xl w-full my-2'>
                            <AiOutlineClose onClick={() => setMenuToggled(false)} />
                        </li>
                        {["Market", "Exchange", "Tutorials", "Wallets"].map(item => <NavbarItem key={item} title={item} classes='my-2 text-lg' />)}
                    </ul>
                }
            </div>
        </nav>
    );
}
