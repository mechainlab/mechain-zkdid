
async function main() {

  await deploy();
}


async function deploy() {
  // ethers is available in the global scope
  // let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  // // Connect a wallet to localhost
  // let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

  let privateKey = "0x1a82db40df07c58023286e517870af8a5c949902e12784d514b89462536ed0e2aaaa";
  // Connect a wallet to localhost
  // let customHttpProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
  // let customHttpProvider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/h7o_tmDkleRAyaReOYzYyLns-hbTrHkM");
  let customHttpProvider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/3-VefB24BzwJ9dnkb9sKABundlDLZrRj");

  let deployer = new ethers.Wallet(privateKey, customHttpProvider);
  console.log("wallet address:" + deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  //deploye xNft
  const DID = await ethers.getContractFactory("MeDid");
  const did = await DID.deploy('MeDid', 'MeDid');
  await did.deployed();
  console.log("did address:", did.address);

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
