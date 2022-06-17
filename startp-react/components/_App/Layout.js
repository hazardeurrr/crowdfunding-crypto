import React from 'react'
import Head from "next/head"
import GoTop from './GoTop'
 
const Layout = ({ children }) => {

    
  

    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>BlockBoosted - The crypto crowdfunding platform</title>
                <meta name="description" content="BlockBoosted · Crypto crowdfunding platform · Raise & donate in crypto with 0% fee · Get rewarded in BBST · Discover & support ambitious projects" />
                <meta name="robots" content="noimageindex" />


            </Head>
            {children}

            <GoTop scrollStepInPx="100" delayInMs="10.50" />
        </>
    )
}

export default Layout