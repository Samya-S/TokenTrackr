"use client";

import AllowTokensComponent from "@/components/AllowTokens";
import CheckAllowanceComponent from "@/components/CheckAllowance";
import Introduction from "@/components/Introduction";
import TokenHistory from "@/components/TokenHistory";
import TokenWatchList from "@/components/TokenWatchList";
import TransferTokensComponent from "@/components/TransferTokens";
import { useWallet } from "@/context/WalletContext";
import { useState } from "react";

export default function Home() {
  const { connected, balance } = useWallet();
  const [allowORtransfer, setAllowORtransfer] = useState<string>("allow");

  return (
    <main className="flex flex-col items-center justify-between px-5 sm:px-24">
      <div className="w-full">
        {connected ? (
          <>
            <p className="text-center">
              Current ETH Balance:{" "}
              <span className="text-xl font-semibold">{balance}</span>{" "}
              <span className="font-semibold">ETH</span>
            </p>
            <TokenWatchList />
            <CheckAllowanceComponent />
            <div className="w-full max-w-xl pb-3 pt-4 ml-auto mr-auto">
              <div className="border-2 flex rounded-lg border-black">
                <button
                  onClick={() => setAllowORtransfer("allow")}
                  className={`${
                    allowORtransfer === "allow"
                      ? "bg-black text-white"
                      : "bg-transparent"
                  } p-2 rounded-md w-full`}
                >
                  Allow Tokens
                </button>
                <button
                  onClick={() => setAllowORtransfer("transfer")}
                  className={`${
                    allowORtransfer === "transfer"
                      ? "bg-black text-white"
                      : "bg-transparent"
                  } p-2 rounded-md w-full`}
                >
                  Transfer Tokens
                </button>
              </div>
            </div>
            <div className="mb-8">
              {allowORtransfer === "transfer" ? (
                <TransferTokensComponent />
              ) : (
                <AllowTokensComponent />
              )}
            </div>
            <TokenHistory />
          </>
        ) : (
          // <p className="min-h-[50vh] flex justify-center items-center mb-20">Wallet not connected</p>
          <Introduction />
        )}
      </div>
    </main>
  );
}
