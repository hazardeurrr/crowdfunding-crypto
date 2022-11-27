const { isProd } = require("@/utils/isProd")

const bnb_campaignFactoryAddr = isProd ? "0xF5CD2d2278347AC00Dd0D9E3C3C5329aC811AF9d" : "0xf5a77660a9786B3EFFda0808f8c76b41746914d0"

module.exports = {
  bnb_campaignFactoryAddr
}