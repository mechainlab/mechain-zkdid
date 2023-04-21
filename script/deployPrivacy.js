
async function main() {

  await deploy();
}


async function deploy() {
  // ethers is available in the global scope
  // let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  // // Connect a wallet to localhost
  // let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

  let privateKey = "0xcd936e81cf66a9290354e7aa8c1e0a46d8850b8e9db545dc5b236c9be911c403";
  // Connect a wallet to localhost
  // let customHttpProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
  // let customHttpProvider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/h7o_tmDkleRAyaReOYzYyLns-hbTrHkM");
  let customHttpProvider = new ethers.providers.JsonRpcProvider("http://8.217.116.59:9933");

  let deployer = new ethers.Wallet(privateKey, customHttpProvider);
  console.log("wallet address:" + deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  //deploye xNft
  const Verifier = await ethers.getContractFactory("Verifier");
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  console.log("verifier address:", verifier.address);

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
