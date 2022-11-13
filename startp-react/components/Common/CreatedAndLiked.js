import React, { Component } from 'react';
import SimpleCampaignPost from '@/components/Common/SimpleCampaignPost'
import {connect} from 'react-redux'
import { bnb_chain } from '@/utils/bnb_chain';
import { chain } from '@/utils/chain';
import { db } from '../../firebase-crowdfund/index'
import firebase from 'firebase/app';
import { Button } from '@material-ui/core';

class CreatedAndLiked extends Component {

    constructor(props){
      super(props)
      this.user = props.user
      this.showIndex = 0

      this.state = {
        created: [],
        liked:[],
        lastBatch: false
      }

      this.getCreated()
      this.getLiked()

      this.getLiked = this.getLiked.bind(this)

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

    async getLiked(){
        console.log("innliked1")
        if(this.user != undefined){
            if(this.user.eth_address == this.props.address){
                console.log("innliked2")

                let nbByPage = 10
                let endInd = this.user.liked.length > nbByPage*this.showIndex + nbByPage ? nbByPage*this.showIndex + nbByPage : this.user.liked.length
                let likedArr = this.user.liked.slice(nbByPage*this.showIndex, endInd)
                if(likedArr.length > 0){
                    let newArr = []
                    await db.collection('campaignsBNBTest').where("confirmed", "==", true).where(firebase.firestore.FieldPath.documentId(), "in", likedArr)
                    .get()
                    .then((docs) => {
                        console.log(docs)
                        docs.forEach(element => {
                                newArr.push(element.data())
                        })
                    
                        if(docs.docs.length < nbByPage - 1){
                            console.log("lastB")
                            this.setState({lastBatch: true})
                          }
                    this.showIndex++
                    this.setState({liked: this.state.liked.concat(newArr)})
                    })
                }
            }
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.address !== this.props.address){
            this.getLiked()
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
        this.state.liked.forEach((e) => {
            rows.push( <div key={e.title} className="col-lg-4 col-md-6">
            <SimpleCampaignPost project={e}/>
            </div>);
          })
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

    showFollowed = () => {
        if(this.user.eth_address == this.props.address){
            return <li onClick={(e) => this.openTabSection(e, 'tab2')}>
            Followed
        </li>
        }
    }

    showMoreBtn = () => {
        if(!this.state.lastBatch)
         return <Button onClick={this.getLiked}>Show more</Button>
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
                            
                            {this.showFollowed()}
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
                                            {this.showMoreBtn()}
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
        allCampaigns: state.allCampaigns,
        address: state.address
    }
}


export default connect(
    mapStateToProps   
  )(CreatedAndLiked);
