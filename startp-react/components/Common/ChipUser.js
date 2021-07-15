import React from 'react';
import Link from '@/utils/ActiveLink'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';



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
      fontSize : "11px",
      fontStyle : "italic"
  },
  sec:{
      lineHeight : '14.5px',
      marginTop: '2.4px'
  },

}));



const ChipUser = (props) => {

  
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };


  const classes = useStyles();

    const user = props.user

    return (
        <>
            <Link href={{
              pathname: "/User/[id]",
                 query: {
                   id: user.eth_address,
                 }
               }}>
                              
              <a> <Chip avatar={<Avatar alt='avatar' src={user.image} />} label={<section className={classes.sec}>
                  <div className={classes.pchip1}>{user.username}</div>
                  <div className={classes.pchip2}>{user.eth_address}</div>
                  </section>} onClick={handleClick} />
              </a>
            </Link>
        </>
    )
}

export default ChipUser