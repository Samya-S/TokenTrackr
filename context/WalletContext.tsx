"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSDK } from "@metamask/sdk-react";
import { SDKProvider, MetaMaskSDK } from "@metamask/sdk";
import { ethers } from "ethers";

interface WalletContextProps {
  walletAddress: string | null;
  connected: boolean;
  balance: string | undefined;
  connect: () => Promise<void>;
  disconnect: () => void;
  provider: SDKProvider | undefined; 
  chainId: string | undefined;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { sdk, connected, account, balance, chainId, provider } = useSDK();
  const [walletAddress, setWalletAddress] = useState<string | null>(account || null);
  const formattedBalance = ethers.formatEther(balance || 0);

  useEffect(() => {
    if (account) {
      setWalletAddress(account);
    } else {
      setWalletAddress(null);
    }
  }, [account]);

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
      setWalletAddress(null);
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, connected, balance: formattedBalance, connect, disconnect, provider, chainId }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
