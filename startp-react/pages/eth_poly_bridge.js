import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import ServicesArea from "@/components/Landing/ServicesArea";
import * as Icon from 'react-feather';
import {bbstAddr} from '@/components/ContractRelated/BbstAddr'
import {poly_bbstAddr} from '@/components/ContractRelated/poly_BbstAddr'
import { Widget } from '@maticnetwork/wallet-widget'

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';
import CardToken from '@/components/Common/CardToken';
import MintToken from '@/components/Common/MintToken';

const EthPolyBridge = () => {
    

    const addToMetamaskETH = () => {
        {
            ethereum
            .request({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC20',
                options: {
                  address: bbstAddr,
                  symbol: 'BBST',
                  decimals: 18,
                  image: "https://firebasestorage.googleapis.com/v0/b/crowdfunding-dev-5f802.appspot.com/o/gradlogowhite.png?alt=media&token=2e6382a3-5cec-4cfc-baaf-e4b2400cdbbe",
                },
              },
            })
        }
    }

    const addToMetamaskPolygon = () => {
        {
            ethereum
            .request({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC20',
                options: {
                  address: poly_bbstAddr,
                  symbol: 'BBST',
                  decimals: 18,
                  image: "https://firebasestorage.googleapis.com/v0/b/crowdfunding-dev-5f802.appspot.com/o/gradlogowhite.png?alt=media&token=2e6382a3-5cec-4cfc-baaf-e4b2400cdbbe",
                },
              },
            })
        }
    }

    const widget = new Widget({
        target: '',
        appName: 'Polygon-Ethereum_Bridge',
        autoShowTime: 0,
        position: 'center',
        height: 630,
        width: 540,
        overlay: false,
        network: 'testnet',
        closable: true,
      });
    

    const showWidget = () => {
    }

    React.useEffect(() => {
        widget.create()
        widget.show()

    }, [])

    return (
        <>
            <Navbar />

            <PageBanner pageTitle="BBST Token" />
            
            {/* <div style={{margin: '0 auto', textAlign: 'center'}}>
                <form>
                    <div style={{margin: '0 auto', display: 'inline-flex'}}>
                        <input type="text" placeholder="ETH Address" className="form-control" id="eth_address" style={{ margin: "10px", width: "30%"}}/>
                        <button className="btn btn-primary" type="submit" style={{width: "inherit", padding: 0}}>Claim Airdrop!</button>
                    </div>
                </form>
            </div> */}



                <div className="features-area pt-80 bg-f7fafd" style={{marginTop: -100}}>
                    <div className="container">
                        <div className="section-title">
                            <h2 className="search-page-title">Mint Test BBST (Goerli network)</h2>
                            <div className="bar"></div>
                            <p>Test BBST can be used on our test platform (Goerli network). Feel free to mint some to try our platform !</p>
                            <MintToken style={{marginTop: 80}}/>
                            <button style={{marginTop: 25}} className="btn btn-secondary" onClick={() => addToMetamaskETH()}>Add BBST to Metamask (ETH)</button>
                            <button style={{marginTop: 25}} className="btn btn-secondary" onClick={() => addToMetamaskPolygon()}>Add BBST to Metamask (Polygon)</button>

                        </div>
                    </div>
                </div>

           <div className="features-area pt-80 bg-f7fafd">
                    <div className="container">
                        <div className="section-title">
                            <h2 className="search-page-title">Claim your tokens</h2>
                            <div className="bar"></div>
                            <p>Contribute to campaigns to earn BBST.</p>
                            <p><Icon.AlertTriangle />During Alpha period, rewards are distributed every day instead of every week for test purposes.</p>
                            <CardToken style={{marginTop: 80}}/>
                            <button style={{marginTop: 25}} className="btn btn-secondary" onClick={() => addToMetamask()}>Add BBST to Metamask</button>
                        </div>
                    </div>
                </div>

            <div className="services-details-area ptb-80">
                <div className="container">

                        {/* {showWidget()} */}

                        <div className="row align-items-center">
                        <div className="col-lg-6 services-details-image">
                            <img 
                                src="/images/bigdata-analytics/investing.svg" 
                                // className="animate__animated animate__fadeInUp" 
                                alt="image" 
                            />
                        </div>


                        <div className="col-lg-6 services-details">
                            <div className="services-details-desc">
                                <h3>All you need to know about $BBST</h3>
                                <div className="services-details-accordion">
                                    <Accordion allowZeroExpanded preExpanded={['a']}>
                                        <AccordionItem uuid="a">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        What is $BBST ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    $BBST is an ERC-20 token at the heart of the BlockBoosted ecosystem. <br></br>
                                                    Our goal is to make $BBST a cryptocurrency standard in the crowdfunding world.<br></br>
                                                    Holding and using $BBST on our platform provides you several advantages explained above.<br></br>
                                                    We plan to give more and more power to the $BBST holders over time.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="b">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        How can I buy $BBST
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    We will be launching the $BBST token publicly soon. Follow us on social media to keep informed about it.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="c">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                        What are $BBST rewards ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    When you participate to a crowdfunding campaign on our platform, you become eligible for $BBST rewards.<br></br>
                                                    It acts as an incentive and rewards you for using the protocol.<br></br>
                                                    Every week, up to 15 000 $BBST will be distributed to the donators depending on the amount they donated. Note that each address will be limited to a certain amount of rewards per week to prevent abuse.<br></br>
                                                    This ensures a fair distribution with a bonus for the most involved users. <br></br>
                                                    A total of 9.2M $BBST will be distributed in rewards to the platform users over the years.<br></br>
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                        <AccordionItem uuid="d">
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>
                                                       How can I claim my $BBST rewards ?
                                                    </span>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    You can claim your $BBST rewards on top of this page.<br></br>
                                                    Every monday at 00:00 GMT+1, distribution occurs and balances are updated.<br></br>
                                                    Connect to Metamask, click on the "Claim" button, and you'll see your $BBST in your wallet once the transaction is confirmed !<br></br>
                                                    <i>Note that you may need to import BBST to Metamask to be able to see your balance properly</i>
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

export default EthPolyBridge;