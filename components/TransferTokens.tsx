"use client";

import { useWallet } from "@/context/WalletContext";
import { ethers } from "ethers";
import React, { useState } from "react";

const TransferTokensComponent = () => {
  const { connected } = useWallet();
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const ethersProvider = new ethers.BrowserProvider(window.ethereum as any);

  const transferTokens = async (
    tokenAddress: string,
    to: string,
    amount: string
  ) => {
    if (!ethersProvider || !connected) return;

    try{
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ["function transfer(address to, uint value) public returns (bool)"],
        await ethersProvider.getSigner()
      );
  
      const tx = await tokenContract.transfer(to, ethers.parseUnits(amount, 18));
      await tx.wait();
      alert("Transfer successful");
    } catch(error){
      console.error("Failed to transfer tokens", error);
      alert("Failed to transfer tokens");
    }
  };
  return (
    <div>
      {connected ? (
        <>
          <p className="text-2xl font-medium text-center p-5">
            Transfer Tokens
          </p>
          <input
            type="text"
            placeholder="Token Address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <button
            onClick={() => transferTokens(tokenAddress, recipient, amount)}
            className="border-black border-2 hover:bg-black hover:text-white px-3 py-1 rounded-md mt-2 float-end"
          >
            Transfer
          </button>
        </>
      ) : (
        <p>Please connect your wallet to see the watch list.</p>
      )}
    </div>
  );
};

export default TransferTokensComponent;
