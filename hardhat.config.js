/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "vlgPv9N8TXqYOSeKnFcmQWIokZ3g4U_Z";
const GOERLI_PRIVATE_KEY =
  "9cb8bd42355e40e621066bd00bf7b58edac754c102cc653723db33b90458b397";

module.exports = {
  solidity: "0.8.17",

  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${GOERLI_PRIVATE_KEY}`],
    },
  },
};
