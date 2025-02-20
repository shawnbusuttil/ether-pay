import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Transactions } from './Transactions';
import { WalletContext } from '../providers/WalletProvider';
import { Wallet } from '../types/wallet';

const defaultContext: Wallet = {
    connectedAccount: undefined,
    connectWallet: vi.fn(),
    transactions: [
        {
            id: '1',
            addressTo: '0xabcdef1234567890',
            addressFrom: '0x1234567890abcdef',
            timestamp: '2024-03-21',
            message: 'Test transaction',
            keyword: 'test',
            amount: '1.0'
        }
    ]
};

const renderWithContext = (context?: Partial<Wallet>) => {
    return render(
        <WalletContext.Provider value={{ ...defaultContext, ...context }}>
            <Transactions />
        </WalletContext.Provider>
    );
};
describe('Transactions', () => {
    it('shows connect account message when not connected', () => {
        renderWithContext();
        expect(screen.getByText(/Connect your account to see the latest changes/i)).toBeInTheDocument();
    });

    it('shows latest transactions heading when connected', () => {
        renderWithContext({ connectedAccount: '0x1234567890abcdef' });
        expect(screen.getByText(/Latest Transactions/i)).toBeInTheDocument();
    });

    it('renders transaction cards when transactions exist', () => {
        renderWithContext({ connectedAccount: '0x1234567890abcdef' });

        expect(screen.getByText(/From: 0x123456\.\.\.cdef/i)).toBeInTheDocument();
        expect(screen.getByText(/Amount: 1.0 ETH/i)).toBeInTheDocument();
        expect(screen.getByText(/Message: Test transaction/i)).toBeInTheDocument();
    });
}); 