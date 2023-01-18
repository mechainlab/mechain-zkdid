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
    address public _trustedSigner;

    /// ECDSA signature of did
    // We sign the compact information of campaignId, user address
    // and prize amount off chain, and users use the signature information
    // corresponding to their address to call the contract to calim rewards.
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
     * @dev Mint xnft of tokenId to `user`
     * - Only callable by the NftPool, as extra state updates there need to be managed
     * @param signature The address receiving the minted tokens
     * @param did The tokenId of xnft getting minted
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
        //mint xnft to user
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
        //mint xnft to user
        dids[user] = did;
        ++total;
    }

    /**
     * @dev Mint xnft of tokenId to `user`
     * - Only callable by the NftPool, as extra state updates there need to be managed
     * @param user The address receiving the minted tokens
     */
    function getDid(address user) external view returns (string memory) {
        return dids[user];
    }

    /**
     * @dev Burn xnft of tokenId from `user`
     * - Only callable by the NftPool, as extra state updates there need to be managed
     * @param user The tokenId of xnft getting burned
     **/
    function burn(address user) external onlyOwner {
        //burn user's xnft
        delete dids[user];
        --total;
    }

    /**
     * @dev _createMessageDigest.
     * @param _campaign campaign address
     * @param _user user address
     * @param _did prize amount for claim
     **/
    function _createMessageDigest(
        address _campaign,
        address _user,
        string memory _did
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    keccak256(abi.encodePacked(_campaign, _user, _did))
                )
            );
    }
}
