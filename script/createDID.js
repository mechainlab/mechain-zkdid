const DID_Artifact = require("../artifacts/contracts/DID.sol/MeDid.json")
const DID_address = '0x74b9E2831E82fFA27A1CE397cccc49113AfE5E53';
//0x5FbDB2315678afecb367f032d93F642f64180aa3

async function main() {

    await create();
}


async function create() {
    // ethers is available in the global scope
    // let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    // // Connect a wallet to localhost
    // let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    let privateKey = "0x4027a8cdd87fd1d24e66c7a6630ef7f57baecfc1df4a6be884996aa212fb23c6";
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

    let user_address = "0x811B92EB81211F60699f58eaF952b427e5c3402e";
    let did = "z6MkfwBucHzXKbcJkEcDVytsVqWT2Q1wWmHqkfFW1gRNJd7h";

    // console.log(ethers.utils.formatBytes32String(did));
    // console.log(ethers.utils.toUtf8Bytes(did));
    console.log('1');


    const overrides = {
        gasLimit: 9999999,
        gasPrice: 10 * (10 ** 9)
    }
    // await DID.mint(user_address, ethers.utils.keccak256(ethers.utils.toUtf8Bytes(did)),overrides);
    await DID.mint(user_address, did, overrides);


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
