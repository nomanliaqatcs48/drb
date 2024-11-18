
import {
  TwitterShareButton,
  EmailShareButton,
  EmailIcon,
  TwitterIcon,
} from "react-share";
export const NETWORK_CONFIG = {
  //For Mumbai test net
  5: {
    chainId: "0x5",
    chainName: "Goerli Testnet",
    rpcUrls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorerUrls: ["https://goerli.etherscan.io"],
    iconUrls: ["https://goerli.etherscan.io/favicon.ico"],
  },

  80001: {
    chainId: "0x13881",
    chainName: "Mumbai",
    nativeCurrency: {
      name: "Polygon",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  //For Binance test net
  97: {
    chainId: "0x61",
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "tBNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  // Binance Smart Chain Mainnet
  56: {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  // Mumbai/Polygon Mainnet
  137: {
    chainId: "0x89",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Polygon",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  11155111: {
    chainId: "0x11155111",
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/c2d3a4f1e90b42af94ea0d93e28d3b17"],
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
  },
};


export const  socialShare = [
  {
    content: (
      <TwitterShareButton url={"shareUrl"} title={"title"}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
    ),
  },
  {
    content: (
      <EmailShareButton url={"shareUrl"} title={"title"}>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
    ),
  },
];

export const network={ 5:"Goerli", 11155111:"Sepolia", 137:"Polygon", 1:"Ethereum"}