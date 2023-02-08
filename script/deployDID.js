
async function main() {

  await deploy();
}


async function deploy() {
  // ethers is available in the global scope
  // let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  // // Connect a wallet to localhost
  // let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

  let privateKey = "0x315bdde188acc16b06b41b3ccb06da359c2bbb5a60072b61aa13f907aaaeb782";
  // Connect a wallet to localhost
  // let customHttpProvider = new ethers.providers.JsonRpcProvider("http://8.210.44.55:9933");
  let customHttpProvider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/YbE4U9U8b3M74_Un2wTDK83R0M2W1Ksf");

  let deployer = new ethers.Wallet(privateKey, customHttpProvider);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  //deploye xNft
  const DID = await ethers.getContractFactory("MeDid");
  const did = await DID.deploy('MeDid','MeDid');
  await did.deployed();
  console.log("did address:", did.address);

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
