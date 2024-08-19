import React from 'react';
import Link from 'next/link';

const Introduction = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mb-4">
      <div className="max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome to TokenTrackr</h1>
        <p className="text-gray-700 mb-6 text-justify">
          TokenTrackr, a Crypto-Portfolio app is your ultimate tool for managing and monitoring your cryptocurrency investments with ease. Whether you&rsquo;re a seasoned trader or just getting started with crypto, our app offers a user-friendly interface and powerful features to keep track of your assets.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
        <ul className="list-disc list-inside mb-6">
          <li className="mb-2">
            <strong>Add Tokens to Watchlist:</strong> Easily add various tokens to your watchlist to monitor their performance.
          </li>
          <li className="mb-2">
            <strong>View Current Balances:</strong> Check the real-time balance of each token in your watchlist.
          </li>
          <li className="mb-2">
            <strong>Historical Data:</strong> Access historical balance data of each token and analyze performance over time.
          </li>
          <li className="mb-2">
            <strong>Check Allowance:</strong> See how much of your tokens are available for spending or transactions.
          </li>
          <li className="mb-2">
            <strong>Token Transfer:</strong> Transfer tokens to other addresses and manage approvals with ease.
          </li>
        </ul>
        <p className="text-gray-700 mb-6 text-justify">
          Getting started is simple. Connect your wallet, add your favorite tokens to the watchlist, and start managing your crypto portfolio like a pro.
        </p>
        <div className="flex justify-center">
          <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
