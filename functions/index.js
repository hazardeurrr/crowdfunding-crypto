const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const Web3 = require('web3');
const { user } = require("firebase-functions/v1/auth");
const db = admin.firestore();

const rewardAddr = "0x6b94019762a8516f8C9296a71BA842A50E53becE";
const rewardAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "claimer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "Claimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "Participate",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newAddress",
				"type": "address"
			}
		],
		"name": "addToAllowed",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "signature",
				"type": "bytes"
			}
		],
		"name": "claimTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentWeek",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "claimer",
				"type": "address"
			}
		],
		"name": "getLastClaim",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStartTimestamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastClaim",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "participate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "rates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rewardStartTimestamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "factoryAddress",
				"type": "address"
			}
		],
		"name": "setFactory",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "setRewardTimestamp",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newAdmin",
				"type": "address"
			}
		],
		"name": "updateAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const cors = require('cors')({ origin: true });


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


exports.updateWeeklyTotals = functions.region('europe-west1').pubsub.schedule('every monday 00:00')
  .timeZone('Europe/Paris')
  .onRun(async(context) => {
    var now = parseInt(Math.floor(Date.now() / 1000))
    const web3Instance = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/391e7c4cd5274ef8a269414b4833bade"))
    await web3Instance.eth.getBlockNumber().then(async(currentBlock) => {
		//	console.log("currentblock", currentBlock)
			await db.collection('utils').doc('lastWeeklyUpdate').get().then(async(doc1) => {
				let lastWeeklyUpdate = doc1.data()
				let lastTimeStamp = lastWeeklyUpdate.timestamp
				let lastBlockUpdated = lastWeeklyUpdate.block
				//console.log(lastWeeklyUpdate)
				const rewardCtr = new web3Instance.eth.Contract(rewardAbi, rewardAddr);
				rewardCtr.methods.getStartTimestamp().call().then(async(startTs) =>{
					// console.log("start timestamp retrieve : " + startTs)
					// console.log("now" + now)
					let midTs = (now + lastTimeStamp) / 2
					//  console.log(lastTimeStamp + " ts")
					// console.log(lastBlockUpdated + " block")
					// console.log(midTs + " mid")
					let week = lastTimeStamp == 1 ? 0 : parseInt(Math.floor((midTs - startTs) / 604800))
					console.log(" week computed =>" + week)
					await db.collection('utils').doc('rates').get().then(async(doc2) => {
						let rate = doc2.data()
						// rewardCtr.getPastEvents("Participate", ({fromBlock: lastBlockUpdated, toBlock: currentBlock - 1}))
						rewardCtr.getPastEvents("Participate", ({fromBlock: lastBlockUpdated, toBlock: currentBlock}))
						.then(async(events) => {
			//				console.log(events.length, 'events')
							let eventsFiltered = events.filter(e => e.returnValues.timestamp > lastTimeStamp)
			//				console.log(eventsFiltered.length, 'eventsFiltered')
							let mapped = eventsFiltered.map((e) => {
								let currentRate = 1
								if(e.returnValues.token == "0x0000000000000000000000000000000000000000")
									currentRate = rate.eth[week] == undefined ? 1 : rate.eth[week]
								if(e.returnValues.token == "0x67c0fd5c30C39d80A7Af17409eD8074734eDAE55")
									currentRate = rate.bbst[week] == undefined ? 3000 : rate.bbst[week]
								if(e.returnValues.token == "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b")
									currentRate = rate.usdc[week] == undefined ? 3000 * 10**12 : rate.usdc[week] * 10**12
								return e.returnValues.amount * currentRate
							})
							console.log(mapped)
							let compteur = mapped.reduce(((a,b) => a + b), 0)

							console.log(compteur, 'compteur')
			
							await db.collection('utils').doc('rewardData').get().then(doc3 => {
								let rewardData = doc3.data()
							//	console.log(rewardData)
								let newTotalPerWeek = rewardData.totalPerWeek
								if(rewardData.totalPerWeek[week] != undefined){
									newTotalPerWeek[week] = compteur
								} else {
									newTotalPerWeek.push(compteur)
								}
								db.collection('utils').doc('rewardData').update({totalPerWeek: newTotalPerWeek})
								db.collection('utils').doc('lastWeeklyUpdate').update({timestamp: now, block: currentBlock})
						});
					
			
					
						})
					})
				})
			})
		})
  return null;
});

exports.getClaimValueSigned = functions.region('europe-west1').https.onRequest((request, response) => {
  cors(request, response, () => {
  var eventsTmp = []
  const web3Instance = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/391e7c4cd5274ef8a269414b4833bade"))
  var claim = 0;
  const rewardCtr = new web3Instance.eth.Contract(rewardAbi, rewardAddr);
//	console.log(rewardCtr)
  console.log("Address gathered : " + request.query.address);
  const userAddr = request.query.address;

  console.log(userAddr)

  rewardCtr.methods.getLastClaim(userAddr).call().then((res) => {
    rewardCtr.getPastEvents("Participate", ({fromBlock: parseInt(res)}))
      .then((events) => {

		let eventsFiltered = events.filter(e => e.returnValues.user == userAddr);
        rewardCtr.methods.getStartTimestamp().call().then(async(time) => {

          const promises = eventsFiltered.map(async(e) => {

			console.log("Current event :", e.returnValues.timestamp);

			var week = parseInt(Math.floor((e.returnValues.timestamp - time) / 604800));
			var total = 0;
			await db.collection('utils').doc('rates').get().then(async(resRate) => {

				console.log("Rate crypto :", resRate);

                var currentRate = 0

                if(e.returnValues.token == "0x0000000000000000000000000000000000000000")
                  currentRate = resRate.data().eth[week] == undefined ? 1 : resRate.data().eth[week]
                if(e.returnValues.token == "0x67c0fd5c30C39d80A7Af17409eD8074734eDAE55")
                  currentRate = resRate.data().bbst[week] == undefined ? 3000 : resRate.data().bbst[week]
                if(e.returnValues.token == "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b")
                  currentRate = resRate.data().usdc[week] == undefined ? 3000 * 10**12 : resRate.data().usdc[week] * 10**12

                await db.collection('utils').doc('rewardData').get().then((data) => {

				  console.log("week :", week)

                  if (data.data().totalPerWeek[week] == 0) {
                    eventsTmp.push(e.returnValues.campaign);
                  } else {
                    var ratio = ((e.returnValues.amount * currentRate) / data.data().totalPerWeek[week]) > 0.03 ? 0.03 : ((e.returnValues.amount * currentRate) / data.data().totalPerWeek[week]);
					console.log("ratio :", ratio);
                    total += ratio * data.data().weeklySupply[week];
                    console.log("Total : " + total);
                  }

				}).catch((error) => {console.log(error)})

			}).catch((error) => {console.log(error)})

			return total;
		  })

			await Promise.all(promises).then((map) => {
				claim += map.reduce(((a,b) => a + b), 0);
			})

			console.log("Claim :", claim);

			const recipient = {
				address: userAddr,
				allocation: claim
			}

			const message = web3Instance.utils.soliditySha3(
				{t: 'address', v: recipient.address},
				{t: 'uint256', v: recipient.allocation.toString()}
			).toString('hex');

			const { signature } = web3Instance.eth.accounts.sign(
				message, 
				process.env.REACT_APP_PRIVATE_KEY
			);
		
			response.json({amount: `${recipient.allocation}`, sig: `${signature}`, message: `${message}`});
        })
	});




  }).catch((error) => {
    console.log(error);
  });

});
});
