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
  },
});

export default function SingleNFT() {
  const classes = useStyles();

  return (
    <div>
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Title"
          
          image="/images/nftexample.jpg"
          title="Title"
        />
        <CardContent style={{ paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 10, marginTop:-60, position: 'inherit',width: '100%', background:"rgba(0, 0, 0, 0.6)",}}>
          <h6 style={{fontWeight: 300, fontSize: 13, margin: 0, color:"white"}}>
            Lizard
          </h6>
            {/* <div><span>Price</span><p>10 BUSD</p></div>
            <div><span>Qty</span><p>10/100</p></div> */}
            <span style={{fontSize: 17, fontWeight: 600, color:"white"}}>10 BUSD</span>

        </CardContent>
    </CardActionArea>
    </Card>
    </div>
  );
}