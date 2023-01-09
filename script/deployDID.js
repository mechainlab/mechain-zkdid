
async function main() {

  await deploy();
}


async function deploy() {
  // ethers is available in the global scope
  // let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  // // Connect a wallet to localhost
  // let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

  let privateKey = "0x4027a8cdd87fd1d24e66c7a6630ef7f57baecfc1df4a6be884996aa212fb23c6";
  // Connect a wallet to localhost
  let customHttpProvider = new ethers.providers.JsonRpcProvider("http://8.210.44.55:9933");

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
