require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.5.8",
  networks: {
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/h7o_tmDkleRAyaReOYzYyLns-hbTrHkM`,
      accounts: ['0x1a82db40df07c58023286e517870af8a5c949902e12784d514b89462536ed0e2']
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/3-VefB24BzwJ9dnkb9sKABundlDLZrRj`,
      accounts: ['0x1a82db40df07c58023286e517870af8a5c949902e12784d514b89462536ed0e2aaaa']
    },
    mechainTest: {
      url: `http://8.217.116.59:9933`,
      accounts: [`0xcd936e81cf66a9290354e7aa8c1e0a46d8850b8e9db545dc5b236c9be911c403`]
    },
    polygonTest: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/YbE4U9U8b3M74_Un2wTDK83R0M2W1Ksf`,
      accounts: [`0x315bdde188acc16b06b41b3ccb06da359c2bbb5a60072b61aa13f907aaaeb782`]
    }
  }
};
