import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'
import { prefixedAddress } from '@/utils/prefix';


const useStyles = makeStyles({
    root: {
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 18,
    },
    pos: {
      marginBottom: 12,
    },
    qty: {
        marginTop: 5,
        marginBottom: 10,
        fontSize: 13,
        fontStyle: 'italic'
    }
  });
  
  

const CampaignSidebarCrea = (props) => {

    const web3Instance = useSelector((state) => state.web3Instance)
    const metamask_connected = useSelector((state) => state.metamask_connected)
    const chainID = useSelector((state) => state.chainID)
    const [subsLength, setSubsLength] = React.useState(undefined);
    const bnb_web3Instance = useSelector((state) => state.bnb_web3Instance)
    const eth_web3Instance = useSelector((state) => state.eth_web3Instance)
    const [imgURIs, setImgURIs] = React.useState(null)

    React.useEffect(() => {
        getSubsLength();
    }, [bnb_web3Instance, eth_web3Instance])
    
    const getSubsLength = async() => {
            var web3 = null
            if(campaign.network == chain){
                web3 = eth_web3Instance
            } else if (campaign.network == bnb_chain){
                web3 = bnb_web3Instance
            }
            if(web3 != undefined){
                const campCtrInstance = new web3.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
                campCtrInstance.methods.getStock().call().then(res => {
                    // console.log(res)
                    setSubsLength(res);
                })
                campCtrInstance.methods.getURIs().call().then(res => {
                    // console.log(res)
                    console.log(res)
                    setNFTImages(res)
                })
            }        
    }

    async function setNFTImages(nftURIs){
        let arr = []
        for(let i = 0 ; i < nftURIs.length ; ++i){      /// REMETTRE A 0 JSUTE POUR TEST PARCE QUE 0 = '' et pas de fichier .json pour l'instant
            let woprefix = nftURIs[i].substring(7)
            let newurl = "https://nftstorage.link/ipfs/" + woprefix
            let data = await fetch(newurl).catch(err => console.log(err))
            let json = await data.json()
            console.log(json)
            let img = json.image
            let imgwoprefix = img.substring(7)
            let imgnewurl = "https://nftstorage.link/ipfs/" + imgwoprefix
            arr.push(imgnewurl)
        }
        console.log(arr)
        setImgURIs(arr)
    }

    const campaign = props.project
    const classes = useStyles();

    const Title = () => {
        // if(campaign.tiers.length != 0){
            return <h3 className="widget-title">Select a plan to support {campaign.name}</h3>
        // }
    }

    const BackText = (tier, index) => {
        var now = Date.now() / 1000
        if(now < campaign.start_date){
            return <div className="works-content">
            <h3>
                This page is opening soon ! Stay tuned !
            </h3>
        </div>
        } else if(now > campaign.end_date){
            return <div className="works-content">
            <h3>
                This page has been closed ! Thanks to all the contributors <Icon.Heart />
            </h3>
        </div>

        } else {
            let x = subsLength == undefined ? -1 : subsLength[index+1]
            if(tier.maxClaimers != -1 && x == 0){    
                return <div className="works-content">
            <h3>
                Sorry, this plan is no longer available <Icon.Meh />
            </h3>
            </div>
            } else {
                if(!metamask_connected || chainID != campaign.network){
                    return <div className="works-content">
            <h3>
                Please connect to the right network <Icon.AlertOctagon />
            </h3>
            </div>
                } else
                return <div>
                    <Link href={{
                    pathname: "/checkout/[id]",
                    query: {
                        id: prefixedAddress(campaign.network, campaign.contract_address),
                    }
                }}
                // as={`/checkout/${campaign.contract_address}`}
                >
                
                    <a className="icon">
                        <Icon.ArrowRight />
                    </a>
                </Link>
    
                <div className="works-content">
                    <h3>
                        <Link href={{
                            pathname: "/checkout/[id]",
                            query: {
                                id: prefixedAddress(campaign.network, campaign.contract_address),
                            }
                        }}
                        // as={`/checkout/${campaign.contract_address}`}
                        >
                                <a>Tip this creator !</a>
                        </Link>
                    </h3>
                    <p>Support the creator with your contribution!</p>
                </div>
            </div>

            }
        }
    }

    const BackTextFreeDonation = () => {
        var now = Date.now() / 1000
        if(now < campaign.start_date){
            return <div className="works-content">
            <h3>
                This page is opening soon ! Stay tuned !
            </h3>
        </div>
        } else if(now > campaign.end_date){
            return <div className="works-content">
            <h3>
                This page has been closed ! Thanks to all the contributors <Icon.Heart />
            </h3>
        </div>
        }
         else {
            if(!metamask_connected || chainID != campaign.network){
                return <div className="works-content">
            <h3>
                Please connect to the right network <Icon.AlertOctagon />
            </h3>
            </div>
            } else
            return <div>
                <Link href={{
                pathname: "/checkout/[id]",
                query: {
                    id: prefixedAddress(campaign.network, campaign.contract_address),
                }
            }}
            // as={`/checkout/${campaign.contract_address}`}
            >
            
                <a className="icon">
                    <Icon.ArrowRight />
                </a>
            </Link>

            <div className="works-content">
                <h3>
                    <Link href={{
                        pathname: "/checkout/[id]",
                        query: {
                            id: prefixedAddress(campaign.network, campaign.contract_address),
                        }
                    }}
                    // as={`/checkout/${campaign.contract_address}`}
                    >
                            <a>Tip this creator !</a>
                    </Link>
                </h3>
                {/* <p>Support the campaign with your contribution!</p> */}
            </div>
        </div>
        }
    }

    const showQtyLeft = (tier, index) => {
        if(tier.maxClaimers != -1){
            
            let x = subsLength == undefined ? "X" : subsLength[index+1]
            return <Typography className={classes.qty} align='right'>
            {x} left
            </Typography>
        }
    }

    const showCurrencyWoPrefix = () => {
        if(campaign.currency.includes('_'))
            return campaign.currency.substring(campaign.currency.indexOf('_') + 1);
        else
            return campaign.currency
    }

    const showNFT = (index) => {
        console.log(index)
        if(imgURIs){
            return <><hr></hr><div style={{textAlign: 'center', marginTop: 5}}><i>Unlock exclusive NFT</i><br></br>
                <img src={imgURIs[index]} style={{marginTop: 10, maxWidth: 125, maxHeight: 125}}/>
            </div></>
        }
    }

    return (
        <div className="widget-area" id="secondary">



            <div className="widget widget_startp_posts_thumb">
                    <div className={classes.root}>

                        {Title()}
                        <GridList spacing={15} cols={1}>
                            <GridListTile style={{height:'auto'}} key={-1} cols={1}>

                                <div className="single-works">
                                    <Card className={classes.root} variant="outlined">
                                        <CardContent>
                                            <Typography variant="h5" component="h2" gutterBottom>
                                                Free donation
                                            </Typography>
                                            {/* <Typography className={classes.pos} color="textSecondary">
                                            adjective
                                            </Typography> */}
                                            <Typography variant="body2" component="p">
                                            Give what you want to support this creator
                                            </Typography>
                                            {showNFT(0)}
                                        </CardContent>
                                    </Card>
                                    {BackTextFreeDonation()}    
                            </div>
                            </GridListTile>


                            {campaign.tiers.map((tile, index) => (
                                <GridListTile style={{height:'auto'}} key={index} cols={1}>

                                <div className="single-works">
                                    <Card className={classes.root} variant="outlined">
                                            <CardContent>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                {parseFloat(tile.threshold)} {showCurrencyWoPrefix()}
                                                </Typography>
                                                <Typography variant="h5" component="h2" gutterBottom>
                                                    {tile.title}
                                                </Typography>
                                                {/* <Typography className={classes.pos} color="textSecondary">
                                                adjective
                                                </Typography> */}
                                                <Typography variant="body2" component="p">
                                                {tile.description}
                                                </Typography>
                                                {showQtyLeft(tile, index)}
                                                {showNFT(index + 1)}

                                            </CardContent>
                                            {/* <CardActions>
                                                 <Button size="small">Learn More</Button>
                                            </CardActions> */}
                                        </Card>

                                        {BackText(tile, index)}
                                </div>
                                    
                                    




                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
            </div>
        </div>
    )
}



export default CampaignSidebarCrea;  