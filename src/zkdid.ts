import zkDID from 'zkdid';
import { ethers } from 'ethers';
// let http = require('http');
import http from 'http';
import querystring from 'querystring';
import url from 'url';

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


let server = http.createServer(function (req, res) {

  console.log("================================================================");

  let address;
  if (req.url !== undefined) {
    var param = url.parse(req.url);
    console.log(param.query);
    address = param.query?.split("=")[1];
  }
  let serverDid;
  if (address !== undefined) {
    serverDid = getDid(address);
    console.log(serverDid);
  }

  res.writeHead(200, { 'Content-Type': 'application/json' })

  // //  配置响应信息
  if(serverDid!==undefined){
    res.write(serverDid.id.split(':')[2]);
  }

  // //   发送响应数据
  // res.write('<h1>111</h1>');
  // res.write('<h1>222</h1>');
  res.end();  // 响应结束
  // });

  // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
  //注册end事件，所有数据接收完成会执行一次该方法
  // req.on('end', function () {

  //   //（1）.对url进行解码（url会对中文进行编码）
  //   data = decodeURI(data);
  //   // console.log(data);

  //   /**post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 */

  //   //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
  //   //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
  //   var dataObject = querystring.parse(data);
  //   console.log(dataObject);
  //   console.log(dataObject[address]);
  // });


  // let did = getDid();

  // res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
  // //  配置响应信息
  // res.write('<h1>你好，这是你人生中创建的第一个服务器</h1>');
  // //   发送响应数据
  // res.write('<h1>111</h1>');
  // res.write('<h1>222</h1>');
  // res.end('<h1>响应结束！！！</h1>');  // 响应结束
})


server.listen(8000, function () {
  console.log(`server is running at http://127.0.0.1:8000`);
})