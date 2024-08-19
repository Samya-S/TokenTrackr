"use client";

import { useWallet } from "@/context/WalletContext";
import { ethers } from "ethers";
import React, { useState } from "react";

const CheckAllowanceComponent = () => {
  const { walletAddress, connected } = useWallet();
  const [allowance, setAllowance] = useState<string>("");
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [spenderAddress, setSpenderAddress] = useState<string>("");

  const ethersProvider = new ethers.BrowserProvider(window.ethereum as any);

  const checkAllowance = async () => {
    if (!ethersProvider || !walletAddress || !connected) return;

    try {
      const tokenContract = new ethers.Contract(
        tokenAddress,
        [
          "function allowance(address owner, address spender) view returns (uint)",
        ],
        await ethersProvider.getSigner()
      );

      const result = await tokenContract.allowance(
        walletAddress,
        spenderAddress
      );
      setAllowance(ethers.formatUnits(result, 18));
    } catch (error) {
      console.error("Failed to fetch allowance", error);
      alert("Failed to fetch allowance");
    }
  };

  return (
    <div>
      {connected ? (
        <>
          <p className="text-2xl font-medium text-center p-5">
            Check Allowance
          </p>
          <input
            type="text"
            placeholder="Token Address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full max-w-xl ml-auto mr-auto block mb-2"
          />
          <input
            type="text"
            placeholder="Spender Address"
            value={spenderAddress}
            onChange={(e) => setSpenderAddress(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full max-w-xl ml-auto mr-auto block"
          />
          <div className="flex flex-row justify-between items-center w-full max-w-xl ml-auto mr-auto pb-5">
            <p className="px-1">
              Allowance:{" "}
              <span className="text-xl font-semibold">{allowance}</span>
            </p>
            <button
              onClick={checkAllowance}
              className="border-black border-2 hover:bg-black hover:text-white px-3 py-1 rounded-md mt-2 transition-colors"
            >
              Check Allowance
            </button>
          </div>
        </>
      ) : (
        <p>Please connect your wallet to check allowance.</p>
      )}
    </div>
  );
};

export default CheckAllowanceComponent;
