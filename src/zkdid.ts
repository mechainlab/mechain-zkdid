import zkDID from 'zkDID';
import {ethers} from 'ethers';

const window ={};

// User generates an ETH address
let address = ethers.Wallet.createRandom().address;
address = "0x811B92EB81211F60699f58eaF952b427e5c3402e";
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
