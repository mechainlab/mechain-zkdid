require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    },
    goerli: {
      url: `https://goerli.infura.io/v3/8890b0405f0e4de4b2e24a90767e9114`,
      accounts: [`0x315bdde188acc16b06b41b3ccb06da359c2bbb5a60072b61aa13f907aaaeb782`]
    },
    mechainTest: {
      url: `http://8.210.44.55:9933`,
      accounts: [`0x5a461d9c29eb6e4fd5429fb2991ccb32bedaa9a9f0ad82ae50bdf131b9a8b026`]
    }
  }
};
