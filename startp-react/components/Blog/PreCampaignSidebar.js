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
  
  

const PreCampaignSidebar = (props) => {

    
    const campaign = props.project
    const classes = useStyles();

    const Title = () => {
        if(campaign.tiers.length != 0){
            return <h3 className="widget-title">What you get with your contribution</h3>
        }
    }

    const BackText = () => {
            return <div className="works-content">
            <h3>
                <Icon.Frown /> The creator hasn't enabled crypto donations yet.
            </h3>
        </div>
    }

    const showQtyLeft = (tier, index) => {
        // if(tier.maxClaimers != -1){
            
        //     let x = subsLength == undefined ? "X" : subsLength[index+1]
        //     return <Typography className={classes.qty} align='right'>
        //     {x} left
        //     </Typography>
        // }
    }

    const showCurrencyWoPrefix = () => {
        if(campaign.currency.includes('_'))
            return campaign.currency.substring(campaign.currency.indexOf('_') + 1);
        else
            return campaign.currency
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
                                    {BackText()}    
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
                                                {/* {showQtyLeft(tile, index)} */}
                                            </CardContent>
                                            {/* <CardActions>
                                                 <Button size="small">Learn More</Button>
                                            </CardActions> */}
                                        </Card>

                                        {BackText()}
                                </div>
                                    
                                    




                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
            </div>
        </div>
    )
}



export default PreCampaignSidebar;  