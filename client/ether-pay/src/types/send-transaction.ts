import { Dispatch, SetStateAction } from "react";

export type Send = {
    addressTo: string;
    amount: string;
    keyword?: string;
    message?: string;
}

export type SendTransaction = {
    formData: Send;
    setFormData: Dispatch<SetStateAction<Send>>;
    handleChange: (e: any, name: string) => void;
    isSending?: boolean;
}