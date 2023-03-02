const { isProd } = require("@/utils/isProd")

const bnb_erc20PaymentAddr = isProd ? "0xC1c63ca6189913000ee02817E2eb1248d042d8F8" : "0x45036EabDbf5745229a93E70d097426c710d40Cd"

module.exports = {
  bnb_erc20PaymentAddr
}