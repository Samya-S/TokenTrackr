"use client";

import TokenWatchList from "@/components/TokenWatchList";
import { useWallet } from "@/context/WalletContext";

export default function Home() {
  const { walletAddress, connected, balance, chainId } = useWallet();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <div>
        {connected ? (
          <>
            <p>Your connected wallet address: {walletAddress}</p>
            <p>Your connected chainId: {chainId}</p>
            <p>Your ETH Balance: {balance} ETH</p>
            <TokenWatchList />
          </>
        ) : (
          <p>Wallet not connected</p>
        )}
      </div>
    </main>
  );
}
