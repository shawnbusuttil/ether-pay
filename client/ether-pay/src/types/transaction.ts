export type Transaction = {
    id: string;
    addressFrom: string;
    addressTo: string;
    amount: string;
    timestamp: string;
    keyword?: string,
    message?: string
}