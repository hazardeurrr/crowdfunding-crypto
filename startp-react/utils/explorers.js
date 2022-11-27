const { isProd } = require("./isProd")

const bsc_explorer_base = isProd ? 'bscscan.com' : 'testnet.bscscan.com'
const eth_explorer_base = isProd ? 'etherscan.io' : 'goerli.etherscan.io'

module.exports = {
  bsc_explorer_base,
  eth_explorer_base
}