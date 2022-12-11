import { openContractCall } from "@stacks/connect"
import { StacksMainnet } from "@stacks/network";
import { userSession } from "./connectWallet";
import { FungibleConditionCode, makeStandardSTXPostCondition,standardPrincipalCV, stringAsciiCV } from "@stacks/transactions";
import { prompt, UrL } from "../pages";
export async function mintCard() {
 const contractAddress = 'SP1ARWZD4G0SZPADBFQ5DVSK93B6QKQ6DHK9G452P';
  const contractcallerAddress = userSession.loadUserData().profile.stxAddress.mainnet;
  const contractCallerAddressCV=standardPrincipalCV(contractcallerAddress)
  console.log(contractcallerAddress)
  const network = new StacksMainnet;

  const imageUrlCv=stringAsciiCV(UrL)
  const functionArgs=[contractCallerAddressCV,imageUrlCv]
  // console.log(prompt)
  const postConditionAddress = userSession.loadUserData().profile.stxAddress.mainnet;
  const postConditionCode = FungibleConditionCode.LessEqual;
  const postConditionAmount = 1000000;
  const postConditions = [
    makeStandardSTXPostCondition(
      postConditionAddress,
      postConditionCode,
      postConditionAmount
    ),
  ];


  const options = {
    contractAddress,
    functionName: "mint",
    contractName: 'text-to-image-dtsc-691',
    functionArgs,
    network,
    postConditions,
    appDetails: {
      name: "Text to image NFT",
      icon: "/favicon.ico",
    },
    onFinish: (data: any) => {
      console.log("Stacks Transaction:", data.stacksTransaction);
      console.log("Transaction ID:", data.txId);
      console.log("Raw transaction:", data.txRaw);
    }

  };
  await openContractCall(options);
}