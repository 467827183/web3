import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";
import { http } from "wagmi";
import { defineChain } from "viem";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  oktoWallet,
  okxWallet,
} from "@rainbow-me/rainbowkit/wallets";
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        rainbowWallet,
        walletConnectWallet,
        metaMaskWallet,
        // oktoWallet,
        // okxWallet,
      ],
    },
  ],
  {
    appName: "My RainbowKit App",
    projectId: "d0f47c2a4b228c37943589c9a1909fe3",
  }
);
const matchTestNet = /*#__PURE__*/ defineChain({
  //定义matchTest链
  id: 699,
  name: "MatchTest",
  nativeCurrency: { name: "Match Coin", symbol: "MAT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.matchain.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "Matchscan",
      url: "https://testnet.matchscan.io/",
      apiUrl: "https://testnet.matchscan.io/api",
    },
  },
  iconUrl: "https://testnet.matchscan.io/static/identicon_logos/blockies.png",
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 751532,
    },
    ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
    ensUniversalResolver: {
      address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
      blockCreated: 5_317_080,
    },
  },
  // testnet: true,
});
export const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: "d0f47c2a4b228c37943589c9a1909fe3",
  connectors,
  chains: [
    mainnet,
    matchTestNet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  // transports: {
  //   [matchTestNet.id]: http('https://testnet-rpc.matchain.io'),
  // },
});
