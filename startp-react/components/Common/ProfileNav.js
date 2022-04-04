import React from 'react';
import Link from '@/utils/ActiveLink'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Skeleton from '@material-ui/lab/Skeleton';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  pchip1: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize : "14px",
      fontWeight: 550
  },
  pchip2: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize : "10px",
  },
  sec:{
      lineHeight : '14.5px',
      marginTop: '2.4px'
  },

}));



const ProfileNav = (props) => {

  const classes = useStyles();

    const user = props.user

    const display = () => {
      if(user === undefined){
        return <>                          
<Skeleton variant="circle"><Avatar alt='avatar' /></Skeleton>

    </>
      } else {
        return <>
{/* <Avatar alt='avatar' src={user.image} /> */}
<Chip variant="outlined" style={{height: 40, background:"none"}} avatar={<Avatar sizes='medium' alt='avatar' src={user.image} />} label={<section className={classes.sec}>
              <div className={classes.pchip1}>{user.username.length <= 10 ? user.username : user.username.substring(0,7)+"..."}</div>
              <div className={classes.pchip2}>{user.eth_address.slice(0,6)} ... {user.eth_address.slice(user.eth_address.length - 4, user.eth_address.length)}</div>
              </section>} />
    </>
      }
    }

    return (
        display()
    )
}

export default ProfileNav