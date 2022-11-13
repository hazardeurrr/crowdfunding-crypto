import React, { Component } from 'react';
import SimpleCampaignPost from '@/components/Common/SimpleCampaignPost'
import {connect} from 'react-redux'
import { bnb_chain } from '@/utils/bnb_chain';
import { chain } from '@/utils/chain';
import { db } from '../../firebase-crowdfund/index'

class CreatedAndLiked extends Component {

    constructor(props){
      super(props)
      this.user = props.user
      
      this.state = {
        created: [],
      }

      this.getCreated()
    if(this.user != undefined){
        this.liked = this.user.liked
        // this.props.allCampaigns.filter(e => e.creator.toLowerCase() == this.user.eth_address.toLowerCase())
        // console.log(this.liked)
      }
    }

    async getCreated(){
        if(this.user != undefined){
            let newArr = []
            await db.collection('campaignsBNBTest').where("confirmed", "==", true).where("creator", "==", this.user.eth_address.toLowerCase())
            .get()
            .then((docs) => {
                console.log(docs)
                docs.forEach(element => {
                        newArr.push(element.data())
                })
            this.setState({created: newArr})
            })
        }
    }

    displayCreatedProjects = () => {
      var rows = [];
      this.state.created.forEach((e) => {
        rows.push( <div key={e.title} className="col-lg-4 col-md-6">
        <SimpleCampaignPost project={e}
        />
        </div>)
      })
      return rows;
    }

    getPrefixedAddr = (camp) => {
        if(camp.network == bnb_chain){
            return "bnb_"+camp.contract_address
        } else if(camp.network == chain){
            return "eth_"+camp.contract_address
        }
    }

    displayLikedProjects = () => {
      var rows = [];
      for (var i = 0; i < this.user.liked.length; i++) {
          let proj = this.props.allCampaigns.find(e => this.getPrefixedAddr(e) == this.liked[i])
          if(proj !== undefined){
            rows.push( <div key={i} className="col-lg-4 col-md-6">
            <SimpleCampaignPost project={proj}/>
            </div>);
          }
      }
      return rows;
    }
 
    openTabSection = (evt, tabNmae) => {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabs_item");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByTagName("li");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace("current", "");
        }

        document.getElementById(tabNmae).style.display = "block";
        evt.currentTarget.className += "current";
    }

    render() {
        return (
            <div className="pricing-area pb-50">
                <div className="container">
                    <div className="section-title">
                
                        <div className="bar"></div>
                    </div>
                    
                    <div className="tab pricing-tab bg-color">
                        <ul className="tabs">
                            <li
                                className="current"
                                onClick={(e) => this.openTabSection(e, 'tab1')}
                            >
                                Created
                            </li>
                            
                            <li onClick={(e) => this.openTabSection(e, 'tab2')}>
                                Followed
                            </li>
                        </ul>

                        <div className="tab_content">
                            <div id="tab1" className="tabs_item">
                                <div className="row justify-content-center">

                                <div className="blog-area ">
                                  <div className="container">
                                    <div className="createdlike">
                                        <div className="row justify-content-center">
                                            {this.displayCreatedProjects()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>

                            <div id="tab2" className="tabs_item">
                                <div className="row justify-content-center">
                                  <div className="blog-area ">
                                    <div className="container">
                                        <div className="createdlike">
                                            <div className="row justify-content-center">
                                            {this.displayLikedProjects()}
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shape Images */}
                <div className="shape1">
                    <img src="/images/shape1.png" alt="shape" />
                </div>
                <div className="shape2 rotateme">
                    <img src="/images/shape2.svg" alt="shape" />
                </div>
                <div className="shape3">
                    <img src="/images/shape3.svg" alt="shape" />
                </div>
                <div className="shape4">
                    <img src="/images/shape4.svg" alt="shape" />
                </div>
                <div className="shape7">
                    <img src="/images/shape4.svg" alt="shape" />
                </div>
                <div className="shape8 rotateme">
                    <img src="/images/shape2.svg" alt="shape" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allCampaigns: state.allCampaigns
    }
}


export default connect(
    mapStateToProps   
  )(CreatedAndLiked);
