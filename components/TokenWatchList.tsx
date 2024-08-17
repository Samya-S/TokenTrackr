"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/context/WalletContext";

interface TokenBalance {
  tokenAddress: string;
  balance: string;
}

const TokenWatchList: React.FC = () => {
  const { walletAddress, connected, provider } = useWallet();
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [watchList, setWatchList] = useState<string[]>([]);

  const ERC20_ABI = [
    // Some common ERC-20 methods
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint amount) returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint amount)",
  ];

  const ethersProvider = new ethers.BrowserProvider(window.ethereum as any);

  const addTokenToWatchList = async () => {
    if (tokenAddress && !watchList.includes(tokenAddress)) {
      setWatchList([...watchList, tokenAddress]);
      setTokenAddress(""); // Clear the input after adding
    }
    alert("Token added to watch list");
  };

  const fetchTokenBalances = async () => {
    if (ethersProvider && walletAddress) {
      const tokens = await Promise.all(
        watchList.map(async (tokenAddress) => {
          try {
            const tokenContract = new ethers.Contract(
              tokenAddress,
              ERC20_ABI,
              ethersProvider
            );
            const balance = await tokenContract.balanceOf(walletAddress);
            return {
              tokenAddress,
              balance: ethers.formatUnits(balance, 18),
            };
          } catch (error) {
            console.error(
              `Failed to fetch balance for token: ${tokenAddress}`,
              error
            );
            alert(`Failed to fetch balance for token: ${tokenAddress}`);
            return { tokenAddress, balance: "Error" };
          }
        })
      );
      // Update the tokens state with only valid tokens
      setTokens(tokens.filter(({ balance }) => balance !== "Error"));
      setWatchList(
        tokens
          .filter(({ balance }) => balance !== "Error")
          .map(({ tokenAddress }) => tokenAddress)
      );
    }
  };

  const refetchTokenBalances = async () => {
    try {
      await fetchTokenBalances();
      alert("Balances refetched successfully");
    } catch (error) {
      console.error("Failed to refetch balances", error);
      alert("Failed to refetch balances");
    }
  };

  useEffect(() => {
    fetchTokenBalances();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [watchList]);

  useEffect(() => {
    if (provider) {
      provider.on("accountsChanged", () => {
        setWatchList([]);
        setTokens([]);
      });
    }
    return () => {
      if (provider) {
        provider.removeAllListeners("accountsChanged");
      }
    };
  }, [provider]);

  return (
    <div>
      {connected ? (
        <>
          <p className="text-2xl font-medium text-center p-5">Watch List</p>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="Enter token address"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <div className="flex justify-center gap-4">
            <button
              onClick={addTokenToWatchList}
              className="border-black border-2 hover:bg-black hover:text-white px-3 py-1 rounded-md mt-2"
            >
              Add Token
            </button>
            <button
              onClick={refetchTokenBalances}
              className="border-black border-2 hover:bg-black hover:text-white px-3 py-1 rounded-md mt-2"
            >
              Refetch Balances
            </button>
          </div>

          <div className="mt-4 flex justify-center">
            {tokens.length != 0 && (
              <table className="mt-2 border-2">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Token Address</th>
                    <th className="px-4 py-2 border">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map(({ tokenAddress, balance }) => (
                    <tr key={tokenAddress}>
                      <td className="px-4 py-2 border">{tokenAddress}</td>
                      <td className="px-4 py-2 border text-right">{balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tokens.length == 0 && <p>No tokens in the watch list</p>}
          </div>
        </>
      ) : (
        <p>Please connect your wallet to see the watch list.</p>
      )}
    </div>
  );
};

export default TokenWatchList;
