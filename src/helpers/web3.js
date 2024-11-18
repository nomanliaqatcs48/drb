import Web3 from "web3";
import { toast } from "react-toastify";
import { NETWORK_CONFIG } from "../utils/data";
import { ENV } from "../config/config";
import { isMobile } from "react-device-detect";
// export const getWeb3 = async () => {
//   let instance;
//   if (window?.ethereum) {
//     await window.web3.currentProvider.enable();
//     instance = new Web3(window.web3.currentProvider);
//   } else {
//     instance = new Web3("http://localhost:7545");
//   }

//   return instance;
// };

// Get web3 instance
export const getWeb3 = async () => {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      // const provider = new Web3.providers.HttpProvider(
      //   "https://eth-goerli.g.alchemy.com/v2/rymlFcTvusPa5mivhm8AGmBqUKZUxT4U"
      // );
      // // Create a new Web3 instance using the provider
      // const web3 = new Web3(provider);

      return web3;
    } else {
      console.log("No wallet"); // => take action on error
    }
  } catch (err) {
    console.log(err, "error=>"); // => take action on error
  }
};

export const connectWithMetamask = async () => {
  try {
    let web3 = await getWeb3();
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    let accounts = await web3.eth.getAccounts();
    return accounts[0];
  } catch (err) {
    toast.error(err?.message);
    throw new Error(err);
  }
};
export const getMetamaskAddress = async () => {
  try {
    let web3 = await getWeb3();
    let accounts = await web3.eth.getAccounts();
    return accounts[0];
  } catch (err) {
    toast.error(err?.message);
    throw new Error(err);
  }
};

export const switchNetworkToChainId = async (id) => {
  if (window?.ethereum) {
    try {
      let web3 = await getWeb3();
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(id) }],
      });
      let accounts = await web3.eth.getAccounts();
      return accounts[0];
    } catch (err) {
      if ([4902, -32603].includes(err.code)) {
        await addNetworkAutomatically(id);
        return;
      }
      toast.error(err?.message || err);
      throw new Error(err);
    }
  }
};

export const getChainId = async () => {
  if (window?.ethereum) {
    let web3 = await getWeb3();
    let chainId = await web3.eth.getChainId();
    return chainId;
  }
};

export const handleSign = async (nounce) => {
  try {
    const web3 = new Web3(Web3.givenProvider);
    let accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    return new Promise((resolve, reject) =>
      web3.eth.personal.sign(
        web3.utils.fromUtf8(`I am signing my one-time nonce: ${nounce}`),
        address?.toLowerCase(),
        (err, signature) => {
          // setIsButtonDisabled(false);
          if (err) return reject(err);
          return resolve({ address, signature });
        }
      )
    );
  } catch (err) {
    toast.error(err?.message);
    throw new Error(err);
  }
};
export const getMetamaskConnectedAddress = async () => {
  let web3 = await getWeb3();
  let accounts = await web3.eth.getAccounts();
  return accounts[0];
  ``````````````;
};

const addNetworkAutomatically = async (id) => {
  try {
    return await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [NETWORK_CONFIG[id]],
    });
  } catch (err) {
    toast.error(err?.message);
    throw new Error(err);
  }
};
export const isMetaMaskInstalled = () => {
 
  if (isMobile && !window?.ethereum) {
    window.open("https://metamask.app.link/dapp/drb-saudi-nft.invo.zone/");
    return false;
  }
  return typeof window.ethereum !== "undefined";
};
export const redirectToMetaMaskExtension = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.indexOf("chrome") > -1) {
    window.location.href =
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
  } else if (userAgent.indexOf("firefox") > -1) {
    window.location.href =
      "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/";
  } else if (userAgent.indexOf("safari") > -1) {
    window.location.href =
      "https://apps.apple.com/us/app/metamask/id1438144202";
  } else {
    return toast.info("Metamask does not support this browser");
    // Handle other browsers or unsupported scenarios
    // Display a message or provide alternative instructions
  }
};
export const validateMetamask = async (setLoading) => {
  try {
    setLoading(true);
    const currentChainId = await getChainId();
    if (ENV.chainId !== currentChainId) {
      await switchNetworkToChainId(ENV.chainId);
    }
    let connectedAddress = await getMetamaskConnectedAddress();
    if (!connectedAddress) {
      connectedAddress = await connectWithMetamask();
    }
    if (!connectedAddress) {
      alert("Could not connect to Metamask");
      return null;
    }
    setLoading(false);
    return connectedAddress;
  } catch (err) {
    setLoading(false);
    console.log(err, "error=>");
  }
};
export const getContractMethods = async (abiJson, contract) => {
  let web3 = await getWeb3();
  const contractM = new web3.eth.Contract(abiJson, contract);
  return contractM.methods;
};
