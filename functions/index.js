const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const Web3 = require('web3');
const { user } = require("firebase-functions/v1/auth");
const db = admin.firestore();
const { recoverPersonalSignature } = require("@metamask/eth-sig-util");

const cors = require('cors')({ origin: true });


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


// IMPORTANT : SET STARTTIMESTAMP ON CONTRACT TO MONDAY 00:00 (BEGINNING OF THE WEEK OF DEPLOYMENT)

exports.getNonceToSign = functions.region('europe-west1').https.onRequest((request, response) =>
  cors(request, response, async () => {
    try {
      if (request.method !== 'POST') {
        return response.sendStatus(403);
      }

      if (!request.body.address) {
        return response.sendStatus(400);
      }

      // Get the user document for that address
      const userDoc = await db
        .collection('users')
        .doc(request.body.address)
        .get();

      if (userDoc.exists) {
        // The user document exists already, so just return the nonce
        const existingNonce = userDoc.data().nonce;

		console.log("existing nonce", existingNonce)
        return response.status(200).json({ message: "Welcome to BlockBoosted!\nClick to sign in and accept the Terms and Conditions of BlockBoosted." + 
		"\nThis request will not trigger a blockchain transaction or cost any gas fees." + 
		"\nNonce:\n" + existingNonce });
      } else {
        // The user document does not exist, create it first
        const generatedNonce = randomString(32);

		console.log("generated nonce", generatedNonce);

        // Create an Auth user
        const createdUser = await admin.auth().createUser({
          uid: request.body.address,
        });

        // Associate the nonce with that user
        await db.collection('users').doc(createdUser.uid).set({
          nonce: generatedNonce,
        });

        return response.status(200).json({ message: "Welcome to BlockBoosted!\nClick to sign in and accept the Terms and Conditions of BlockBoosted." + 
		"\nThis request will not trigger a blockchain transaction or cost any gas fees." + 
		"\nNonce:\n" + generatedNonce });
      }
    } catch (err) {
      console.log(err);
      return response.sendStatus(500);
    }
  })
);

var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


exports.verifySignedMessage = functions.region('europe-west1').https.onRequest((request, response) =>
  cors(request, response, async () => {
	try {
		if (request.method !== 'POST') {
		return response.sendStatus(403);
		}

		if (!request.body.address || !request.body.signature) {
		return response.sendStatus(400);
		}

		const address = request.body.address;
		const sig = request.body.signature;

		console.log("sig from request :", sig);

		// Get the nonce for this address
		const userDocRef = db.collection('users').doc(address);
		const userDoc = await userDocRef.get();

		if (userDoc.exists) {
		const existingNonce = userDoc.data().nonce;

		console.log("existing nonce", existingNonce);

		const message = "Welcome to BlockBoosted!\nClick to sign in and accept the Terms and Conditions of BlockBoosted." + 
		"\nThis request will not trigger a blockchain transaction or cost any gas fees." + 
		"\nNonce:\n" + existingNonce;

		// Recover the address of the account used to create the given Ethereum signature.
		const recoveredAddress = recoverPersonalSignature({
			data: `0x${toHex(message)}`,
			signature: sig,
		});

        console.log("recov", recoveredAddress)
        console.log("acutal address", address);

		// See if that matches the address the user is claiming the signature is from
		if (recoveredAddress === address) {
			// The signature was verified - update the nonce to prevent replay attacks
			// update nonce
			await userDocRef.update({
				nonce: randomString(32),
			});

			console.log("recovered address", recoveredAddress);

			// Create a custom token for the specified address
			const firebaseToken = await admin.auth().createCustomToken(address);

			// Return the token
			return response.status(200).json({ token: firebaseToken });
		} else {
			// The signature could not be verified
			console.log("signature cannot be verified");
			return response.sendStatus(401);
		}
		} else {
		console.log('user doc does not exist');
		return response.sendStatus(500);
		}
	} catch (err) {
		console.log(err);
		return response.sendStatus(500);
	}
  })
);

