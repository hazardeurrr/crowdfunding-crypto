import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import HTMLEditor from './HTMLEditor';
import Description from './description'
import Title from './title'

import Tiers from './tiers'
import * as Icon from 'react-feather';
import "react-dates/initialize";
// import { DateRangePicker } from "react-dates";
import DatePicker from "./date-range";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {db, storage} from '../../firebase-crowdfund/index';
import "react-dates/lib/css/_datepicker.css";
import categoryList from '@/utils/CategoryList';
import { useSelector, useDispatch } from 'react-redux'
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import { withStyles } from '@material-ui/core/styles';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import ProfilePic from '@/components/ITStartup/ProfilePic.js'
import Modal from '@material-ui/core/Modal';
import PreviewCampaign from 'pages/PreviewCampaign';

// const GreenCheckbox = withStyles({
//     root: {
//       color: '#44ce6f',
//       '&$checked': {
//         color: '#44ce6f',
//       },
//     },
//     checked: {},
//   })((props) => <Checkbox color="default" {...props} />);



class MainForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            startDate: undefined, 
            endDate: undefined, 
            small_description: '',
            focusedInput: undefined, 
            htmlEditor: undefined,
            categoryPicked: undefined,
            raisingMethod: undefined,
            tiersNumber: 0,
            tiers: [],
            image: undefined,
            titleError: '',
            objective: null,
            objectiveError: '',
            modal: false,
            html:''
        }
        this.tiers = [];
        this.tiersArray = [];
        this.html = '';
        this.image = undefined;
    }
    displayCategories(){
        var rows = [];
        rows.push(<option key={0} value="---" >---</option>)
        for (var i = 0; i < categoryList.length; i++) {
            rows.push(<option key={i + 1} value={categoryList[i]} >{categoryList[i]}</option>)
        }
        console.log(rows)
        return rows;
    }
    

    handleCampain = (event) => {
        event.preventDefault()
        console.log(event)
        let offset = 2
        if (this.image === undefined) {
            this.image = null
        } else {
            offset = 2
        }
        let raisingMethod;
        if (event.target[8 + offset].checked === true) {
            raisingMethod = 'USDT'
        }
        else if (event.target[9 + offset].checked === true) {
            raisingMethod = 'ETH'
        }
        let tiersInfos = []
        if (event.target[116].value > 0) {
            for (var i = 0; i < event.target[116].value; i++) {
                tiersInfos.push({
                    title: event.target[117 + i].value,
                    threshold: event.target[118 + i].value,
                    description: event.target[119 + i].value
                })
            }
        }

        let cats = []
        if (event.target[8].value !== '---') {
            cats.push(event.target[8].value)
        }
        if (event.target[9].value !== '---') {
            cats.push(event.target[9].value)
        }
        let flexibleChecked = null
        if(event.target[114].checked !== undefined) {
            flexibleChecked = event.target[114].checked
        }
        
        const campainInfos = {
            title: event.target[0].value,
            start_date: Math.floor(new Date(event.target[3 + offset].value).getTime() / 1000),
            end_date: Math.floor(new Date(event.target[4 + offset].value).getTime()/1000),
            small_description: event.target[5 + offset].value,
            categories: cats,
            objective: event.target[10 + offset].value,
            long_desc: this.html,
            currency: raisingMethod,
            flexible: flexibleChecked,
            tiers: tiersInfos,
            main_img: this.image,
            raised: 0,
        }
        console.log(campainInfos)
        // campaign address to be retrieved from the solidity smart contract
        const creator_address = localStorage.getItem('current_address')
        campainInfos['creator'] = creator_address
        if (cats.length < 1) {return}
        db.collection('campaign').doc('0x569854865654az9e8z5f6az6').set(campainInfos).then(x => {
            console.log('document written with : ' + campainInfos.title)
        }).catch(err => {
            console.error(err)
        })
    }
    
    handleHTML(dataFromChild) {
        this.html = dataFromChild
         this.setState({html: dataFromChild})
        // console.log(this.html)
    }

    handleTiers(dataFromTiers) {
        this.tiersArray = dataFromTiers;
    }

    handleChangeImage(dataFromImage) {
        this.image = dataFromImage
    }


    handleOpenModal = () => {
        this.setState({modal: true});
      };
    
    handleCloseModal = () => {
        this.setState({modal: false});
      };

    render() {

        return (
            <>
                {/* <Navbar /> */}
                <PageBanner pageTitle="Create your campaign !" />

                <div className="services-area-two pt-80 pb-50 bg-f9f6f6">
                    <div className="container">
                        <div className="section-title">
                            <h2>Campaign</h2>
                            <div className="bar"></div>
                            <p>Here is the place where you can create your campaign and start raising funds for your project.</p>
                        </div>

                        <div className="faq-contact">
                            <h3>Complete the information for your campaign</h3>
                            <form id="formCampaign" onSubmit={this.handleCampain}>
                                <div className="row">
                                    <Title/>
                                    {this.state.titleError !== '' ? <p style={{color: 'red'}}>{this.state.titleError}</p>: null}
                                    <p><strong> Image Banner </strong><br/> Insert the best image for your project</p>
                                    <p>Size : max 800kb / Format : JPG, PNG or GIF / Resolution : 16:9 (ex: 1920x1080, 1280x720, 1024x576)</p>
                                    <ProfilePic onImageChange={this.handleChangeImage.bind(this)}/>
                                    <br></br>
                                    <p><strong> Fudraising Duration </strong><br/> Projects with shorter durations have higher success rates. You won’t be able to adjust your duration after you launch.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <DatePicker />
                                        </div>
                                    </div>

                                    <Description/>

                                    <p><strong> Project Category </strong><br/> Choose a category that describes your project.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                        
                                            <div className="select-box">
                                                <select className="form-select" required>
                                                    {this.displayCategories()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <p><strong> Project Category </strong><br/> Choose a category that describes your project.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                        
                                            <div className="select-box">
                                                <select className="form-select" >
                                                    {this.displayCategories()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <p><strong> Raising Method </strong><br/>Give a raising currency for your crowdfunding project.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <div className="order-details">
                                                <div className="payment-method">
                                                    <p>
                                                        <input type="radio" id="usdt" name="radio-group" defaultChecked/>
                                                        <label htmlFor="usdt">USDT (Tether)</label>
                                                    </p>
                                                    <p>
                                                        <input type="radio" id="eth" name="radio-group" />
                                                        <label htmlFor="eth">ETH (Ether)</label>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p><strong> Project Goal </strong><br/> Your goal should reflect the minimum amount of funds you need to complete your project and send out rewards, and include a buffer for payments processing fees.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                        <input type="number" placeholder="Goal" min="0" className="form-control" />
                                        {this.state.objectiveError !== '' ? <p style={{color: 'red'}}>{this.state.objectiveError}</p>: null}
                                        </div>
                                    </div>
                                    
                                    <p><strong> Page of the project </strong><br/>Give an aspect to your page to make it more visual for the users.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                        <HTMLEditor onSelectHTML={this.handleHTML.bind(this)}/>
                                        </div>
                                    </div>
                                    {/* <Link
                                        href={{
                                            pathname: "PreviewCampaign",
                                            query: {
                                                id: this.html,
                                            }
                                        }}>
                                            <a target="_blank" className="btn btn-secondary">Preview your page</a>
                                    </Link> */}




                                    <a target="_blank" onClick={this.handleOpenModal} className="btn btn-secondary">Preview your page</a>

                                    <Modal
                                        open={this.state.modal}
                                        onClose={this.handleCloseModal}
                                        style={{ overflow: 'scroll' }}
                                    >
                                        <div style={{margin: "auto", width : "90%", backgroundColor:'white'}}
>                                        <PreviewCampaign content={this.state.html}/>

                
                                        </div>
                                    </Modal>



                                    
                                    <p style={{marginTop: 30}}><strong> Flexibilty </strong><br/>Indicate how flexible can you be about your fundraising and the amount you want to gather. <br></br>If you check this box, the campaign will need to reach its goal before its deadline for you to get the funds, 
                                    otherwise the funds will be locked and contributors will be able to get a refund. If you don't check this, you will get all funds raised even though the goal of the campaign is not reached by its deadline.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-check">
                                        <FormControlLabel
                                            value="end"
                                            control={<Checkbox color="primary" />}
                                            label="Goal has to be reached ?"
                                            labelPlacement="end"
                                            id='goal'
                                            />
                                            
                                        </div>
                                    </div>
                                    
                                    <h4 style={{marginTop: "15px", marginBottom: "20px"}}>Optionnal</h4>

                                    <p><strong> Rewards tiers </strong><br/> Add reward tiers depending on the value of contributions.</p>

                                    <Tiers onTiersChange={this.handleTiers.bind(this)}/>
                                    
                                    <div className="col-lg-12 col-md-12">
                                        <button className="btn btn-primary" type="submit" >Create my campain !</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* <Footer /> */}
            </>        )
    }
}

export default MainForm;