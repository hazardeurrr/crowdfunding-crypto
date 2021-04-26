import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner'; 
import * as Icon from 'react-feather';
import projectList from '@/utils/projectList'
import Parser from 'html-react-parser';
import Link from '@/utils/ActiveLink'
import ProgressBar from 'react-bootstrap/ProgressBar';
import CampaignSidebar from '@/components/Blog/CampaignSidebar';
import categoryList from '@/utils/CategoryList';
import usersListJson from '@/utils/usersListJson';
import VerifTooltip from '@/components/Common/VerifTooltip';
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
      fontSize : "14px"
  },
  pchip2: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize : "10px",
      fontStyle : "italic"
  },
  sec:{
      lineHeight : '14.5px',
      marginTop: '2.4px'
  }
}));



const ChipUser = (props) => {

  
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };


  const classes = useStyles();

    const user = props.user
    console.log("User : " + user)

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