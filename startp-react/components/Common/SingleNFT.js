import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
});

export default function SingleNFT() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="NFT"
          
          image="/images/nftexample.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            Lizard
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
          <div style={{justifyContent:"space-between", display:'flex'}}>
            <div><span>Price</span><p>10 BUSD</p></div>
            <div><span>Qty</span><p>10/100</p></div>
          </div>

        </CardContent>
    </CardActionArea>
      {/* <CardActions>
        <Button size="small">
          Share
        </Button>
        <Button size="small">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}