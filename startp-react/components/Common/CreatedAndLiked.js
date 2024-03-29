import React, { Component } from 'react';
import SimpleCampaignPost from '@/components/Common/SimpleCampaignPost'
import {connect} from 'react-redux'


class CreatedAndLiked extends Component {

    constructor(props){
      super(props)
      this.user = props.user
      if(this.user != undefined){
        this.liked = this.user.liked
        this.created = this.props.allCampaigns.filter(e => e.creator.toLowerCase() == this.user.eth_address.toLowerCase())
        // console.log(this.liked)
      }
    }

    displayCreatedProjects = () => {
      var rows = [];
      for (var i = 0; i < this.created.length; i++) {
          rows.push( <div key={i} className="col-lg-4 col-md-6">
          <SimpleCampaignPost project={this.created[i]}
          />
      </div>);
      }
      return rows;
    }

    displayLikedProjects = () => {
      var rows = [];
      for (var i = 0; i < this.user.liked.length; i++) {
          let proj = this.props.allCampaigns.find(e => e.contract_address == this.liked[i])
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
                                      <div className="row justify-content-center">
                                        {this.displayCreatedProjects()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>

                            <div id="tab2" className="tabs_item">
                                <div className="row justify-content-center">
                                  <div className="blog-area ">
                                    <div className="container">
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
