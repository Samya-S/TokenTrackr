"use client";

import Link from "next/link";
import WalletIcon from "../public/icons/WalletIcon";
import { Button } from "./ui/button";
import { formatAddress } from "../lib/utils";
import { useWallet } from "@/context/WalletContext";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useState } from "react";
import { Copy } from "lucide-react";

export const ConnectWalletButton = () => {
  const { walletAddress, connected, chainId, connect, disconnect } = useWallet();
  const [walletButtonText, setWalletButtonText] = useState("Wallet Address");
  const [chainidButtonText, setChainidButtonText] = useState("");

  return (
    <div className="relative">
      {connected ? (
        <Popover>
          <PopoverTrigger>
            <Button>
              {walletAddress ? (
                <>
                  <WalletIcon className="mr-2 h-4 w-4" />
                  {formatAddress(walletAddress)}
                </>
              ) : (
                "Wallet"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mt-2 w-44 bg-gray-100 border rounded-md shadow-lg right-0 z-10 top-10">
            <Button
              onMouseEnter={() => setWalletButtonText("Copy")}
              onMouseLeave={() => setWalletButtonText("Wallet Address")}
              onClick={() => {
                navigator.clipboard.writeText(walletAddress || "");
                setWalletButtonText("Copied");
              }}
              className="block w-full pl-2 pr-4 py-2 mb-2 text-center text-black bg-transparent border border-black hover:bg-black hover:text-white"
            >
              {walletButtonText === "Wallet Address" ? (
                walletButtonText
              ) : (
                <>
                  <Copy className="inline-block w-4 h-4 mr-2" />
                  {walletButtonText}
                </>
              )}
            </Button>
            <Button
              onMouseEnter={() => setChainidButtonText(chainId as string)}
              onMouseLeave={() => setChainidButtonText("Chain ID")}
              onClick={() => {
                navigator.clipboard.writeText(chainId || "");
                setChainidButtonText("Copied");
              }}
              className="block w-full pl-2 pr-4 py-2 my-2 text-center text-black bg-transparent border border-black hover:bg-black hover:text-white"
            >
              {chainidButtonText === "Chain ID" ? (
                chainidButtonText
              ) : (
                <>
                  <Copy className="inline-block w-4 h-4 mr-2" />
                  {chainidButtonText}
                </>
              )}
            </Button>
            <Button
              onClick={disconnect}
              className="mt-2 block w-full pl-2 pr-4 py-2 text-center text-[#F05252] bg-transparent border border-[#F05252] hover:bg-[#F05252] hover:text-white"
            >
              Disconnect
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button onClick={connect}>Connect Wallet</Button>
      )}
    </div>
  );
};

export const NavBar = () => {
  return (
    <nav className="sm:flex items-center justify-between max-w-screen-xl px-6 mx-auto py-7 rounded-xl">
      <Link href="/" className="flex gap-1 px-6 justify-center">
        <span className="text-2xl font-bold mb-3 sm:mb-0">
          <span className="text-gray-900">TokenTrackr</span>
        </span>
      </Link>
      <div className="flex gap-4 px-6 justify-center">
        <ConnectWalletButton />
      </div>
    </nav>
  );
};

export default NavBar;
