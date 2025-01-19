'use client';

import { useState } from 'react';
import WalletConnect from '@/components/WalletConnect';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

export default function Home() {
  const [address, setAddress] = useState<string>('');

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Decentralized Task Manager
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <WalletConnect onConnect={setAddress} />
        </div>

        {address && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <TaskForm address={address} />
            </div>
            <TaskList address={address} />
          </div>
        )}
      </div>
    </main>
  );
}