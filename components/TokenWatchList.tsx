"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/context/WalletContext";
import { Trash2 } from "lucide-react";
import { getCoinPrice } from "@/server/actions";

// Interface for the token balance
interface TokenBalance {
  tokenAddress: string;
  balance: string;
  price: string;
  name: string;
  symbol: string;
}

// ERC-20 ABI to get the name, symbol and balance of the token
const ERC20_ABI = [
  // Some common ERC-20 methods
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address owner) view returns (uint256)",
];

const TokenWatchList: React.FC = () => {
  const { walletAddress, connected, provider } = useWallet();
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [watchList, setWatchList] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  // Load watchlist from local storage when component mounts
  useEffect(() => {
    const getWatchList = async () => {
      const storedWatchList = localStorage.getItem("watchList");
      if (storedWatchList) {
        const parsedWatchList = JSON.parse(storedWatchList);
        setWatchList(parsedWatchList);
      }
    };
    getWatchList();
    setLoaded(true);
    /* eslint-disable-next-line */
  }, []);

  // Fetch the balances of the tokens in the watch list when the component mounts
  useEffect(() => {
    if (loaded && connected) {
      fetchTokenBalances(watchList);
    }
    /* eslint-disable-next-line */
  }, [loaded]);

  // Create a new ethers provider using the injected ethereum provider
  const ethersProvider = new ethers.BrowserProvider(window.ethereum as any);

  // function to get the name, symbol and balance of the token
  const getTokenDetails = async (tokenAddress: string) => {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      ethersProvider
    );

    const name = await tokenContract.name();
    const symbol = await tokenContract.symbol();
    const balance = await tokenContract.balanceOf(walletAddress);

    return { name, symbol, balance };
  };

  // function to add token to watch list
  const addTokenToWatchList = async () => {
    if (tokenAddress && !watchList.includes(tokenAddress)) {
      setWatchList((prevWatchList) => {
        const newWatchList = [...prevWatchList, tokenAddress];
        localStorage.setItem("watchList", JSON.stringify(newWatchList)); // Save to local storage
        fetchTokenBalances(newWatchList); // Call fetchTokenBalances with the updated watchList
        return newWatchList;
      });
      setTokenAddress(""); // Clear the input after adding
      alert("Token added to watch list");
    } else if (watchList.includes(tokenAddress)) {
      alert("Token already in watch list");
    } else {
      alert("Please enter a valid token address");
    }
  };

  // function to fetch the balances of the tokens in the watch list
  const fetchTokenBalances = async (watchList: string[]) => {
    if (ethersProvider && walletAddress) {
      const tokens = await Promise.all(
        watchList.map(async (tokenAddress) => {
          try {
            // get the name, symbol and balance of the token in the wallet
            const { name, symbol, balance } = await getTokenDetails(
              tokenAddress
            );

            // get the price of the token in USD
            const res = await getCoinPrice(symbol);
            const price = res.price || "N/A";

            return {
              tokenAddress,
              balance: ethers.formatUnits(balance, 6),
              price,
              name,
              symbol,
            };
          } catch (error) {
            console.error(
              `Failed to fetch balance for token: ${tokenAddress}`,
              error
            );
            alert(`Failed to fetch balance for token: ${tokenAddress}`);
            return {
              tokenAddress,
              balance: "Error",
              price: "N/A",
              name: "N/A",
              symbol: "N/A",
            };
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
      localStorage.setItem(
        "watchList",
        JSON.stringify(
          tokens
            .filter(({ balance }) => balance !== "Error")
            .map(({ tokenAddress }) => tokenAddress)
        )
      );
    }
  };

  // function to refetch the balances of the tokens in the watch list
  const refetchTokenBalances = async () => {
    try {
      await fetchTokenBalances(watchList);
      alert("Balances refetched successfully");
    } catch (error) {
      console.error("Failed to refetch balances", error);
      alert("Failed to refetch balances");
    }
  };

  // Listen for changes in the provider's accounts
  useEffect(() => {
    if (provider) {
      provider.on("accountsChanged", () => {
        setWatchList([]); // Clear the watch list
        setTokens([]); // Clear the tokens
      });
    }
    return () => {
      if (provider) {
        provider.removeAllListeners("accountsChanged"); // Remove the listener when the component unmounts
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
            className="border border-gray-300 rounded-md p-2 w-full max-w-xl ml-auto mr-auto block"
          />
          <div className="flex justify-center gap-4">
            <button
              onClick={addTokenToWatchList}
              className="border-black border-2 hover:bg-black hover:text-white px-3 py-1 rounded-md mt-2 transition-colors"
            >
              Add Token
            </button>
            <button
              onClick={refetchTokenBalances}
              className="border-black border-2 hover:bg-black hover:text-white px-3 py-1 rounded-md mt-2 transition-colors"
            >
              Refetch Balances
            </button>
          </div>

          <div className="mt-4 flex justify-center">
            {tokens.length != 0 && (
              <div className="overflow-x-auto">
                <table className="mt-2 border-2 text-nowrap">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Symbol</th>
                      <th className="px-4 py-2 border">Token Address</th>
                      <th className="px-4 py-2 border">Balance</th>
                      <th className="px-4 py-2 border">Price (USD)</th>
                      <th className="px-4 py-2 border">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map(
                      ({ tokenAddress, balance, price, name, symbol }) => {
                        return (
                          <tr key={tokenAddress}>
                            <td className="px-4 py-2 border text-center">
                              {name}
                            </td>
                            <td className="px-4 py-2 border text-center">
                              {symbol}
                            </td>
                            <td
                              className="px-4 py-2 border text-center hover:cursor-pointer min-w-[400px]"
                              onMouseEnter={(e) =>
                                (e.currentTarget.innerText = "Click to Copy")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.innerText = tokenAddress)
                              }
                              onClick={(e) => {
                                navigator.clipboard.writeText(tokenAddress);
                                e.currentTarget.innerText = "Copied!";
                              }}
                            >
                              {tokenAddress}
                            </td>
                            <td className="px-4 py-2 border text-right">
                              {balance}
                            </td>
                            <td className="px-4 py-2 border text-right">
                              {price}
                            </td>
                            <td className="px-4 py-2 border text-center">
                              <Trash2
                                className="inline-block w-5 h-5 -mt-1 hover:cursor-pointer"
                                onClick={() => {
                                  setWatchList((prevWatchList) =>
                                    prevWatchList.filter(
                                      (watchListTokenAddress) =>
                                        watchListTokenAddress !== tokenAddress
                                    )
                                  );
                                  localStorage.setItem(
                                    "watchList",
                                    JSON.stringify(
                                      watchList.filter(
                                        (watchListTokenAddress) =>
                                          watchListTokenAddress !== tokenAddress
                                      )
                                    )
                                  );
                                  fetchTokenBalances(
                                    watchList.filter(
                                      (watchListTokenAddress) =>
                                        watchListTokenAddress !== tokenAddress
                                    )
                                  );
                                }}
                              />
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {tokens.length === 0 && <p>No tokens in the watch list</p>}
          </div>
        </>
      ) : (
        <p>Please connect your wallet to see the watch list.</p>
      )}
    </div>
  );
};

export default TokenWatchList;