const toHex = (str) => {
	// var arr = [];
	// for (var i = 0; i < str.length; i++) {
	// 	arr[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
	// }
	// return "\\u" + arr.join("\\u");

	//converting string into buffer
	let bufStr = Buffer.from(str, 'utf8');

	//with buffer, you can convert it into hex with following code
		return bufStr.toString('hex');
}


exports.getEmails = functions.region('europe-west1').https.onRequest((request, response) =>
  cors(request, response, async () => {
	try {
		if (request.method !== 'POST') {
		return response.sendStatus(403);
		}

		if (!request.body.addresses || !request.body.sorted || !request.body.camp) {
		return response.sendStatus(400);
		}

		const addressesArr = request.body.addresses;
		const subSorted = request.body.sorted;
        const campaign = request.body.camp;

		// const getUser = subscriber => db.collection('profileTest').doc(subscriber).collection("privacy").doc(subscriber).get();

		// const promises = addressesArr.map(getUser);
    	// const users = await Promise.all(promises);

    	// users.map((user, index) => user.id + "," + nullOrMail(user.data().email) + "," + showTierExcel(subSorted[index][1], campaign) + "\n")
        
        getTokens(addressesArr, subSorted, campaign).then((res) => {
			
			let finalString = "Address,Email,Participation\n"
	
			console.log(res)
			for(let i = 0 ; i < res.length ; ++i){
				
				finalString += res[i]
			}
			console.log(finalString)
	
			let csvContent = "data:text/csv;charset=utf-8," + finalString;

			return response.status(200).json({ content: csvContent });			
		}).catch(console.log);


	} catch (err) {
		console.log(err);
		return response.sendStatus(500);
	}
  })
);

async function getTokens(addressesArr, subSorted, campaign) {
    const getUser = subscriber => db.collection('profile').doc(subscriber).collection("privacy").doc(subscriber).get();

    const promises = addressesArr.map(getUser);
    const users = await Promise.all(promises);

    return users.map((user, index) => user.id + "," + nullOrMail(user.data().email) + "," + showTierExcel(subSorted[index][1], campaign) + "\n")
}

const showTierExcel = (index, camp) => {
    if (index == 0) return "Free donation"
    else return "Tier " + index + " : " + camp.tiers[index-1].title
}

const nullOrMail = (v) => {
	if(v == undefined || v == null || v == ""){
		return "undefined"
	} else {
		return v
	}
}

exports.updateNotifsCrea = functions.region('europe-west1').firestore.document('campaignsBNB/{campID}')
	.onUpdate(async(change, context) => {
		// Get an object representing the document
		// e.g. {'name': 'Marie', 'age': 66}
		const newValue = change.after.data();

		// access a particular field as you would any JS property
		const confirmation = newValue.confirmed;
		const addrCrea = newValue.creator;
		let ts = parseInt(Math.round(Date.now() / 1000));

		const network = newValue.network;
		const addrCamp = newValue.contract_address;
		const name = newValue.title;

		let strNetw = "";

		switch (network) {
			case "0x61":
				strNetw = "bnb";
				break;
			default:
				break;
		}

		const creaRef = db.collection('profile').doc(addrCrea).collection("privacy").doc(addrCrea);

		// perform desired operations ...
		if (confirmation) {
			const notif = {date:ts, text:`Your campaign <i>${name}</i> has been approved ! <a href="/campaigns/${strNetw}_${addrCamp}">
				<b>See it here</b></a>`, read:false};
			const req = await creaRef.update({
				notifications: admin.firestore.FieldValue.arrayUnion(notif)
			})
			
			// req.then((res) => {
			// 	console.log("update succesfull");
			// 	console.log(res)
			// }).catch(console.log)
		} else {
			const notif = {date:ts, text:"Your campaign has been rejected. It doesn't follow the rules of our platform.", read:false}
			const req = await creaRef.update({
				notifications: admin.firestore.FieldValue.arrayUnion(notif)
			})
			
			// req.then((res) => {
			// 	console.log("update succesfull");
			// 	console.log(res)
			// }).catch(console.log)
		}
	}
);
