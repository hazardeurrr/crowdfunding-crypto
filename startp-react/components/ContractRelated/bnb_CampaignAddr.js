const { isProd } = require("@/utils/isProd")

const bnb_campaignAddr = isProd ? "0xb4de089868f13BEd99de458dcFEf1b393ceE476c" : "0x79530c8a62F2Ca384c74F3160aF30133Fccc4856"

module.exports = {
  bnb_campaignAddr
}