const DID_Artifact = require("../artifacts/contracts/DIDLimit.sol/MeDid.json")
const DID_address = '0xc928De83a0518AE29ab1f493E1D29D80Fa97F8A4';
//0x5FbDB2315678afecb367f032d93F642f64180aa3

async function main() {

    await create();
}


async function create() {
    // ethers is available in the global scope
    // let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    // // Connect a wallet to localhost
    // let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    let privateKey = "";
    // Connect a wallet to localhost
    // let customHttpProvider = new ethers.providers.JsonRpcProvider("http://8.210.44.55:9933");
    // let customHttpProvider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/h7o_tmDkleRAyaReOYzYyLns-hbTrHkM");
    let customHttpProvider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/3-VefB24BzwJ9dnkb9sKABundlDLZrRj");

    // url: `https://goerli.infura.io/v3/8890b0405f0e4de4b2e24a90767e9114`,

    let wallet = new ethers.Wallet(privateKey, customHttpProvider);
    console.log("Account balance:", (await wallet.getBalance()).toString());

    //deploye xNft
    let DID = new ethers.Contract(
        DID_address,
        DID_Artifact.abi,
        wallet
    );
    console.log(wallet.address);

    let user_address = "0x69916fb3bbaa0767bb90d1d06c2e5b6ac28dad4b";
    let did = "z6MktUuHQLCHwJpVw3sYUxFYzxEFcmuQSPeZA6A3oCS4FP6Q";

    const overrides = {
        gasLimit: 200000,
        maxPriorityFeePerGas:10* (10 ** 9),
        maxFeePerGas:20* (10 ** 9)
    }

    let signature = {
        "r": "0x636a720a5083601cab681d2569c3c24ed7d76150c25fb51100da0947d05cadbe",
        "s": "0x039166c73e2314ec0e625b9c6b8ac5b652f67e6fbc74ba8f5d04a27840c3bb52",
        "v": 27
    }

    // let result = await DID.createDid(signature, did);
    // console.log(result);

    // let receipt = await customHttpProvider.getTransactionReceipt(result.hash);
    // console.log(receipt);

    // let factory = new ethers.ContractFactory(DID_Artifact.abi, DID_Artifact.bytecode, wallet,);

    // let contract = await factory.deploy('MeDid', 'MeDid', overrides);
    // console.log(contract.address);
    // await contract.deployed()

    console.log('2');


    let onchainDid = await DID.getDid(user_address);
    console.log("user's onchainDid is:" + onchainDid);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
