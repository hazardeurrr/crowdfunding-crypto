import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';


import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';


const Roadmap = () => {

    const currentYear = new Date().getFullYear();

    return (
      <div id="roadmap">
        <div className="features-area pt-80 pb-50 bg-f7fafd">
          <div className="container">
            <div className="section-title">
                <h2>Our roadmap</h2>
                <div className="bar"></div>
            </div>
          </div>
        </div>
          

        <Timeline align="alternate">
        <TimelineItem>
            <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
                Q4 2020
            </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot>
        
            </TimelineDot>
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
            <div  style={{padding: '10px', width: 'fit-content', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                Project Initialization
                </Typography>
                <Typography>Conceptualisation and early development</Typography>
            </div>
            </TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary" >
                Q1 2021
            </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot>
        
            </TimelineDot>
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
            <div style={{padding: '10px', width: 'fit-content',display: 'inline-block', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                    Development
                </Typography>
                <Typography>Development of the platform and smart contracts</Typography>
            </div>
            </TimelineContent>
        </TimelineItem>

        <TimelineItem>
        <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
                Q2 2021
            </Typography>
            
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot >
        
            </TimelineDot>
            <TimelineConnector  />
            </TimelineSeparator>
            <TimelineContent>
            <div style={{padding: '10px', width: 'fit-content',display: 'inline-block', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                    
                </Typography>
                <Typography></Typography>
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
            <div style={{padding: '10px', width: 'fit-content',display: 'inline-block', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                    IDO
                </Typography>
                <Typography>BBST Token Sale</Typography>
            </div>
            </TimelineContent>
        </TimelineItem>

        <TimelineItem>
        <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
                Q4 2021
            </Typography>
            
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot >
        
            </TimelineDot>
            <TimelineConnector  />
            </TimelineSeparator>
            <TimelineContent>
            <div  style={{padding: '10px', width: 'fit-content', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                Alpha
                </Typography>
                <Typography>Alpha of the platform on Testnet</Typography>

            </div>
            </TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary" >
                Q1 2022
            </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot>
        
            </TimelineDot>
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
            <div style={{padding: '10px', width: 'fit-content',display: 'inline-block', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                    V1
                </Typography>
                <Typography>Release of V1 on Mainnet</Typography>
            </div>
            </TimelineContent>
        </TimelineItem>

        <TimelineItem>
        <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
                Q2 2022 & More
            </Typography>
            
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot >
        
            </TimelineDot>
            <TimelineConnector  />
            </TimelineSeparator>
            <TimelineContent>
            <div  style={{padding: '10px', width: 'fit-content', boxShadow: '0 2px 48px 0 rgb(0 0 0 / 8%)'}}>
                <Typography variant="h6" component="h1">
                Improvement and expansion
                </Typography>
                <Typography>Improvement of the platform and expansion of the BlockBoosted ecosystem with another one powered by BBST...</Typography>

            </div>
            </TimelineContent>
        </TimelineItem>
       
           
        
        </Timeline>
      </div>
    )
     
}

export default Roadmap; 
