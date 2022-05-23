import React from 'react'
import Head from "next/head"
import GoTop from './GoTop'
 
const Layout = ({ children }) => {

    
  

    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="BlockBoosted is an innovative web3 crowdfunding platform. Raise & donate in crypto with 0% fee, get rewarded in BBST." />
                <title>BlockBoosted - Boost your project with crypto</title>
            </Head>
            {children}

            <GoTop scrollStepInPx="100" delayInMs="10.50" />
        </>
    )
}

export default Layout