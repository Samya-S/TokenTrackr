"use client";

import { useWallet } from "@/context/WalletContext";
import { ethers } from "ethers";
import React, { useState } from "react";

const AllowTokensComponent = () => {
  const { connected } = useWallet();
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  // Create a new ethers provider using the injected ethereum
  const ethersProvider = new ethers.BrowserProvider(window.ethereum as any);

  // function to transfer tokens
  const transferTokens = async (
    tokenAddress: string,
    to: string,
    amount: string
  ) => {
    if (!ethersProvider || !connected) return;

    try {
      // Create a new contract instance of the token
      const tokenContract = new ethers.Contract(
        tokenAddress,
        [
          "function approve(address spender, uint256 amount) public returns (bool)",
        ],
        await ethersProvider.getSigner()
      );

      // Approve the tokens
      const tx = await tokenContract.approve(to, ethers.parseUnits(amount, 18));

      // Wait for the transaction to be mined
      await tx.wait();
      alert("Approve successful");
    } catch (error) {
      // Handle the error
      console.error("Failed to approve tokens", error);
      alert("Failed to approve tokens");
    }
  };
  return (
    <div>
      {connected ? (
        <>
          {/* <p className="text-2xl font-medium text-center p-5">
            Allow Tokens
          </p> */}
          <input
            type="text"
            placeholder="Token Address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full max-w-xl ml-auto mr-auto block mb-2"
          />
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full max-w-xl ml-auto mr-auto block mb-2"
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full max-w-xl ml-auto mr-auto block"
          />
          <div className="flex flex-row justify-end items-center w-full max-w-xl ml-auto mr-auto">
            <button
              onClick={() => transferTokens(tokenAddress, recipient, amount)}
              className="border-black border-2 hover:bg-black hover:text-white px-3 py-1 rounded-md mt-2 transition-colors"
            >
              Approve
            </button>
          </div>
        </>
      ) : (
        <p>Please connect your wallet to approve tokens.</p>
      )}
    </div>
  );
};

export default AllowTokensComponent;
