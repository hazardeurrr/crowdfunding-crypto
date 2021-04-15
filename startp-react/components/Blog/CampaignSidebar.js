import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
import ProgressBar from 'react-bootstrap/ProgressBar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
    return (
        <div className="widget-area" id="secondary">

            <div className="widget widget_startp_posts_thumb">
                <h3 className="widget-title">What you get with your contribution</h3>
                    <div className={classes.root}>
                        <GridList spacing={15} cols={1}>
                            {campaign.tiers.map((tile) => (
                                <GridListTile key={tile} cols={1}>
                                    
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




                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
            </div>
        </div>
    )
}



export default CampaignSidebar;  