import React, { useRef, useEffect, useState } from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Parser from 'html-react-parser';
import * as Icon from 'react-feather';
import DOMPurify from 'isomorphic-dompurify';
import PreviewSidebar from "../Blog/PreviewSidebar";
import SocialMediaList from "./SocialMediaList";
import TagListCreaPage from "./TagListCreaPage";

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
            return <img src={props.image} className="pp_crea"/>
        }
    }

    const returnBanner = () => {
        if(props.banner){
            return <img src={props.banner} className="pp_crea"/>
        } else {
            return <Skeleton animation={false} variant="rect" />
        }
    }
    

    const returnTitle = () => {
        if(props.name){
            return props.name
        } else {
            return "Your name"
        }
    }

  const content = props.content == undefined ? '' : props.content
  return <div style={{marginTop: 50}}>
      <div className="blog-details-area ptb-80">
                <div style={{height: '17vw', position: "relative"}}>
                    <div className="banner_crea" style={{position: "absolute", width: '100%', height:'100%', overflow:'hidden'}}>
                        <div style={{width: '100%', height:'100%', borderBottom: '4px solid #d04646', borderTop:'4px solid #d04646' ,backgroundSize:"cover", backgroundImage:`url(${props.banner})`}}>
                            
                        </div>
                    </div>
                </div>
                <div style={{position:'relative'}}>
                    {returnImg()}
                </div>
                <div className="container">
                    <div className="about-area ptb-80">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-lg-8 col-md-12">
                                    <div className="ml-about-content">
                                        <h1>{returnTitle()}</h1>   
                                        <TagListCreaPage tags={props.tags}/>
                                        <div className="bar"></div>
                                        <p>{props.desc}</p>                                 
                                        </div>
                                </div>

                                <div className="col-lg-4 col-md-12" style={{textalign : 'center'}}>
                                    <div className="ml-about-content">
                                    {/* <TagListCreaPage campaign={campaign}/> */}

                                        <div style={{justifyContent:'center', alignItems:'center', textAlign:'center'}}>
                                            <SocialMediaList socials={props.socials}/>
                                            </div>
                                            <div style={{marginTop: 25, textAlign:'center'}}>
                                            <button disabled className="btn btn-primary">Tip this creator</button>
                                            </div>
                                        {/* <ShareIcons campaign={campaign}/> */}

                                       
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