import React from 'react'
import Head from "next/head"
import GoTop from './GoTop'
import { useSelector, useDispatch } from 'react-redux'
import {getAll, getOne} from '../../firebase-crowdfund/queries';
import {db} from '../../firebase-crowdfund/index'

const Layout = ({ children }, {c, crea}) => {

    
    const dispatch = useDispatch()


    React.useEffect(() => {
        var campaigns = []
        var creators = []


        db.collection('campaignsBNB').where("confirmed", "==", true)
        .get()
        .then((docs) => {
            docs.forEach(element => {

                campaigns.push(element.data())

                // getOne('profile', element.data().creator.toLowerCase(), function(doc) {
                //     if (doc.exists) {
                //         creators.push(doc.data())
                //     }
                // });

                db.collection('profile').doc(element.data().creator.toLowerCase()).get().then((doc) => {
                    if (doc.exists) {
                        creators.push(doc.data())
                    }
                }).catch((err) => {
                    console.log(err);
                })

                changeUserState(creators)

                changeState(campaigns);
            })
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [c, crea])
    
    const changeState = (campaigns) => {
        dispatch({
            type: 'SET_ALL_CAMPAIGNS',
            id: campaigns
        })
    }

    const changeUserState = (creators) => {
        dispatch({
            type: 'SET_ALL_CREATORS',
            id: creators
        })
    }

    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>BlockBoosted App - Boost your project with crypto</title>
                <meta name="description" content="BlockBoosted App · Create your campaign and start raising funds in crypto · Get rewarded in BBST for your donations · Support projects that make sense with 0% fee · Crypto crowdfunding" />

            </Head>
            {children}

            <GoTop scrollStepInPx="100" delayInMs="10.50" />
        </>
    )
}

export default Layout