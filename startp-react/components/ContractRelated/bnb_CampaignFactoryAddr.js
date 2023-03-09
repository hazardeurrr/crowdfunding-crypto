const { isProd } = require("@/utils/isProd")

const bnb_campaignFactoryAddr = isProd ? "0xF5CD2d2278347AC00Dd0D9E3C3C5329aC811AF9d" : "0x133482BcDaE458a245eb184ffa2bB40780fDfB2d"

module.exports = {
  bnb_campaignFactoryAddr
}