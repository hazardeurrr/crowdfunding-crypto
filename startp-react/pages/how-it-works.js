import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import * as Icon from 'react-feather';
import Link from 'next/link';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';




const ServiceDetails = () => {
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="How it works" />
 
            <div className="services-details-area ptb-80">
                <div className="container">
                        

                    <div className="row align-items-center">
                        <div className="col-lg-6 services-details-image">
                            
                        <img src="/images/bigdata-analytics/sharedGoals.svg" alt="image" />
                           {/* <iframe src="https://www.youtube.com/embed/-2gl53Dnd38" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                           
                        </div>
                        

                        <div className="col-lg-6 services-details">
                            <div className="services-details-desc">
                                <h3>I want to contribute to a campaign</h3>
                                <div className="services-details-accordion">
                                    <Accordion allowZeroExpanded>
                                        <AccordionItem uuid="a">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        Connecting to Metamask
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    You need the browser wallet Metamask to use our features. If you don't have it, you can download this extension at&nbsp;
                                                    <a href="https://metamask.io/"> metamask.io</a>. Once installed, click on the Connect Wallet button on the navigation bar of our site.
                                                    Enter your credentials and confirm on the Metamask popup. You're now connected with your Metamask wallet, congratulations !
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="b">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        How can I find a specific campaign ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    The easiest way to access a campaign is by searching for its name on the searchbar. You can also search its creator there by its username.
                                                    Otherwise, you can explore all the campaigns sorted by categories or network in our "Explore" tab.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="c">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        How can I contribute to a campaign ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    Once you are on the page of an active campaign, press the button "Back this campaign" to access the checkout page.<br></br>
                                                    Select your plan and confirm the transaction on the Metamask pop-up. Once the transaction is confirmed by the blockchain, it means that your donation is done !
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="d">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        What are the fees ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    As a contributor, you aren't charged any fee by the platform. But you will have to pay the gas fee of the blockchain when confirming the transaction. Note that this is
                                                    the only fee you'll pay.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="aa">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        What are the supported networks & how to change network ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    BlockBoosted supports both Ethereum & Polygon networks. You can change network on our navigation bar or directly on the Metamask tab.
                                                    You can sort campaigns by supported network on our <Link href={{
                                                        pathname: "/SearchPage/",
                                                        query: {
                                                            id: "explore",
                                                        }
                                                    }}><a>Explore</a></Link> page.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="e">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        What is ERC20 allowance ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    In order to use ERC20 tokens on our platform, you must allow our smart contracts to access them. It's a security feature of the ERC20 standard. You only need to do the approval
                                                    once per token.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="f">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        How do I get my rewards ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    If you contributed to a campaign chosing a plan with a reward, you will soon be contacted by the campaign's creator.
                                                    When the campaign ends, we transfer all the needed information of your profile to the creator so he can send you the relevant reward. <br></br>
                                                    <Icon.AlertTriangle/> Be sure to fill your profile (at least your email address) so the creator will be able to contact you. 
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="g">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        What is BBST rewards and how do I get it ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    When you contribute to a campaign, you will also earn $BBST as rewards. $BBST is the token powering our ecosystem. It has value and give you power on the platform. Learn more about it and claim your due on the dedicated page <Link href="/token"><a>BBST Token</a></Link>. The amount
                                                    of BBST you'll get depends on the amount of the contributions you've made.<br></br> Each week, up to 15 000 BBST are given to the community as rewards.<br></br>
                                                    <Icon.AlertTriangle/>Note that reward balances are updated every monday at 00:00 GMT+1.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        {/* <AccordionItem uuid="g">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        How do I get a refund ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    If the campaign set up to an "All or nothing" goal and didn't reach it, you will be able to get a refund of your contribution on the relevant campaign page.
                                                    Just click the "Refund" button and confirm on the Metamask pop-up to get your contribution back on your wallet. You have 1 year from the end of the campaign
                                                    to get a refund, otherwise the funds will be transfered to the community fund.
                                                    <br></br>In any other case, you can't get a refund of your contribution.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem> */}

                                        <AccordionItem uuid="h">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        I can't access some features
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    - If some features are missing, be sure to be connected to Metamask and be sure that it is your only browser extension that serves as an Ethereum wallet.
                                                    <br></br>- If you are connected to Metamask, be sure you have one of our supported network selected on the Metamask tab.
                                                    <br></br>- If none of these work, try to reload the page or open it with another browser.
                                                    <br></br>- If none of these work, you can <Link href="/contact-us"><a>contact our support.</a></Link>
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="i">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        I can't confirm my transaction
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                Be sure you have enough money in the needed currency in your Metamask wallet, as well as enough ETH (Ethereum network) or MATIC (Polygon network) to pay the gas fee for the transaction. Transactions on the blockchain can take quite a long time. The less fee you want to pay, the longer it will take to get confirmed. 
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="ac">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        How can I transfer funds to Polygon ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    There are two ways of transfering funds to Polygon network.
                                                    <ul>
                                                        <li>
                                                            Deposit funds on an exchange supporting Polygon (Binance, FTX...). Then withdraw to your Metamask wallet selecting Polygon as network. The exchange will basically handle the bridge for you !
                                                        </li>
                                                        <li>
                                                            Bridge tokens from Ethereum to Polygon thanks to Polygon Bridge. You can access it on our navigation bar.
                                                        </li>
                                                    </ul>
                                                    If you already have some crypto on Polygon network, you can directly use it on our platform (MATIC, USDC or BBST)
                                                    or swap it on a DEX/CEX that supports Polygon to one of our supported currencies.
                                                    <br></br><i>Note that you will need MATIC to pay the gas fees once using the Polygon network (instead of ETH for Ethereum network).</i>
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="ab">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        I used the Polygon Bridge but can't see the tokens in my wallets
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    Bridging assets between Ethereum & Polygon networks usually takes around 10 minutes. Also, make sure to import the tokens on Metamask on both networks to see the balances.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                    </Accordion>

                                    
                                </div>
                            </div>
                        </div>

                        <div className="separate"></div>

                        <div className="row align-items-center">
                            <div className="col-lg-6 services-details">
                                <div className="services-details-desc">
                                    <h3>I want to create a campaign</h3>
                                    <div className="services-details-accordion">
                                        <Accordion allowZeroExpanded>
                                            <AccordionItem uuid="a">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            Connecting to Metamask
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        You need the browser wallet Metamask to use our features. If you don't have it, you can download this extension at&nbsp;
                                                        <a href="https://metamask.io/"> metamask.io</a>. Once installed, click on the Connect Wallet button on the navigation bar of our site.
                                                        Enter your credentials and confirm on the Metamask popup. You're now connected with your Metamask wallet, congratulations !
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            <AccordionItem uuid="b">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            How can I create a campaign ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        You can create a campaign in a few steps clicking on the "Create" button on the navigation bar. You will need to be connected to Metamask to access this feature.
                                                        You can link your twitter account to your profile so that, eventually, users put more trust in your campaign. This step usually takes few minutes.
                                                        <br></br>Once it's done, you can finally access the creation page and fill the form as you wish to customize your campaign.
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            <AccordionItem uuid="b2">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            What are the supported networks ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        BlockBoosted supports Ethereum & Polygon chains. Note that your campaign can only be deployed on one chain, and will only accepts funds through that network. 
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>                                            

                                            <AccordionItem uuid="c">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            How can I customize my campaign ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        Customize your campaign page as you wish with our editor. Add title, style, images, links and videos easily to make an appealing page. You can preview your page in our editor. Note that you won't be able to change it once the campaign is created.
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            <AccordionItem uuid="d">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            Can I set rewards for my contributors ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                       Yes you can! Just check the corresponding checkbox on the campaign creation form. You can have up to 5 different tiers to offer. For each tier, you can set its own price as well as its maximum amount if you want it to be limited in quantity.
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            <AccordionItem uuid="e">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            Which currency can I raise money in ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        For campaigns on Ethereum : ETH, USDC or BBST.
                                                        <br></br>For campaigns on Polygon : MATIC, USDC or BBST.
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            <AccordionItem uuid="f">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            Will I get the funds even though the goal is not reached ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        Yes, you will have all the funds raised in your campaign at the end of it.
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            <AccordionItem uuid="g">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            How do I get the funds raised ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        Once your campaign is finished, you'll see a new button on your campaign page to do so. Just click it and confirm the transaction to get the funds unlocked to your wallet.
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            <AccordionItem uuid="h">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            How can I contact my contributors ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        Once your campaign is finished, you'll be able to download a CSV file which contains all the information needed on your contributors and their associated donation.
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            <AccordionItem uuid="i">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            How can my campaign be featured on the main page ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        Featured campaigns are determined by BBST stakers and platforms users. When a user likes a campaign, he increases its "like score". The more BBST the user stakes, the more this score increases.
                                                        The calculus is constantly made to see which campaign do BBST stakers love the most. <br></br>So if you want your campaign to be featured on the main page and seen as first results, you need to
                                                        get likes from the biggest BBST stakers. Note that you can like your own campaign.
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            
                                        </Accordion>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 services-details-image">
                                {/* <img 
                                    src="/images/services-details-image/services-details2.png" 
                                    className="animate__animated animate__fadeInUp" 
                                    alt="image" 
                                />  
                                <iframe src="https://www.youtube.com/embed/-2gl53Dnd38" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                                <img src="/images/bigdata-analytics/launcher.svg" alt="image" />

                            </div>
                        </div>

                        {/* <div className="faq-area ptb-80">
                            <div className="container">
                                <div className="faq-accordion">
                                    <h2>Frequently Asked Questions</h2>

                                    <Accordion allowZeroExpanded>
                                        <AccordionItem uuid="a">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        How do permissions work in Google Play Instant?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="b">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        Is Smart Lock required for instant apps?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="c">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        Can I have multiple activities in a single feature?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    
                                        <AccordionItem uuid="d">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        Can I share resources between features?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="e">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        Is multidex supported for instant apps?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="f">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        Can I share resources between features?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </div>


                                <div className="faq-contact">
                                    <h3>Ask Your Question</h3>
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="text" placeholder="Name" className="form-control" />
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="email" placeholder="Email" className="form-control" />
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <input type="text" placeholder="Subject" className="form-control" />
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <textarea name="message" cols="30" rows="6" placeholder="Message" className="form-control"></textarea>
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-12 col-md-12">
                                                <button className="btn btn-primary" type="submit">Submit Now!</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ServiceDetails;