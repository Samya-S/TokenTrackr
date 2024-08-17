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

export const ConnectWalletButton = () => {
  const { walletAddress, connected, connect, disconnect } = useWallet();

  return (
    <div className="relative">
      {connected ? (
        <Popover>
          <PopoverTrigger>
            <Button>{walletAddress ? formatAddress(walletAddress) : "Wallet"}</Button>
          </PopoverTrigger>
          <PopoverContent className="mt-2 w-44 bg-gray-100 border rounded-md shadow-lg right-0 z-10 top-10">
            <Button
              onClick={disconnect}
              className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
            >
              Disconnect
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button onClick={connect}>
          <WalletIcon className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      )}
    </div>
  );
};

export const NavBar = () => {
  return (
    <nav className="flex items-center justify-between max-w-screen-xl px-6 mx-auto py-7 rounded-xl">
      <Link href="/" className="flex gap-1 px-6">
        <span className="hidden text-2xl font-bold sm:block">
          <span className="text-gray-900">Crypto-Portfolio App</span>
        </span>
      </Link>
      <div className="flex gap-4 px-6">
        <ConnectWalletButton />
      </div>
    </nav>
  );
};

export default NavBar;
