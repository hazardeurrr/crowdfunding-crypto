import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import * as Icon from 'react-feather';
import Parser from 'html-react-parser';
import Link from '@/utils/ActiveLink'
import ProgressBar from 'react-bootstrap/ProgressBar';
import CampaignSidebar from '@/components/Blog/CampaignSidebar';
import VerifTooltip from '@/components/Common/VerifTooltip';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ChipUser from '@/components/Common/ChipUser';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import FlexibleTooltip from '@/components/Common/FlexibleTooltip';
import ShareIcons from '@/components/Common/ShareIcons';
import HeartAnim from '@/components/Common/HeartAnim';
import {getOne} from '../../../firebase-crowdfund/queries';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'

import RaisedChecker from '@/components/Common/RaisedChecker';
import { MdSentimentVerySatisfied } from 'react-icons/md';
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import Withdraw from '../../../components/Common/withdraw';
import Refund from '../../../components/Common/refund';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Custom404 from 'pages/404';
import DOMPurify from 'isomorphic-dompurify';

import { prefixedAddress } from '@/utils/prefix';
import { NoBscProviderError } from '@binance-chain/bsc-connector';
import { Avatar, Chip } from '@material-ui/core';
import WidgetComponent from '@/components/Common/Widget';

const Widget = (props) => {
    
    const [campaign, setCampaign] = React.useState(null)

    React.useEffect(() => {
 
         getOne('campaignsBNBTest', props.address, function(doc) {
           if (doc.exists) {
             setCampaign(doc.data())
             // console.log(campaign)
           } else {
               console.log("Document not found")
           }
         })
     }, [])

     const displayContent = () => {
        if(campaign){
            return <div style={{width: props.width}}>
            <WidgetComponent campaign={campaign} />
        </div> }
        else {
            return <div style={{width: props.width}}><Skeleton style={{width:'100%'}} variant='rect'/></div>
        }
     }

    return (
        displayContent()
    )
}

export default Widget



export async function getServerSideProps (context) {
//   console.log(context.query) 
  // returns { id: episode.itunes.episode, title: episode.title}
  

  //you can make DB queries using the data in context.query
  return {
      props: { 
         address: context.query.id.toLowerCase(), //pass it to the page props
         width: context.query.width ? parseInt(context.query.width) : '100%'
      }
  }
}