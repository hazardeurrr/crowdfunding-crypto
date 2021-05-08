import React from 'react'
import Head from "next/head"
import GoTop from './GoTop'
import { useSelector, useDispatch } from 'react-redux'
import {getAll} from '../../firebase-crowdfund/queries';
 
const Layout = ({ children }, {c}) => {

    
    const dispatch = useDispatch()


    React.useEffect(() => {
        var campaigns = []
        getAll('campaign', (docs) => {
            docs.forEach(element => {
                campaigns.push(element.data())
            });
            changeState(campaigns)
            console.log("useEffect on layout and load all camp")
        })
    }, [c])
    
    const changeState = (campaigns) => {
        dispatch({
            type: 'SET_ALL_CAMPAIGNS',
            id: campaigns
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