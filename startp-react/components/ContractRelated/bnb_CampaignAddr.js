const { isProd } = require("@/utils/isProd")

const bnb_campaignAddr = isProd ? "0xb4de089868f13BEd99de458dcFEf1b393ceE476c" : "0x8114f5E8f7c7c976547b64295eB2B07063E47773"

module.exports = {
  bnb_campaignAddr
}