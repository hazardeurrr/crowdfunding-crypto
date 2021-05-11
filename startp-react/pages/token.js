import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import ServicesArea from "@/components/Landing/ServicesArea";

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';




const TokenDetails = () => {
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Our Token" />
            
            <div style={{margin: '0 auto', textAlign: 'center'}}>
                <form>
                    <div style={{margin: '0 auto', display: 'inline-flex'}}>
                        <input type="text" placeholder="ETH Address" className="form-control" id="eth_address" style={{ margin: "10px", width: "30%"}}/>
                        <button className="btn btn-primary" type="submit" style={{width: "inherit", padding: 0}}>Claim Airdrop!</button>
                    </div>
                </form>
            </div>

            <div className="services-details-area ptb-80">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 services-details">
                            <div className="services-details-desc">
                                <h3>Our vision with the BBST token</h3>
                                <p>We think of this token as a way to support both the campaign creators and the protocol itself, we want to give governance to the hodler</p>
                                <p>The token will reflect the team's effort to ensure that everyone can become a campaign creator and that everyone can invest in any project they want</p>
                                <p></p>
                            </div>
                        </div>

                        <div className="col-lg-6 services-details-image">
                            <img 
                                src="/images/services-details-image/services-details1.png" 
                                className="animate__animated animate__fadeInUp" 
                                alt="image" 
                            />
                        </div>
                    </div>
                    <ServicesArea />

                    <div className="separate"></div>

                    <div className="row align-items-center">
                        <div className="col-lg-6 services-details-image">
                            <img 
                                src="/images/services-details-image/services-details2.png" 
                                className="animate__animated animate__fadeInUp" 
                                alt="image" 
                            />
                        </div>

                        <div className="col-lg-6 services-details">
                            <div className="services-details-desc">
                                <h3>I want to create a campaign</h3>
                                <div className="services-details-accordion">
                                    <Accordion allowZeroExpanded preExpanded={['a']}>
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
                                                    You need Metamask to use our features. If you don't have it, you can download this browser wallet extension at  
                                                    <a href="https://metamask.io/"> metamask.io</a>. Once you have the extension installed, click on the Login button on the navigation bar of our site.
                                                    Click "Connect to Metamask", enter your credentials and confirm on the Metamask pop up. You're now connected with your wallet, congratulations !
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="b">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        How do I create a campaign ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    You can create a campaign easily on our main page or using the link to do so in the navigation bar.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="c">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        Can I set rewards tiers for my contributors ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    Yes you can ! Set up to 5 reward tiers when you create your campaign, and you'll be able to get the list of each contributor with its contribution at the end of the campaign!
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
                                                    We do not charge any fee for premium creators, i.e. creators staking 50000CWD or more.
                                                    Otherwise, we will take only a 1% cut on the total amount raised at the end of the campaign.
                                                    Note that there is no processing fees. Since we use the Ethereum blockchain, there will only be a small gas cost paid in ETH when creating and interacting with the contract.
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
                                    <h3>I want to contribute to a campaign</h3>
                                    <p>Thanks for supporting creators and entrepreneurs in their project !</p>
                                    <div className="services-details-accordion">
                                        <Accordion allowZeroExpanded preExpanded={['a']}>
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
                                                        You need Metamask to use our features. If you don't have it, you can download this browser wallet extension at  
                                                        <a href="https://metamask.io/">metamask.io</a>. Once you have the extension installed, click on the Login button on the navigation bar of our site.
                                                        Click "Connect to Metamask", enter your credentials and confirm on the Metamask pop up. You're now connected with your wallet, congratulations !
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            <AccordionItem uuid="b">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            How can I see the campaigns ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        You can see all the campaigns on the "Explore" tab on the navigation bar. You can then filter them depending on their domain.
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>

                                            <AccordionItem uuid="c">
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <span>
                                                            How to make a contribution ?
                                                        </span>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        Once you are on a campaign's page, just click the "Back a campaign" button to make your contribution. A metamask pop up will open, confirm the amount you wish to give and adjust the gas costs to your convenience, then confirm.
                                                        It's done !
                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 services-details-image">
                                <img 
                                    src="/images/services-details-image/services-details2.png" 
                                    className="animate__animated animate__fadeInUp" 
                                    alt="image" 
                                />
                            </div>
                        </div>

                        <div className="faq-area ptb-80">
                            <div className="container">
                                <div className="faq-accordion">
                                    <Accordion allowZeroExpanded preExpanded={['a']}>
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

                            </div>
                        </div>
 
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default TokenDetails;