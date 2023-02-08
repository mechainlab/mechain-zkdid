const DID_Artifact = require("../artifacts/contracts/DIDLimit.sol/MeDid.json")
const DID_address = '0x3dC5105A3606900afF950311E3a00B6FAC028e51';
//0x5FbDB2315678afecb367f032d93F642f64180aa3

async function main() {

    await create();
}


async function create() {
    // ethers is available in the global scope
    // let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    // // Connect a wallet to localhost
    // let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    let privateKey = "0x315bdde188acc16b06b41b3ccb06da359c2bbb5a60072b61aa13f907aaaeb782";
    // Connect a wallet to localhost
    // let customHttpProvider = new ethers.providers.JsonRpcProvider("http://8.210.44.55:9933");
    let customHttpProvider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/YbE4U9U8b3M74_Un2wTDK83R0M2W1Ksf");

    let wallet = new ethers.Wallet(privateKey, customHttpProvider);
    console.log("Account balance:", (await wallet.getBalance()).toString());

    //deploye xNft
    let DID = new ethers.Contract(
        DID_address,
        DID_Artifact.abi,
        wallet
    );
    console.log(wallet.address);

    let user_address = "0x193E70F5E72e838AdC6ee2A926C02979639D243d";
    let did = "z6MkhBxkb8pUtTAVaTyPHXjdAbyifi96f5KQjLdeDwgpig7Z";

    // console.log(ethers.utils.formatBytes32String(did));
    // console.log(ethers.utils.toUtf8Bytes(did));
    console.log('1');


    const overrides = {
        gasLimit: 9999999,
        gasPrice: 10 * (10 ** 9)
    }

    let signature = {
        "r": "0xc4bd524a51f80f803eda7c95bf27d1684df2d92b8f762380158ce556a50b71f9",
        "s": "0x1dc163d8926cbb47e258ff81b95c53ca526de25ea68bf100c57d94d6fdb28ea2",
        "v": 27
    }

    // await DID.mint(user_address, ethers.utils.keccak256(ethers.utils.toUtf8Bytes(did)),overrides);
    // let result = await DID.createDid(signature, did, overrides);
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
