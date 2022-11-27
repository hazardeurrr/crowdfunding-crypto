const { isProd } = require("./isProd")

const bnb_chain = isProd ? '0x38' : '0x61' // Binance Chain testnet -- change to 0x38 for production on Mainnet
                              // don't forget to change the switchToBNBTest -> switchToBNB dans navbar
module.exports = {
  bnb_chain
}