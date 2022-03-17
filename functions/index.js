const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

import {rewardAddr} from "../startp-react/components/ContractRelated/RewardAddr";
import {rewardAbi} from "../startp-react/components/ContractRelated/RewardABI";
import campaignAbi from "../startp-react/components/ContractRelated/CampaignAbi";

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.region('europe-west1').https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


exports.updateWeeklyTotals = functions.pubsub.schedule('every monday 00:01')
  .timeZone('Europe/Paris')
  .onRun(async(context) => {
    var now = Date.now() / 1000
    let lastTimeStamp = await db.collection('utils').doc('lastWeeklyUpdate').get()
    let c1 = await db.collection('campaign').where("end_date", ">=", lastTimeStamp.timestamp)
    let campaignsToLoop = c1.filter(c => c.start_date <= now)
    let compteur = 0
    const rewardCtr = web3Instance.eth.Contract(rewardAddr, rewardAbi);
    rewardCtr.methods.getStartTimestamp().call().then(startTs =>{
      let midTs = (now + lastTimeStamp) / 2
      let week = (midTs - startTs) / 604800
      let rate = await db.collection('utils').doc('rates').get()
      
      for(let c of campaignsToLoop){
        let ctrCamp = web3Instance.eth.Contract(c.contract_address, campaignAbi);
        ctrCamp.getPastEvents("Participation", ({fromBlock: 'earliest'}))
        .then((events) => {
          let eventsFiltered = events.filter(e => e.returnValues.timestamp > lastTimeStamp)
          compteur += eventsFiltered.reduce((a,b) => {
            let currentRate = 1
            if(e.returnValues.token == "0x0000000000000000000000000000000000000000")
              currentRate = rate.eth[week]
            if(e.returnValues.token == "0x67c0fd5c30C39d80A7Af17409eD8074734eDAE55")
              currentRate = rate.bbst[week]
            if(e.returnValues.token == "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b")
              currentRate = rate.bbst[week]
            return a.returnValues.amount * currentRate + b.returnValues.amount * currentRate
          })
        });
      }

      console.log(compteur)

      let rewardData = await db.ccollection('utils').doc('rewardData').get()
      let newTotalPerWeek = rewardData.totalPerWeek.push(compteur)
      db.collection('utils').doc('rewardData').update({totalPerWeek: newTotalPerWeek})

    })
    
  return null;
});

exports.getClaimValueSigned = functions.region('europe-west1').https.onRequest(async(request, response) => {
  const userProfile = await db.collection('profile').doc(request.query.address).get();
  let campaignsParticipated = userProfile.participated;
  let eventsTmp = []
  let web3Instance = new Web3("")
  const claim = 0;
  if (web3Instance != undefined) {
    const rewardCtr = web3Instance.eth.Contract(rewardAddr, rewardAbi);

    rewardCtr.methods.getLastClaim(request.query.address).then((res) => {

      for (let camp of campaignsParticipated) {
        let ctrCamp = web3Instance.eth.Contract(camp, campaignAbi);

        ctrCamp.getPastEvents("Participation", {
          filter: {user: userProfile.eth_address},
          fromBlock: 'earliest'
        }).then((events) => {
            let eventsFiltered = events.filter(e => e.returnValues.timestamp > res);

            rewardCtr.methods.getStartTimestamp().then((time) => {
              claim += eventsFiltered.map((e) => {
                  let week = (e.returnValues.timestamp - time) / 604800;
                  let rate = await db.collection('utils').doc('rates').get();
                  let currentRate = 0

                  if(e.returnValues.token == "0x0000000000000000000000000000000000000000")
                    currentRate = rate.eth[week]
                  if(e.returnValues.token == "0x67c0fd5c30C39d80A7Af17409eD8074734eDAE55")
                    currentRate = rate.bbst[week]
                  if(e.returnValues.token == "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b")
                    currentRate = rate.bbst[week]

                  let data = await db.collection('utils').doc('rewardData').get();
                  let total = 0;

                  if (data.weeklySupply[week] == 0) eventsTmp.push(e.returnValues.campaign);
                  else {
                    let ratio = ((e.returnValues.amount * currentRate) / data.totalPerWeek[week]) > 0.03 ? 0.03 : ((e.returnValues.amount * currentRate) / data.totalPerWeek[week]);
                    total += ratio * data.weeklySupply[week];
                  }

                  return total;
              }).reduce((a,b) => a + b)
            })
          });
      }
    })

  } 
  
  
  
  
  
  response.send();
    

  }).catch(err => {
      console.log('Error getting document', err);
      throw new functions.https.HttpsError('Error getting document', err);
  });

import Web3 from 'web3';

export default async (req, res) => {



  
 
  if(recipient) {
    const message = Web3.utils.soliditySha3(
      {t: 'address', v: recipient.address},
      {t: 'uint256', v: recipient.totalAllocation.toString()}
    ).toString('hex');
    const web3 = new Web3('');
    const { signature } = web3.eth.accounts.sign(
      message, 
      process.env.PRIVATE_KEY
    );
    res
      .status(200)
      .json({ 
        address: req.body.address, 
        basicAllocation: recipient.basicAllocation,
        bonusAllocation: recipient.bonusAllocation,
        totalAllocation: recipient.totalAllocation,
        signature
      });
    return;
  }
  //3. otherwise, return error
  res
    .status(401)
    .json({ address: req.body.address });
}