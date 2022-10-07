import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';


import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import fr from '../../public/locales/fr/translation'
import en from '../../public/locales/en/translation'
import {useRouter} from 'next/router'

const Roadmap = () => {

    const router = useRouter()
    const  {locale} = router
    const t = locale === 'en' ? en : fr

    const currentYear = new Date().getFullYear();

    return (
      <div id="roadmap bg-f7fafd">
        <div className="features-area pt-80 pb-30">
          <div className="container">
            <div className="section-title">
                <h2>{t.roadmapTitle}</h2>
                <div className="bar"></div>
            </div>
          </div>
        </div>
          

        <Timeline align="alternate">
        <TimelineItem>
            <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
                Q2 2021
            </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot>
        
            </TimelineDot>
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
            <div  style={{padding: '10px', width: '-moz-fit-content', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                {t.project}
                </Typography>
                <Typography>{t.projectConcept}</Typography>
            </div>
            </TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary" >
                Q3 2021
            </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot>
        
            </TimelineDot>
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
            <div style={{padding: '10px', width: '-moz-fit-content',display: 'inline-block', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                    {t.dvpt}
                </Typography>
                <Typography>{t.dvpt2}</Typography>
            </div>
            </TimelineContent>
        </TimelineItem>



        <TimelineItem>
        <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
                Q1 2022
            </Typography>
            
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot >
        
            </TimelineDot>
            <TimelineConnector  />
            </TimelineSeparator>
            <TimelineContent>
            <div  style={{padding: '10px', width: '-moz-fit-content', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                Alpha v0.1
                </Typography>
                <Typography>{t.alpha}</Typography>

            </div>
            </TimelineContent>
        </TimelineItem>

        
        <TimelineItem>
        <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
                Q3 2022
            </Typography>
            
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot >
        
            </TimelineDot>
            <TimelineConnector  />
            </TimelineSeparator>
            <TimelineContent>
            <div  style={{padding: '10px', width: '-moz-fit-content', display:'inline-block', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                Alpha v0.2
                </Typography>
                <Typography>{t.alpha2}</Typography>

            </div>
            </TimelineContent>
        </TimelineItem>

       
        <TimelineItem>
            <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary" >
                Q4 2022
            </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot>
        
            </TimelineDot>
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
            <div style={{padding: '10px', width: '-moz-fit-content',display: 'inline-block', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                    V1
                </Typography>
                <Typography>{t.mainnet}</Typography>
            </div>
            </TimelineContent>
        </TimelineItem>

        <TimelineItem>
            <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary" >
                Q1/Q2 2023
            </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot>
        
            </TimelineDot>
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
            <div style={{padding: '10px', width: '-moz-fit-content',display: 'inline-block', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                    BBST Launch
                </Typography>
                <Typography>{t.sale}</Typography>
            </div>
            
            </TimelineContent>
        </TimelineItem>

        <TimelineItem>
            <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary" >
                Q1/Q2 2023
            </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot>
        
            </TimelineDot>
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
            <div style={{padding: '10px', width: '-moz-fit-content',display: 'inline-block', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                    V2
                </Typography>
                <Typography>{t.v2launch}</Typography>
            </div>
            
            </TimelineContent>
        </TimelineItem>

        <TimelineItem>
        <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
                {t.q22}
            </Typography>
            
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot >
        
            </TimelineDot>
            <TimelineConnector  />
            </TimelineSeparator>
            <TimelineContent>
            <div  style={{padding: '10px', width: '-moz-fit-content', display: 'inline-block', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                {t.improvment}
                </Typography>
                <Typography>{t.exp1}</Typography>
                <Typography>{t.exp2}</Typography>
                <Typography>{t.exp3}</Typography>

            </div>
            </TimelineContent>
        </TimelineItem>
       
           
        
        </Timeline>
      </div>
    )
     
}

export default Roadmap; 
