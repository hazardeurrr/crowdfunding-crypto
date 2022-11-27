const { isProd } = require("./isProd")

const chain = isProd ? '0x1' : '0x5' // Goerli -- change to 0x1 for production on Mainnet
                              // don't forget to change the switchToGoerli -> switchToETH dans navbar

module.exports = {
  chain
}