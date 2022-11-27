const { isProd } = require("./isProd")

const campaignsCollection = isProd ? 'campaignsBNB' : 'campaignsBNBTest' 
const preCampaignsCollection = isProd ? 'preCampaigns' : 'preCampaignsTest'

module.exports = {
  campaignsCollection,
  preCampaignsCollection
}