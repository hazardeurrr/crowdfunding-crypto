const { isProd } = require("@/utils/isProd")

const bnb_campaignAddr = isProd ? "0xb4de089868f13BEd99de458dcFEf1b393ceE476c" : "0x08a4243d3f5dbd13a3BC70aC2C956D19A9e78bEf"

module.exports = {
  bnb_campaignAddr
}