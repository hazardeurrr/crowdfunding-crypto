const { isProd } = require("@/utils/isProd")

const bnb_campaignFactoryAddr = isProd ? "0xF5CD2d2278347AC00Dd0D9E3C3C5329aC811AF9d" : "0xFFa53036613d526A914Ca44732d60EB176F37211"

module.exports = {
  bnb_campaignFactoryAddr
}