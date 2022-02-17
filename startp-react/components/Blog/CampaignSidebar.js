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


const useStyles = makeStyles({
    root: {
      minWidth: 275,
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
  
  

const CampaignSidebar = (props) => {
    const campaign = props.project
    const classes = useStyles();

    const Title = () => {
        if(campaign.tiers.length != 0){
            return <h3 className="widget-title">What you get with your contribution</h3>
        }
    }

    const BackText = (tier) => {
        var now = Date.now() / 1000
        if(now < campaign.start_date){
            return <div className="works-content">
            <h3>
                This campaign is starting soon ! Stay tuned !
            </h3>
        </div>
        } else if(now > campaign.end_date){
            return <div className="works-content">
            <h3>
                This campaign has ended ! Thanks to all the contributors <Icon.Heart />
            </h3>
        </div>

        } else {
            if(tier.maxClaimers != -1 && tier.pending.length + tier.subscribers.length >= tier.maxClaimers){
                return <div className="works-content">
            <h3>
                Sorry, this plan is no longer available <Icon.Meh />
            </h3>
            </div>
            } else {
                return <div>
                <Link href={{
                pathname: "/Checkout/[id]",
                query: {
                    id: campaign.contract_address,
                }
            }}
            as={`/Checkout/${campaign.contract_address}`}>
            
                <a className="icon">
                    <Icon.ArrowRight />
                </a>
            </Link>

            <div className="works-content">
                <h3>
                    <Link href={{
                        pathname: "/Checkout/[id]",
                        query: {
                            id: campaign.contract_address,
                        }
                    }}
                    as={`/Checkout/${campaign.contract_address}`}>
                            <a>Back this campaign !</a>
                    </Link>
                </h3>
                <p>Support the campaign with your contribution!</p>
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
                This campaign is starting soon ! Stay tuned !
            </h3>
        </div>
        } else if(now > campaign.end_date){
            return <div className="works-content">
            <h3>
                This campaign has ended ! Thanks to all the contributors <Icon.Heart />
            </h3>
        </div>
        }
         else {
            return <div>
                <Link href={{
                pathname: "/Checkout/[id]",
                query: {
                    id: campaign.contract_address,
                }
            }}
            as={`/Checkout/${campaign.contract_address}`}>
            
                <a className="icon">
                    <Icon.ArrowRight />
                </a>
            </Link>

            <div className="works-content">
                <h3>
                    <Link href={{
                        pathname: "/Checkout/[id]",
                        query: {
                            id: campaign.contract_address,
                        }
                    }}
                    as={`/Checkout/${campaign.contract_address}`}>
                            <a>Back this campaign !</a>
                    </Link>
                </h3>
                {/* <p>Support the campaign with your contribution!</p> */}
            </div>
        </div>
        }
    }

    const showQtyLeft = (tier) => {
        if(tier.maxClaimers != -1){
            let total = tier.maxClaimers - (tier.pending.length + tier.subscribers.length)
            let x = total >= 0 ? total : 0
            return <Typography className={classes.qty} align='right'>
            {x} left
            </Typography>
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
                                            Give what you want to support this campaign
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    {BackTextFreeDonation()}    
                            </div>
                            </GridListTile>


                            {campaign.tiers.map((tile) => (
                                <GridListTile key={tile.threshold} cols={1}>

                                <div className="single-works">
                                    <Card className={classes.root} variant="outlined">
                                            <CardContent>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                {tile.threshold} {campaign.currency}
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
                                                {showQtyLeft(tile)}
                                            </CardContent>
                                            {/* <CardActions>
                                                 <Button size="small">Learn More</Button>
                                            </CardActions> */}
                                        </Card>

                                        {BackText(tile)}
                                </div>
                                    
                                    




                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
            </div>
        </div>
    )
}



export default CampaignSidebar;  