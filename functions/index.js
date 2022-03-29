const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const Web3 = require('web3');
const { user } = require("firebase-functions/v1/auth");
const db = admin.firestore();

const rewardAddr = "0xa1732280dDa43AF062d2f58cF2118656cf993d08";
const rewardAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
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
		"name": "getBalance",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "nbClaim",
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
				"internalType": "bool",
				"name": "state",
				"type": "bool"
			}
		],
		"name": "setActive",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"outputs": [],
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


exports.updateWeeklyTotals = functions.region('europe-west1').pubsub.schedule('0 0 * * *')
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
					let week = lastTimeStamp == 1 ? 0 : parseInt(Math.floor((midTs - startTs) / 86400))
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
								currentRate = rate.eth[week] == undefined ? 3200 : rate.eth[week]
								if(e.returnValues.token == "0x67c0fd5c30C39d80A7Af17409eD8074734eDAE55")
								currentRate = rate.bbst[week] == undefined ? 1.25 : rate.bbst[week]
								if(e.returnValues.token == "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b")
								currentRate = rate.usdc[week] == undefined ? 10**12 : rate.usdc[week] * 10 ** 12
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
//   var eventsTmp = []
  const web3Instance = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/391e7c4cd5274ef8a269414b4833bade"))
  var claim = 0;
  const rewardCtr = new web3Instance.eth.Contract(rewardAbi, rewardAddr);
//	console.log(rewardCtr)
  console.log("Address gathered : " + request.query.address);
  const userAddr = request.query.address;

  rewardCtr.methods.getLastClaim(userAddr).call().then((res) => {
	  console.log(res);
    rewardCtr.getPastEvents("Participate", ({fromBlock: parseInt(res)}))
      .then((events) => {

		let eventsFiltered = events.filter(e => e.returnValues.user.toLowerCase() == userAddr.toLowerCase());

		if (eventsFiltered.length == 0) {
			// rewardCtr.methods.nbClaim(userAddr).call().then((claims) => {

			// 	console.log("Nombre de claims :", claims);
			// 	console.log("Claim :", claim);
				
			// 	const recipient = {
			// 		address: userAddr,
			// 		allocation: web3Instance.utils.toWei(claim.toString()),
			// 		nbClaims: claims
			// 	}

			// 	console.log("Alloc :", recipient.allocation);
				
			// 	const message = web3Instance.utils.soliditySha3(recipient.address,
			// 		recipient.allocation, recipient.nbClaims
			// 		).toString('hex');

			// 		console.log("Message :", message)
					
			// 	const { signature } = web3Instance.eth.accounts.sign(
			// 		message, 
			// 		process.env.REACT_APP_PRIVATE_KEY
			// 	);
					
			// 	response.json({amount: `${recipient.allocation}`, sig: `${signature}`});
			// })
			response.send("Wrong Address or no participations registered yet!");
			// throw "";
		}

		if (eventsFiltered.length != 0) {
		  rewardCtr.methods.getStartTimestamp().call().then(async(time) => {
	  
			const promises = eventsFiltered.map(async(e) => {
  
			  var week = parseInt(Math.floor((e.returnValues.timestamp - time) / 86400));
			  var ratio;
		
			  await db.collection('utils').doc('rates').get().then(async(resRate) => {
		
				
				var currentRate = 0
				
				if(e.returnValues.token == "0x0000000000000000000000000000000000000000")
				currentRate = resRate.data().eth[week] == undefined ? 3200 : resRate.data().eth[week]
				if(e.returnValues.token == "0x67c0fd5c30C39d80A7Af17409eD8074734eDAE55")
				currentRate = resRate.data().bbst[week] == undefined ? 1.25 : resRate.data().bbst[week]
				if(e.returnValues.token == "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b")
				currentRate = resRate.data().usdc[week] == undefined ? 10**12 : resRate.data().usdc[week] * 10 ** 12
				
				// console.log("Rate crypto :", currentRate);
  
				await db.collection('utils').doc('rewardData').get().then((data) => {
		
				//   console.log("week :", week)
		
				  if (data.data().totalPerWeek[week] == 0 || data.data().totalPerWeek[week] == undefined) {
					ratio = 0;
				  } else {
					ratio = (e.returnValues.amount * currentRate) / data.data().totalPerWeek[week];
					// console.log("ratio :", ratio);
				  }
		
				}).catch((error) => {console.log(error)})
		
				}).catch((error) => {console.log(error)})
  
				return [ratio, week];
			})
	  
			await Promise.all(promises).then(async(res) => {
			  // claim += map.reduce(((a,b) => a + b), 0);
  
			  if (res != undefined) {
				await db.collection('utils').doc('rewardData').get().then((data) => {
	
					var weekTmp = res[0][1];
					var cpt = 0;
					var total = 0;
					var tmpTotalWeek = 0;
		
					res.forEach((elem) => {
					cpt++;
	
					if (elem[1] != weekTmp) {
						var ratio = tmpTotalWeek > 0.03 ? 0.03 : tmpTotalWeek
						claim += ratio * data.data().weeklySupply[weekTmp];
						tmpTotalWeek = 0;
						weekTmp = elem[1];
					}

					tmpTotalWeek += elem[0];
	
					if (cpt == res.length) {
						var ratio = tmpTotalWeek > 0.03 ? 0.03 : tmpTotalWeek
						claim += ratio * data.data().weeklySupply[weekTmp];
					}
	
					})
	
					console.log("Claim :", claim);
				})

				if (claim == 0) {
					response.send("You have nothing to claim");
				}
				
				rewardCtr.methods.nbClaim(userAddr).call().then((claims) => {

					console.log("Nombre de claims :", claims);
					
					const recipient = {
						address: userAddr,
						allocation: web3Instance.utils.toWei(claim.toString()),
						nbClaims: claims
					}
					
					const message = web3Instance.utils.soliditySha3(
						{t: 'address', v: recipient.address},
						{t: 'uint256', v: recipient.allocation.toString()},
						{t: 'uint', v: recipient.nbClaims.toString()}
						).toString('hex');

						console.log("Message :", message)
						
						const { signature } = web3Instance.eth.accounts.sign(
							message, 
							process.env.REACT_APP_PRIVATE_KEY
						);
							
						response.json({amount: `${recipient.allocation}`, sig: `${signature}`});
					})
						
				}
			})
		})
	}
	
	
	
	
}).catch((error) => {
	response.sendStatus(404);
	// throw error;
});
});

});
//   });
});
