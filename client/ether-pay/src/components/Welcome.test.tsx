import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Welcome } from './Welcome';
import { WalletContext } from '../providers/WalletProvider';
import { Wallet } from '../types/wallet';

const mockConnectWallet = vi.fn();
const mockSendTransaction = vi.fn();

const defaultContext: Wallet = {
    connectedAccount: undefined,
    connectWallet: mockConnectWallet,
    sendTransaction: mockSendTransaction,
    isSending: false,
    transactions: []
};

const renderWithContext = (context?: Partial<Wallet>) => {
    return render(
        <WalletContext.Provider value={{ ...defaultContext, ...context }}>
            <Welcome />
        </WalletContext.Provider>
    );
};


describe('Welcome', () => {
    it('hides connect wallet button when connected', () => {
        renderWithContext({ connectedAccount: '0x1234567890abcdef' });
        expect(screen.queryByText(/Connect Wallet/i)).not.toBeInTheDocument();
    });

    it('shows connect wallet button when not connected', () => {
        renderWithContext();

        const connectButton = screen.getByText(/Connect Wallet/i);
        expect(connectButton).toBeInTheDocument();
        
        fireEvent.click(connectButton);
        expect(mockConnectWallet).toHaveBeenCalled();
    });

    it('handles transaction form submission', () => {
        renderWithContext();
        
        const addressInput = screen.getByPlaceholderText(/Address To/i);
        const amountInput = screen.getByPlaceholderText(/Amount \(ETH\)/i);
        
        fireEvent.change(addressInput, { target: { value: "0x1234567890abcdef" } });
        fireEvent.change(amountInput, { target: { value: '1.0' } });
        
        const sendButton = screen.getByText(/Send Now/i);
        fireEvent.click(sendButton);
        
        expect(mockSendTransaction).toHaveBeenCalledWith({
            addressTo: '0x1234567890abcdef',
            amount: '1.0',
            keyword: '',
            message: ''
        });
    });

    it('shows ethereum card with shortened address when connected', () => {
        renderWithContext({ connectedAccount: '0x1234567890abcdef' });
        expect(screen.getByText(/0x123456\.\.\.cdef/i)).toBeInTheDocument();
    });
}); 