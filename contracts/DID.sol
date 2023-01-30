// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MeDidAdmin is Ownable {
    /*//////////////////////////////////////////////////////////////
                               STORAGE
  //////////////////////////////////////////////////////////////*/

    string public name;
    string public symbol;

    mapping(address => string) public dids;
    uint256 public total;

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
     * @param user The address receiving the minted tokens
     * @param did The tokenId of xnft getting minted
     */
    function mint(address user, string memory did) external onlyOwner {
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
}
