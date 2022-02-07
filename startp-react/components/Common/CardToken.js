import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux'
import {chain} from '@/utils/chain'




const CardToken = () => {

  const connected = useSelector((state) => state.metamask_connected)
  const chainID = useSelector((state) => state.chainID)
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
    if(connected && address != undefined && chainID == chain){
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