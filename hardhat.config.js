require("@nomicfoundation/hardhat-toolbox");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");
require("dotenv").config({path: __dirname + '/.env'});

const API = process.env.API_KEY_URL;
const privateKey = process.env.GOERLI_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    // near:{
    //   url:`https://near-testnet.infura.io/v3/${NEAR_API_KEY}`,
    //   accounts: [NEAR_PRIVATE_KEY]
    // },
    hardhat: {
      chainId: 1337, // We set 1337 to make interacting with MetaMask simpler,
    },
    goerli: {
      url: API,
      accounts: [`0x${privateKey}`]
    }
  }
};
