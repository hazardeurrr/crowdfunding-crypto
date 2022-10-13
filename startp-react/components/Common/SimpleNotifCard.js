import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { useSelector, useDispatch } from 'react-redux'


import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';

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
    marginTop: 10,
    fontStyle:'italic',
    fontWeight: 200,
  },
});


const SimpleNotifCard = (props) => {

  const closeNotif = () => {
    dispatch({
        type: 'SET_OPENNOTIF',
        id: false
    })
}

      
  const sanitizeAndParseHtml = (htmlString) => {
    console.log(htmlString)
    DOMPurify.addHook('afterSanitizeAttributes', function (node) {
      // set all elements owning target to target=_blank
      if (node.hasAttribute('target')){
        node.setAttribute('target', '_blank')
        node.setAttribute('rel', 'noopener');
      }
    });
    const cleanHtmlString = DOMPurify.sanitize(htmlString, { USE_PROFILES: { html: true }, ADD_ATTR: ['target', "campaignpath"], ADD_TAGS: ['LINK'] });
    console.log(cleanHtmlString)
    const html = parse(cleanHtmlString, {replace: ({ attribs }) => {
      if(attribs && attribs.id === 'toLinkCampaign')
        return <Link href={{pathname: "/campaigns/[id]", query:{id:attribs.campaignpath}}}><a onClick={closeNotif}><b>See it here !</b></a></Link>
    }})
    
    return html;
}

  // console.log(props)
  let notif = props.notif
  const classes = useStyles();
  let date = new Date(notif.date * 1000)

  const showText = () => {
    if(notif.read){
      return <p style={{lineHeight: 1.4}}>{sanitizeAndParseHtml(notif.text)}</p>
    } else {
      return <h6 style={{lineHeight: 1.4}}>{sanitizeAndParseHtml(notif.text)}</h6>
    }
  }

  return (
    <Card elevation={0} className={classes.root} variant="outlined">
      <div className={classes.details}>
        <CardContent>

          {showText()}

          
          <Typography className={classes.date} gutterBottom>
            {date.toLocaleString()}
          </Typography>         
        
        </CardContent>
      </div>
    </Card>
  );
}

export default SimpleNotifCard