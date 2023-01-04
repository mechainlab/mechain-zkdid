const DID_Artifact = require("../artifacts/contracts/DID.sol/MeDid.json")
const DID_address = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

async function main() {

    await create();
}


async function create() {
    // ethers is available in the global scope
    let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    let wallet = new ethers.Wallet(privateKey, customHttpProvider);
    console.log("Account balance:", (await wallet.getBalance()).toString());

    //deploye xNft
    let DID = new ethers.Contract(
        DID_address,
        DID_Artifact.abi,
        wallet
    );

    let user_address = "0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b";
    let did = "z6MksTXkHay68YDiEWKd6o8uj25C8mbFLEa8Qoaao5mBPd39";

    // console.log(ethers.utils.formatBytes32String(did));
    // console.log(ethers.utils.toUtf8Bytes(did));
    console.log(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(did)));

    

    // await DID.mint(user_address, ethers.utils.keccak256(ethers.utils.toUtf8Bytes(did)));
    await DID.mint(user_address, did);

    let onchainDid = await DID.getDid(user_address);
    console.log("user's onchainDid is:" + onchainDid);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
