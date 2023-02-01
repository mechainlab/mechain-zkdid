const DID_Artifact = require("../artifacts/contracts/DIDLimit.sol/MeDid.json")
const DID_address = '0x0D7487598Dd00a9B275F74760FED10b688582040';
//0x5FbDB2315678afecb367f032d93F642f64180aa3

async function main() {

    await create();
}


async function create() {
    // ethers is available in the global scope
    // let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    // // Connect a wallet to localhost
    // let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    let privateKey = "3a27db91e4a3d140aa2e7b96678dd8784fdea7a1763945eeace74e33ff145f6d";
    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://8.210.44.55:9933");
    let wallet = new ethers.Wallet(privateKey, customHttpProvider);
    console.log("Account balance:", (await wallet.getBalance()).toString());

    //deploye xNft
    let DID = new ethers.Contract(
        DID_address,
        DID_Artifact.abi,
        wallet
    );
    console.log(wallet.address);

    let user_address = "0x0bBfB1ec515149688366C519ACB01E26e0C52CFb";
    let did = "z6MkhBxkb8pUtTAVaTyPHXjdAbyifi96f5KQjLdeDwgpig7Z";

    // console.log(ethers.utils.formatBytes32String(did));
    // console.log(ethers.utils.toUtf8Bytes(did));
    console.log('1');


    const overrides = {
        gasLimit: 9999999,
        gasPrice: 10 * (10 ** 9)
    }

    let signature = {
        "r": "0x01833d842a9fb2f2ea2a0a00e851f453b29b6993d5ee04bc758223b93e6cfb86",
        "s": "0x21598076a2efc9809976f8d95b99524dcb5b7307392e31174468e8a0687e42bf",
        "v": 28
    }

    // await DID.mint(user_address, ethers.utils.keccak256(ethers.utils.toUtf8Bytes(did)),overrides);
    let result = await DID.createDid(signature, did, overrides);
    console.log(result);

    let receipt = await customHttpProvider.getTransactionReceipt(result.hash);
    console.log(receipt);

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
