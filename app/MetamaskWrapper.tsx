"use client";

import { MetaMaskProvider } from "@metamask/sdk-react";
import { WalletProvider } from "@/context/WalletContext";

export default function MetamaskWrapper({ children } : { children: React.ReactNode }) {
  const host = typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host,
    },
    infuraAPIKey: process.env.INFURA_API_KEY,
  };

  return (
    <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
      <WalletProvider>{children}</WalletProvider>
    </MetaMaskProvider>
  );
}
