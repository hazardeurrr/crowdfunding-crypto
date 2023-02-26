import React from 'react'
import Head from "next/head"
import GoTop from './GoTop'
import { useSelector, useDispatch } from 'react-redux'
import {getAll, getOne} from '../../firebase-crowdfund/queries';
import {db} from '../../firebase-crowdfund/index'
import Navbar from './Navbar';
import Footer from './Footer';
// import router from 'next/router';
import { useRouter } from 'next/router'
import { campaignsCollection } from '@/utils/collections';

const Layout = ({ children }) => {

    
    const dispatch = useDispatch()
    const router = useRouter()


    React.useEffect(() => {
        var campaigns = []


        db.collection(campaignsCollection).where("confirmed", "==", true).limit(6)
        .get()
        .then((docs) => {
            docs.forEach(element => {

                    campaigns.push(element.data())
                
                    
            })

            if(docs.docs.length > 0){
                dispatch({
                    type: 'SET_LAST_FIRST_DOC',
                    id: docs.docs[docs.docs.length-1]
                })
              }

            changeState(campaigns)

        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }, [])
    
    const changeState = (campaigns) => {
        // console.log(campaigns)
        dispatch({
            type: 'SET_FIRST_CAMPAIGNS',
            id: campaigns
        })
    }

    const changeUserState = (creators) => {
        dispatch({
            type: 'SET_ALL_CREATORS',
            id: creators
        })
    }

    const showNavBar = () => {
        // if(router.pathname !='/campaigns/widget/[id]')  {
            return (
              <Navbar />
            )
        // }
    }

    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>BlockBoosted Tip - Tip your favorite content creators with crypto</title>
                <meta name="description" content="BlockBoosted Tip · Create your page and enhance the power of community · Get tips in crypto · Rewards and exclusive NFTs for your community · Crypto crowdfunding" />

            </Head>
            {showNavBar()}
            {children}

            <GoTop scrollStepInPx="100" delayInMs="10.50" />
        </>
    )
}

export default Layout