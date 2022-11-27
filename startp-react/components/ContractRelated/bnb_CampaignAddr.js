const { isProd } = require("@/utils/isProd")

const bnb_campaignAddr = isProd ? "0xb4de089868f13BEd99de458dcFEf1b393ceE476c" : "0xc8bCd9c7878ab35Bcac70316493d0b7e1C6064Cd"

module.exports = {
  bnb_campaignAddr
}