import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChipUser from './ChipUser';
import usersListJson from '@/utils/usersListJson';
import { useSelector, useDispatch } from 'react-redux'




const CardToken = () => {

  const connected = useSelector((state) => state.metamask_connected)
  const address = useSelector((state) => state.address)
  const bbstbal = useSelector((state) => state.bbstBalance)

  const claimTokens = () => {
    console.log("tokens claimed")
    // logic to claim the tokens
  }

  const showBalance = () => {
    return bbstbal
  }

  const showToBeClaimed = () => {
    return "22.14"
  }

  const displayCardContent = () => {
    if(connected && address != undefined){
      return     <Card elevation={3} style={{marginTop: 50, borderRadius: 10}}>
      <div style={{display:'flex', alignItems:'center'}}>
        <div style={{flex : 2}}>
          <CardContent>

            <Typography  variant='subtitle1' color="textSecondary" gutterBottom>
               Current balance
            </Typography>
            
              <Typography display="inline" component="h5" variant="h5" >
              {showBalance()} BBST
              </Typography>
          </CardContent>
        </div>

        <div style={{flex : 2}}>
          <CardContent>

          <Typography variant='subtitle1' color="textSecondary" gutterBottom>
              Available for claim
            </Typography>
            
            <Typography display="inline" component="h5" variant="h5">
                {showToBeClaimed()} BBST
              </Typography>
          </CardContent>
        </div>

        <div style={{flex : 2}}>
          <CardActionArea>
              <a className="btn btn-primary" onClick={() => claimTokens()}>Claim</a>
          </CardActionArea>
        </div>

      
      </div>
       


    </Card>
    } else {
      return   <Card elevation={3} style={{marginTop: 50, height: 100, borderRadius: 10, alignItems:'center', justifyContent:'center'}}>
        <div>
          <CardContent>
          <Typography component="h5" variant="h5" color="textSecondary">
            Connect to Metamask <br></br>to claim your tokens
          </Typography>
          </CardContent>
          </div>

    </Card>
    }
  }

  return (
    displayCardContent()
  );
}

export default CardToken