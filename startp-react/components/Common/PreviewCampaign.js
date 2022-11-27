import React, { useRef, useEffect, useState } from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Parser from 'html-react-parser';
import * as Icon from 'react-feather';
import DOMPurify from 'isomorphic-dompurify';
import PreviewSidebar from "../Blog/PreviewSidebar";

const PreviewCampaign = (props) => {

//   console.log(props.content)
    const sanitizeAndParseHtml = (htmlString) => {
        DOMPurify.addHook('afterSanitizeAttributes', function (node) {
            // set all elements owning target to target=_blank
            if (node.hasAttribute('target')){
              node.setAttribute('target', '_blank')
              node.setAttribute('rel', 'noopener');
            }
          });
          const cleanHtmlString = DOMPurify.sanitize(htmlString, { USE_PROFILES: { html: true }, ADD_ATTR: ['target', 'allow', 'allowfullscreen', 'frameborder', 'scrolling'], ADD_TAGS: ["iframe"] });
        const html = Parser(cleanHtmlString);
        return html;
    }

    const showCurrencyWoPrefix = () => {
        if(props.currency){
         if(props.currency.includes('_'))
            return props.currency.substring(props.currency.indexOf('_') + 1);
         else
            return props.currency
        } else {
            return ''
        }
        
    }

    const returnImg = () => {
        if(props.image){
            return <img src={props.image}/>
        } else {
            return <Skeleton animation={false} variant="rect" height={300} />
        }
    }

    const returnTitle = () => {
        if(props.title){
            return props.title
        } else {
            return "Title"
        }
    }

    const showCats = () => {
        let precategs = props.cats.filter(a => a !== "---").filter(function (value, index, array) { 
            return array.indexOf(value) === index;
        })

        let categs = precategs.length == 0 ? ["Diverse"] : precategs
        if(categs.length == 1){
            return categs[0]
        } else if(categs.length != 0){
            return `${categs[0]} & ${categs[1]}`
        }
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
                                        {returnImg()}                                       
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-content">

                                        <span className="sub-title">{showCats()}</span>
                                        {/* <Skeleton animation={false} variant="text" height={50}/> */}

                                        <h2 style={{marginTop: 20, marginBottom: 10}}>{returnTitle()}</h2>
                                        {/* <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        
                                                      <Skeleton animation={false} variant="text" />
                                                      <Skeleton animation={false} variant="text" />

                                                    </ul>
                                                </div>              
                                            </div>
                                        </div> */}
                                        <div className="bar"></div>

                                    
                                        <p style={{fontSize: 15, marginBottom: 30}}>
                                            {/* <Skeleton animation={false} variant="text" /><Skeleton animation={false} variant="text" /><Skeleton animation={false} variant="text" /> */}
                                            {props.desc}
                                        </p>
                                        <h5>X {showCurrencyWoPrefix()} raised / {props.obj} {showCurrencyWoPrefix()}</h5> 
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
                                      
                                          <button disabled className="btn btn-primary">Back this campaign</button>
                                          <UseAnimations
                                          disabled
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
                                    <div id="htmlDisplay">
                                        {sanitizeAndParseHtml(content)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                          <div className="widget-area" id="secondary">
                            <div className="widget widget_startp_posts_thumb">
                                <div style={{minWidth: 270}}>

                                    {/* <h3 className="widget-title">What you get with your contribution</h3> */}
                                    <PreviewSidebar currency={props.currency} tiers={props.tiers}/>
                                    {/* <Skeleton variant="rect" animation={false} height={150}/>
                                    <br></br>
                                    <Skeleton variant="rect" animation={false} height={150}/>
                                    <br></br>
                                    <Skeleton variant="rect" animation={false} height={150}/> */}
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