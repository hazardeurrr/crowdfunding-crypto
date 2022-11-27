const { isProd } = require("@/utils/isProd")

const bnb_busdAddr = isProd ? "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" : "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"

module.exports = {
  bnb_busdAddr
}