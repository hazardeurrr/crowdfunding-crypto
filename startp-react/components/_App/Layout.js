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


        db.collection('campaign').where("confirmed", "==", true)
        .get()
        .then((docs) => {
            docs.forEach(element => {

                campaigns.push(element.data())

                getOne('profile', element.data().creator.toLowerCase(), function(doc) {
                    if (doc.exists) {
                        creators.push(doc.data())
                    }
                });
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
                <title>BlockBoosted - Boost your project with crypto</title>
            </Head>
            {children}

            <GoTop scrollStepInPx="100" delayInMs="10.50" />
        </>
    )
}

export default Layout