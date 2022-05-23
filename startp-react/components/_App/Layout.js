import React from 'react'
import Head from "next/head"
import GoTop from './GoTop'
 
const Layout = ({ children }) => {

    
  

    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Crowdfunding reinvented with BlockBoosted ! ... Join the crowdfunding revolution on Ethereum with the BlockBoosted dApp." />
                    <meta name="thumbnail" content="https://blockboosted.com/images/bb_logo_full_2.png" />
                <title>BlockBoosted - Boost your project with crypto</title>
            </Head>
            {children}

            <GoTop scrollStepInPx="100" delayInMs="10.50" />
        </>
    )
}

export default Layout