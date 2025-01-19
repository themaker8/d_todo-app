'use client';

import { useState } from 'react';
import { BrowserProvider } from 'ethers';

interface Props {
  onConnect: (address: string) => void;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function WalletConnect({ onConnect }: Props) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      if (typeof window.ethereum !== 'undefined') {
        const provider = new BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        onConnect(address);
      } else {
        throw new Error('Please install MetaMask');
      }
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className={`px-4 py-2 rounded-lg text-white transition ${
          isConnecting 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {error && (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
}