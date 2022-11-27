const { isProd } = require("@/utils/isProd")

const bnb_erc20PaymentAddr = isProd ? "0xC1c63ca6189913000ee02817E2eb1248d042d8F8" : "0x031865572E39441a58e7C7423EC52E3DbFb1E555"

module.exports = {
  bnb_erc20PaymentAddr
}