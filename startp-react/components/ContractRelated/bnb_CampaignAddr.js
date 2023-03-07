const { isProd } = require("@/utils/isProd")

const bnb_campaignAddr = isProd ? "0xb4de089868f13BEd99de458dcFEf1b393ceE476c" : "0x92806F93508af5a05Dcd70A5AeFA04F58fcaba1A"

module.exports = {
  bnb_campaignAddr
}