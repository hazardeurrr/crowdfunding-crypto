const { isProd } = require("@/utils/isProd")

const bnb_campaignFactoryAddr = isProd ? "0xF5CD2d2278347AC00Dd0D9E3C3C5329aC811AF9d" : "0x2f0Eab6FF4404aE3F91CBB7ed56206160e6fA426"

module.exports = {
  bnb_campaignFactoryAddr
}