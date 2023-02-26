const { isProd } = require("./isProd")

const campaignsCollection = isProd ? 'creatorPage' : 'creatorPage' 
const preCampaignsCollection = isProd ? 'preCampaigns' : 'preCampaignsTest'

module.exports = {
  campaignsCollection,
  preCampaignsCollection
}