const { isProd } = require("@/utils/isProd")

const bnb_erc20PaymentAddr = isProd ? "0xC1c63ca6189913000ee02817E2eb1248d042d8F8" : "0x9BaF5Ba732E415cE3deD2099090DA6F02969d42e"

module.exports = {
  bnb_erc20PaymentAddr
}