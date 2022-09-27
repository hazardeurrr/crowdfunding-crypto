import React from 'react';
import Link from '@/utils/ActiveLink'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import VerifTooltip from './VerifTooltip';



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
      fontSize : "9px",
      fontStyle : "italic"
  },
  sec:{
      lineHeight : '14.5px',
      marginTop: '2.4px',
      width: '100%'
  },
  secVerif:{
    lineHeight : '14.5px',
    marginTop: '2.4px',
    width: '88%'
},

}));



const ChipUser = (props) => {

  const classes = useStyles();

  const user = props.user

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const displaySection = () => {
    if(user.verified){
      return <section className={classes.secVerif}>
      <div className={classes.pchip1}>{user.username}</div>
      <div className={classes.pchip2}>{user.eth_address}</div>
    </section>
    } else {
        return <section className={classes.sec}>
        <div className={classes.pchip1}>{user.username}</div>
        <div className={classes.pchip2}>{user.eth_address}</div>
      </section>
    }

  }



    const display = () => {
      if(user === undefined){
        return <>                          
          <a className='chipusersmall'> <Chip className='chipusersmall' avatar={<Avatar alt='avatar' />} label={<section className={classes.sec}>
              <div className={classes.pchip1}>Loading...</div>
              <div className={classes.pchip2}>Loading...</div>
              </section>} />
          </a>
    </>
      } else {
        return <>
        <Link href={{
          pathname: "/user/[id]",
             query: {
               id: user.eth_address,
             }
           }}>
                          
          <a className='chipusersmall'> <Chip className='chipusersmall' avatar={<Avatar alt='avatar' src={user.image} />} label={<div style={{display:"flex", alignItems:'center'}}>{displaySection()}<VerifTooltip fontSize={15} marginLeft={5} toBeChecked={user.verified}/></div>} onClick={handleClick} />
          </a>
        </Link>
    </>
      }
    }

    return (
        display()
    )
}

export default ChipUser