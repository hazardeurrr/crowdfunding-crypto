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

export default function SingleNFT(props) {
  const classes = useStyles();

  const nft = props.nft

  const [metadata, setMetadata] = React.useState(null)

  React.useEffect(() => {
    getMetadata()
  }, [])

  const getMetadata = async() => {
    let woprefix = nft.tokenURI.substring(7)
    let newurl = "https://nftstorage.link/ipfs/" + woprefix
    let data = await fetch(newurl).catch(err => console.log(err))
    let json = await data.json()
    setMetadata(json)    
  }

  const showNFT = () => {
    if(metadata && nft){
      let img = metadata.image
      let imgwoprefix = img.substring(7)
      let imgnewurl = "https://nftstorage.link/ipfs/" + imgwoprefix
      
      return <div>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={metadata.name}
            
            image={imgnewurl}
            title={metadata.name}
          />
          {/* <CardContent style={{ paddingTop: 7,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 7, marginTop:-30, position: 'inherit',width: '100%', background:"rgba(0, 0, 0, 0.6)",}}>
            <h6 style={{fontWeight: 600, fontSize: 14, margin: 0, color:"white"}}>
              {metadata.name}
            </h6>
            <span style={{fontSize: 17, fontWeight: 600, color:"white"}}>{nft.price} Wei</span>
  
          </CardContent> */}
      </CardActionArea>
      </Card>
      </div>
    } else {
      return null
    }
  }

  return (
    showNFT()
  );
}