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
            {/* <Navbar /> */}

            <PageBanner pageTitle="How it works" />
 
            <div className="services-details-area ptb-80">
                <div className="container">

                    <div className="row align-items-center">
                        <div className="col-lg-6 services-details-image">
                            
                        <img src="/images/bigdata-analytics/sharedGoals_crea.svg" alt="image" />
                           {/* <iframe src="https://www.youtube.com/embed/-2gl53Dnd38" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                           <iframe style={{width: '100%', aspectRatio: "16/9", marginTop: 35}} src="https://www.youtube.com/embed/5ZlpPdEHG9Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
                                                        Connecting your wallet
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                    <p>
                                                        To connect your wallet to our website, click the "Connect Wallet" button on our navigation bar & chose your provider.<br></br><br></br>

                                                        We currently support : </p><ul>
                                                            <li><p><a href="https://metamask.io/" target="_blank">Metamask</a> (recommended desktop option)</p></li>
                                                            <li><p><a href="https://walletconnect.com/" target="_blank">Wallet Connect*</a> (recommended mobile option)</p></li>
                                                            <li><p><a href="https://www.coinbase.com/fr/wallet" target="_blank">Coinbase Wallet</a></p></li>
                                                            <li><p><a href="https://www.bnbchain.org/en/binance-wallet" target="_blank">Binance Wallet</a></p></li>
                                                        </ul>
                                                        <p>*You can use Wallet Connect to connect to <a href="https://explorer.walletconnect.com/" target="_blank">+75 different compatible wallets</a> (such as Trust Wallet, Metamask (mobile)...).
                                                        <br></br><br></br>
                                                        Note that you will have to sign a message with your wallet to complete the authentication process ! Don't worry, it won't cost you anything :)
                                                    </p>
                                                    <iframe style={{width: '100%', aspectRatio: "16/9"}} src="https://www.youtube.com/embed/1vyedrpuHVw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
                                                    Otherwise, you can explore all the campaigns sorted by categories or network in our <Link href="/explore">Explore</Link> tab.
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
                                                    Select your plan and confirm the transaction with you wallet. Once the transaction is confirmed by the blockchain, it means that your donation is done !
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
                                                    As a contributor, you aren't charged any fee by the platform. But you will have to pay the gas fee of the blockchain when confirming the transaction. As BlockBoosted currently runs on BNB Smart Chain, this gas fee is negligible. Note that this is
                                                    the only fee you'll pay.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="aa">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        What are the supported networks ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    BlockBoosted only supports BNB Smart Chain at the moment.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="e">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        What is BEP20 allowance ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    In order to use BEP20 tokens on our platform, you must allow our smart contracts to access them. It's a security feature of the BEP20/ERC20 standard. You only need to do the approval
                                                    once per token.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="f">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        How do I get the rewards from a campaign I supported ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    If you contributed to a campaign chosing a plan with a reward, you will soon be contacted by the campaign's creator.
                                                    When the campaign ends, we transfer all the needed information of your profile to the creator so he can send you the relevant reward. <br></br>
                                                    <Icon.AlertTriangle/> Make sure to fill your profile (at least your email address) so the creator will be able to contact you. 
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        {/* <AccordionItem uuid="g">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        What is BBST rewards and how do I get it ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p> When you contribute to a campaign, you will also earn BBST as rewards. BBST is the token powering our ecosystem. It has value and give you power on the platform. Learn more about it and claim your due on the dedicated page <Link href="/token"><a>BBST Token</a></Link>. The amount
                                                    of BBST you'll get depends on the amount of the contributions you've made.<br></br> Each week, up to 15 000 BBST are given to the community as rewards.<br></br>
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem> */}

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

                                        <AccordionItem uuid="ac">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        How can I get funds on BNB Smart Chain ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    The easiest way to get assets on BNB Smart Chain (BSC) is to make a withdrawal of your selected currency from Binance or any other exchanges that supports BSC. <b>Make sure to select BNB Smart Chain (BSC) as selected network when you make your withdrawal !</b><br></br><br></br>
                                                    If you have assets on other chains and want to bridge them to the BSC network, please use <a href="https://www.bnbchain.org/en/bridge">the BNB Smart Chain Bridge</a><br></br><br></br>
                                                    If you already have some crypto on BSC network, you can directly use it on our platform (BNB or BUSD)
                                                    or swap it on a DEX/CEX that supports BSC to BNB or BUSD.
                                                    <br></br><br></br><Icon.AlertTriangle />&nbsp;<i>Note that you will need BNB to pay the gas fees once using the BNB Smart Chain network.</i>
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

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
                                                    - If some features are missing, make sure you are connected to our website.
                                                    <br></br>- If you are connected to your wallet, make sure you have one of our supported network selected on your wallet.
                                                    <br></br>- If none of these work, try to reload the page or open it with another browser.
                                                    <br></br>- If none of these work, you can <Link href="/contact"><a>contact our support.</a></Link>
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
                                                Be sure you have enough money in the needed currency in your wallet, as well as enough BNB to pay the gas fee for the transaction. Transactions on the blockchain can take quite a long time. The less fee you want to pay, the longer it will take to get confirmed. 
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
                                                            Connecting you wallet
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        To connect your wallet to our website, click the "Connect Wallet" button on our navigation bar & chose your provider.<br></br><br></br>

                                                        We currently support : </p><ul>
                                                            <li><p><a href="https://metamask.io/" target="_blank">Metamask</a> (recommended desktop option)</p></li>
                                                            <li><p><a href="https://walletconnect.com/" target="_blank">Wallet Connect*</a> (recommended mobile option)</p></li>
                                                            <li><p><a href="https://www.coinbase.com/fr/wallet" target="_blank">Coinbase Wallet</a></p></li>
                                                            <li><p><a href="https://www.bnbchain.org/en/binance-wallet" target="_blank">Binance Wallet</a></p></li>
                                                        </ul>
                                                        <p>*You can use Wallet Connect to connect to <a href="https://walletconnect.com/registry?type=wallet" target="_blank">+75 different compatible wallets</a> (such as Trust Wallet, Metamask (mobile)...).
                                                        <br></br><br></br>
                                                        Note that you will have to sign a message with your wallet to complete the authentication process ! Don't worry, it won't cost you anything :)
                                                    </p>
                                                    <iframe style={{width: '100%', aspectRatio: "16/9"}} src="https://www.youtube.com/embed/1vyedrpuHVw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
                                                        You can create a campaign in a few steps clicking on the "Create" button on the navigation bar. Note that you will need to be connected to access this feature. <br></br>Fill the form as you wish to customize your campaign and click on the "Create my campaign" button to submit your campaign.<br></br>
                                                        Confirm the blockchain transaction and wait for the upload of your campaign's data. Once it's done, your campaign is created ! Our team will review it to make sure it respects our <a target="_blank" href="https://blockboosted.com/terms">Terms of Use</a> (can take up to 2/3 business days). You will receive a notification on your profile once your campaign is approved.
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            <AccordionItem uuid="b22">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            What are the fees ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        None ! We don't charge any fee for this version of the platform. You can keep everything you manage to raise !
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
                                                        BlockBoosted only supports BNB Smart Chain at the moment.
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
                                                       Yes you can ! Just check the corresponding checkbox on the campaign creation form. You can have up to 5 different tiers to offer. For each tier, you can set its own price as well as its maximum amount if you want it to be limited in quantity.
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
                                                        We currently support 2 cryptocurrencies : BNB and BUSD.
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

                                            <AccordionItem uuid="h2">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            My campaign got unapproved, what can I do ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        A campaign can get unapproved if it doesn't respect our <a target="_blank" href="https://blockboosted.com/terms">Terms of Use</a>. If your campaign got unapproved by our team, you will receive a notification on your profile. If you think we made a mistake, you have up to one month to <Link href="/contact"><a>contact us</a></Link> and contest the decision.
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            {/* <AccordionItem uuid="i">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            How can my campaign be featured on the main page ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        Featured campaigns are determined by BBST holders and platforms users. When a user likes a campaign, he increases its "like score". The more BBST the user holds, the more this score increases.
                                                        The calculus is constantly made to see which campaign do BBST holders love the most. <br></br>So if you want your campaign to be featured on the main page and seen as first results, you need to
                                                        get likes from the BlockBoosted community !
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem> */}

                                            
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
                                <img src="/images/bigdata-analytics/launcher_crea.svg" alt="image" />
                                <iframe style={{width: '100%', aspectRatio: "16/9", marginTop: 35}} src="https://www.youtube.com/embed/-rMjGZBrijI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


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