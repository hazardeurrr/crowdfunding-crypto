import React, { useRef, useEffect, useState } from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Parser from 'html-react-parser';
import * as Icon from 'react-feather';
import DOMPurify from 'dompurify';

const PreviewCampaign = (props) => {

//   console.log(props.content)
    const sanitizeAndParseHtml = (htmlString) => {
        const cleanHtmlString = DOMPurify.sanitize(htmlString, { ADD_TAGS: ["iframe"]}, { ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] },
        { USE_PROFILES: { html: true } });
        const html = Parser(cleanHtmlString);
        return html;
    }

  const content = props.content == undefined ? '' : props.content
  return <div>
      <div className="blog-details-area ptb-80">
                <div className="container">
                    <div className="about-area ptb-80">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-img">
                                      <Skeleton animation={false} variant="rect" height={350} />

                                        
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-content">

                                        <span className="sub-title">Categories</span>
                                        <Skeleton animation={false} variant="text" height={50}/>

                                        <h2 style={{marginTop: 20, marginBottom: 10}}>Title</h2>
                                        <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        
                                                      <Skeleton animation={false} variant="text" />
                                                      <Skeleton animation={false} variant="text" />

                                                    </ul>
                                                </div>              
                                            </div>
                                        </div>
                                        <div className="bar"></div>

                                    
                                        <p style={{fontSize: 15, marginBottom: 30}}><Skeleton animation={false} variant="text" /><Skeleton animation={false} variant="text" /><Skeleton animation={false} variant="text" /></p>
                                        <h5>X... raised / X...</h5> 
                                        <ProgressBar animated now={30}/>
                                        <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        <li>
                                                            <Icon.Clock /> X days left
                                                        </li>
                                                    </ul>
                                                </div>              
                                            </div>
                                        </div>

                                        <div style={{display: "flex"}}>
                                      
                                          <a className="btn btn-primary">Back this campaign</a>
                                          <UseAnimations
                                            size={40}
                                            wrapperStyle={{ marginTop: '15px', marginLeft: '20px' }}
                                            animation={heart}
                                          />
                                            

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="blog-details-desc">

                                <div className="article-content">  
                                
                                <div className="separator"></div>
                                 {sanitizeAndParseHtml(content)}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                          <div className="widget-area" id="secondary">
                            <div className="widget widget_startp_posts_thumb">
                                <div style={{minWidth: 270}}>

                                    <h3 className="widget-title">What you get with your contribution</h3>
                                    <Skeleton variant="rect" animation={false} height={150}/>
                                    <br></br>
                                    <Skeleton variant="rect" animation={false} height={150}/>
                                    <br></br>
                                    <Skeleton variant="rect" animation={false} height={150}/>
                                  </div>
                                </div>
                            </div>
                          </div>

                    </div>
                </div>
            </div>
          </div>


          

}

export default PreviewCampaign


// export async function getServerSideProps (context) {
//   //   console.log(context.query) 
//     // returns { id: episode.itunes.episode, title: episode.title}
    
  
//     //you can make DB queries using the data in context.query
//     return {
//         props: { 
//            content: context.query.id //pass it to the page props
//         }
//     }
//   }