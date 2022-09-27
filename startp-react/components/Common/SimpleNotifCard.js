import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';



const useStyles = makeStyles({
  
  root: {
    marginTop: 15, 
    marginBottom: 15
  },
  text: {
    fontSize: 15,
    marginTop: 3,
    fontWeight: 600,
    color:"black"
  },
  textRead: {
    fontSize: 15,
    marginTop: 3,
    fontWeight: 200,
    color:"black"
  },
  date: {
    fontSize: 10,
    marginTop: 3,
    fontStyle:'italic',
    fontWeight: 200,
  },
});


const SimpleNotifCard = (props) => {

  // console.log(props)
  let notif = props.notif
  const classes = useStyles();
  let date = new Date(notif.date * 1000)

  const showText = () => {
    if(notif.read){
      return <Typography className={classes.textRead} gutterBottom>
      {notif.text}
    </Typography>  
    } else {
      return <Typography className={classes.text} gutterBottom>
      {notif.text}
    </Typography>  
    }
  }

  return (
    <Card elevation={0} className={classes.root} variant="outlined">
      <div className={classes.details}>
        <CardContent>

          {showText()}

          
          <Typography className={classes.date} gutterBottom>
            {date.toString()}
          </Typography>         
        
        </CardContent>
      </div>
    </Card>
  );
}

export default SimpleNotifCard