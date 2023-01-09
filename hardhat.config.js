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
      accounts: [`0x4027a8cdd87fd1d24e66c7a6630ef7f57baecfc1df4a6be884996aa212fb23c6`]
    }
  }
};
