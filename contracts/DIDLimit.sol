// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MeDid is Ownable {
  /*//////////////////////////////////////////////////////////////
                               STORAGE
  //////////////////////////////////////////////////////////////*/

    string public name;
    string public symbol;

    mapping(address => string) public dids;
    uint256 public total;

    // The ecdsa signer used to verify claim for user prizes
    address public _trustedSigner = 0x10A9EBCbBd81E509AC0deC320dB971819Fd59824;

    /// ECDSA signature of did
    // We sign the compact information of did_contract, user address
    // and user_idi off chain, and users use the signature information
    // corresponding to their address to call the contract to calim onchain did.
    struct DidSignature {
        bytes32 r;
        bytes32 s;
        uint8 v;
    }

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    /**
     * @dev create did to `user`
     * 
     * @param signature The address receiving the did
     * @param did user did
     */
    function createDid(DidSignature memory signature, string memory did)
        external
    {
        address signer = ecrecover(
            _createMessageDigest(address(this), msg.sender, did),
            signature.v,
            signature.r,
            signature.s
        );
        require(signer != address(0), "DidSigner is zero address.");
        require(_trustedSigner == signer, "DidSigner invalid.");
        dids[msg.sender] = did;
        ++total;
    }

    /**
     * @dev Mint xnft of tokenId to `user`
     * - Only callable by the NftPool, as extra state updates there need to be managed
     * @param user The address receiving the minted tokens
     * @param did The tokenId of xnft getting minted
     */
    function createDidByAdmin(address user, string memory did)
        external
        onlyOwner
    {
        dids[user] = did;
        ++total;
    }

    /**
     * @dev get user did
     * 
     * @param user The address of user
     */
    function getDid(address user) external view returns (string memory) {
        return dids[user];
    }

    /**
     * @dev Burn did of user
     * 
     * @param user The address of user
     **/
    function burn(address user) external onlyOwner {
        
        delete dids[user];
        --total;
    }

    /**
     * @dev Set trustedSigner of didContract.
     * @param trustedSigner address of trustedSigner
     **/
    function setTrustedSigner(address trustedSigner) external onlyOwner{
        require(trustedSigner != address(0), "trustedSigner is zero address.");
        _trustedSigner = trustedSigner;
    }

    /**
     * @dev Get trustedSigner of didContract.
     * @return trustedSigner address of trustedSigner
     **/
    function getTrustedSigner() external view returns (address){
        return _trustedSigner;
    }

    /**
     * @dev _createMessageDigest.
     * @param _did_contract did_contract address
     * @param _user user address
     * @param _did user did
     **/
    function _createMessageDigest(
        address _did_contract,
        address _user,
        string memory _did
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    keccak256(abi.encodePacked(_did_contract, _user, _did))
                )
            );
    }
}
