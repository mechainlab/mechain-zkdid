import zkDID from 'zkdid';
import { ethers } from 'ethers';
// let http = require('http');
import http from 'http';
import querystring from 'querystring';
import url from 'url';
const fs = require('fs');

const window = {};
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})

let address = process.argv.slice(2)[0];
console.log(address);

// User generates an ETH address
// let address = ethers.Wallet.createRandom().address;
// address = "0x811B92EB81211F60699f58eaF952b427e5c3402e";
// Identity issuer creates an did and assign it to the user
const did = (() => {
  const has = zkDID.did.hasDID(address);
  if (!has) zkDID.did.createDID(address);
  return zkDID.did.getDID(address);
})();

console.log(did);

// Credential issuer (e.g. Harvard) issues a GPA credential and a corresponding ZK credential to user (e.g., student)
const gpa40 = new zkDID.credential.GPACredential(did, 4.0);
const purpose = zkDID.credential.GPACredential.purpose();
if (false === zkDID.credential.hasZKCredential(did, purpose)) zkDID.credential.createZKCredential(gpa40);

// Verification
async function verify() {
  // User holds his/her ZK credential on hand (The real-world ZK credential can be stored offline or on IPFS).
  const zkCred = zkDID.credential.getZKCredential(did, purpose);

  // User goes to verifier's (who needs to check the ZK credential) website and generates a ZKProof based on a circuit (specified by verifier)
  const zkProof = await zkDID.zkproof.generateZKProof(zkCred, zkDID.circuit.CODE_GPA_35);

  // Verifier checks the ZKProof to see if the user is qualified (GPA >= 3.5)
  // Note: `zkProof` probably doesn't know its owner at all. It would be better if DApp uses zkDID.zkproof.verifySignedZKProof to verify the ownership of the `zkProof`.
  const res = zkDID.zkproof.verifyZKProof(zkProof, address, purpose);
  // res: true
}
verify();


function getDid(address: string) {
  const did = (() => {
    const has = zkDID.did.hasDID(address);
    if (!has) zkDID.did.createDID(address);
    return zkDID.did.getDID(address);
  })();

  return did;
}


let server = http.createServer(async function (req, res) {
  
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.setHeader("Access-Control-Allow-Headers", "*");
  //跨域允许的请求方式 
  res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");


  console.log("================================================================");
  const privateKey = "0xa9b415206ace65805a4165597d786cbaa31c6b3bfb759b2a03d9ac90631f7cbc";
  const didAddress = "0x54145851A01B082B103c26A01efC8E959Bc8004D";

  let result = {};
  res.writeHead(200, { 'Content-Type': 'application/json' })

  let address = undefined;
  if (req.url !== undefined) {
    var param = url.parse(req.url);
    // console.log(param.query);
    if (param === undefined || param.query === undefined || param.query?.includes("=") === false) {
      result = { error: "address is undefined" };
      res.write(JSON.stringify(result));
      res.end();
      return;
    }
    address = param.query?.split("=")[1];
  }

  if (address === undefined) {
    result = { error: "address is undefined" };
    res.write(JSON.stringify(result));
    res.end();
    return;
  }

  if (ethers.utils.isAddress(address) === false) {
    result = { error: "Not an eth address" };
    res.write(JSON.stringify(result));
    res.end();
    return;
  }

  let serverDid;
  if (address !== undefined) {
    serverDid = getDid(address);
    console.log(serverDid);
  }


  if (serverDid !== undefined && address !== undefined) {
    serverDid = serverDid.id.split(':')[2];
    const signer = new ethers.Wallet(privateKey);
    let signature = await getSignature(signer, didAddress, address, serverDid);
    result = { did: serverDid, signature: signature };
  } else {
    result = { error: "address Format error" }
  }


  res.write(JSON.stringify(result));
  res.end();

})

// 返回签名
async function getSignature(signer: any, campaignAddress: any, userAddress: any, serverDid: any) {
  const messageBytes = getMessageBytes(campaignAddress, userAddress)
  // 对数组化hash进行签名，自动添加"\x19Ethereum Signed Message:\n32"并进行签名
  const signature = await signer.signMessage(messageBytes)
  console.log("Signature: ", signature);
  let { r, s, v } = ethers.utils.splitSignature(signature)
  return { r, s, v };
}

// 对要签名的参数进行编码
function getMessageBytes(campaignAddress: any, userAddress: any) {
  // console.log(account);
  // console.log(amount);

  // 对应solidity的Keccak256
  const messageHash = ethers.utils.solidityKeccak256(["address"], [userAddress])
  // console.log("Message Hash: ", messageHash)
  // 由于 ethers 库的要求，需要先对哈希值数组化
  const messageBytes = ethers.utils.arrayify(messageHash)
  // console.log("messageBytes: ", messageBytes)
  // 返回数组化的hash
  return messageBytes
}

server.listen(8082, function () {
  console.log(`server is running at http://127.0.0.1:8082/did`);
})