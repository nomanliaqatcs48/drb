import {
  getContractMethods,
  getWeb3,
  getMetamaskConnectedAddress,
} from "../../helpers/web3";
import { CONTRACT_DETAILS } from "./contractDetails";
import { handleRequest } from "../../helpers/helpers";
import Web3 from "web3";
import { toast } from "react-toastify";
const mint = async (amount: number, uri: string, setMintingSteps: any) => {
  try {
    console.log(
      CONTRACT_DETAILS.mint.address,
      "CONTRACT_DETAILS.mint.address=>"
    );
    const methods = await getContractMethods(
      CONTRACT_DETAILS.mint.abi,
      CONTRACT_DETAILS.mint.address
    );

    const web3: any = await getWeb3();

    const gasPrice = await web3.eth.getGasPrice();
    // const fromAddress = await getMetamaskConnectedAddress();
    // const transaction = methods.mint(amount, uri).send({ from: fromAddress });
    const transaction = methods.mint(amount, uri);
    const gasLimit = 3000000;
    const fromAddress = await getMetamaskConnectedAddress();
    const nonce = await web3.eth.getTransactionCount(fromAddress);
    const encodedTransaction = transaction.encodeABI();

    const txObject = {
      from: fromAddress,
      to: CONTRACT_DETAILS.mint.address,
      gas: gasLimit,
      gasPrice,
      data: encodedTransaction,
      nonce,
    };

    // Listen for the transactionHash event to obtain the hash before completion
    const tx = await web3.eth
      .sendTransaction(txObject)
      .on("transactionHash", async (hash: any) => {
        console.log("Transaction hash:", hash);
        setMintingSteps(3);
        // socket?.emit("checkMintingStatus", {txhash:hash});
        // await handleRequest("POST", `/mint/${hash}`);
      });
    console.log(tx, "tx==>");
    return tx;
    // const tx = await
  } catch (err: any) {
    toast.error(err.message || err);
    console.log(err, "error=>");
    throw Error(err);
  }
};

export { mint };
