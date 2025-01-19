'use client';

import { useState } from 'react';
import { BrowserProvider } from 'ethers';

interface WalletConnectProps {
  onConnect: (address: string) => void;
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [address, setAddress] = useState<string>('');

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Use BrowserProvider instead of Web3Provider
        const provider = new BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();
        setAddress(walletAddress);
        onConnect(walletAddress);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Error connecting wallet. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {address ? (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Connected:</span>
          <span className="font-mono">{address.slice(0, 6)}...{address.slice(-4)}</span>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Connect 
        </button>
      )}
    </div>
  );
}