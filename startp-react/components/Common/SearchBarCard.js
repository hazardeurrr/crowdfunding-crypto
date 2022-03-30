import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';



const useStyles = makeStyles({
  root: {
    width: 400,
    height: 60,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 13.5,
    marginTop: 6,
    fontWeight: 600,
  },
  creator: {
    fontStyle: 'italic',
    fontSize : 11,
  },
  creator2: {
    fontStyle: 'italic',
    fontSize : 10,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: '100%',
    width: '100%',
    flex : 1,
  },
  creator_wrapper: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center'
  }, 
  details: {
    flex: 3,
  },
  avatar: {
    height : 17,
    width : 17,
    marginLeft: 4,
    marginRight: 2,
    marginBottom: 2
  }
});

const SearchBarCard = (props) => {

  const campaign = props.campaign
  const user = props.user
  const classes = useStyles();

  const displayCreator = () => {
    if(user == undefined){
      return <Typography display="inline" className={classes.creator} color="textSecondary">
      Loading creator...
    </Typography>
    } else {
      if(user.username.length > 0){
        return  <div className={classes.creator_wrapper}>
            <Typography display="inline" className={classes.creator} color="textSecondary">
              by 
            </Typography>
            <Avatar display="inline" alt='avatar' className={classes.avatar} src={user.image} />
            <Typography display="inline" className={classes.creator} color="textSecondary">
              {user.username}
            </Typography>
        </div>
      } else {
        return <div className={classes.creator_wrapper}>
            <Typography display="inline" className={classes.creator} color="textSecondary">
              by 
            </Typography>
            <Avatar display="inline" alt='avatar' className={classes.avatar} src={user.image} />
            <Typography display="inline" className={classes.creator2} color="textSecondary">
              {user.eth_address}
            </Typography>       
        </div>
      }
    }
  }

  return (
    <Card elevation={0} className={classes.root}>
       <CardMedia
        className={classes.media}
        image={campaign.main_img}
      />
      <div className={classes.details}>
        <CardContent>

          <Typography className={classes.title} variant="h5" component="h2" gutterBottom>
            {campaign.title}
          </Typography>
          {displayCreator()}

          
        
        </CardContent>
      </div>
    </Card>
  );
}

export default SearchBarCard