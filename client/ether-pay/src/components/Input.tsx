import { ChangeEventHandler } from "react";

type InputProps = {
    name: string;
    value?: string;
    type?: string;
    step?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({ 
    name, 
    type, 
    value, 
    placeholder, 
    step, 
    onChange 
}: InputProps) => {
    return (
        <input 
            name={name} 
            type={type || 'text'} 
            value={value} 
            step={step}
            placeholder={placeholder} 
            onChange={onChange}
            className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'
        />
    )
}