const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require('fs');

const SEED = fs.readFileSync("../.secret").toString().trim();
const INFURA_LINK = "https://rinkeby.infura.io/v3/053f363db26f4a1cbd5baa36fe24716c"

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },

    rinkeby: {
      provider: () => new HDWalletProvider(SEED, INFURA_LINK),
        network_id: 4,       // rinkeby's id
        gas: 4500000,
        gasPrice: 10000000000,
    }
  }
};