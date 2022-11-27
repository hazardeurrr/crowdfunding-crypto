const { isProd } = require("@/utils/isProd")

const bnb_rewardAddr = isProd ? "0x28b7f8482A8bC950a9493675c73F1e1fE40F0a79" : "0xe9Dd017ac8B1F5c3603AA182d038cfD660F6056f"

module.exports = {
  bnb_rewardAddr
}