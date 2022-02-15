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
  });
  
  

const CampaignSidebar = (props) => {
    const campaign = props.project
    const classes = useStyles();

    const Title = () => {
        if(campaign.tiers.length != 0){
            return <h3 className="widget-title">What you get with your contribution</h3>
        }
    }

    const BackText = () => {
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

    return (
        <div className="widget-area" id="secondary">



            <div className="widget widget_startp_posts_thumb">
                    <div className={classes.root}>

                        {Title()}
                        <GridList spacing={15} cols={1}>
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
                                            </CardContent>
                                            <CardActions>
                                                {/* <Button size="small">Learn More</Button> */}
                                            </CardActions>
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



export default CampaignSidebar;  