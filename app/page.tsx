"use client";

import { useWallet } from "@/context/WalletContext";

export default function Home() {
  const { walletAddress, connected, balance, chainId, provider } = useWallet();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {connected ? (
          <>
            <p>Your connected wallet address: {walletAddress}</p>
            <p>Your connected chainId: {chainId}</p>
            <p>Your ETH Balance: {balance} ETH</p>
          </>
        ) : (
          <p>Wallet not connected</p>
        )}
      </div>
    </main>
  );
}
