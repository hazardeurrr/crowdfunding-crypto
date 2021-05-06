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
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import { withStyles } from '@material-ui/core/styles';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import ProfilePic from '@/components/ITStartup/ProfilePic.js'
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
            startDate: undefined, 
            endDate: undefined, 
            focusedInput: undefined, 
            htmlEditor: undefined,
            categoryPicked: undefined,
            raisingMethod: undefined,
            tiersNumber: 0,
            tiers: [],
            image: undefined
        }
        this.tiers = [];
        this.tiersArray = [];
        this.html = '';
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
        let raisingMethod;
        if (event.target[6].checked === true) {
            raisingMethod = 'USDT'
        }
        else if (event.target[7].checked === true) {
            raisingMethod = 'ETH'
        }
        let tiersInfos = []
        for (var i = 0; i < event.target[112].value; i++) {
            tiersInfos.push({
                title: event.target[113 + i].value,
                amount: event.target[114 + i].value,
                description: event.target[115 + i].value
            })
        }
        let cats = []
        if (event.target[5].value !== '---') {
            cats.push(event.target[5].value)
        }
        if (event.target[4].value !== '---') {
            cats.push(event.target[4].value)
        }
        const campainInfos = {
            title: event.target[0].value,
            start_date: event.target[1].value,
            end_date: event.target[2].value,
            small_description: event.target[3].value,
            categories: cats,
            objective: event.target[8].value,
            long_desc: this.html,
            currency: raisingMethod,
            flexible: event.target[111].checked,
            tiers: tiersInfos,
            main_img: this.image,
        }
        console.log(campainInfos)
        
        db.collection('campain').doc(campainInfos.title).set(campainInfos).then(x => {
            console.log('document written with : ' + campainInfos.title)
        }).catch(err => {
            console.error(err)
        })
    }
    
    handleHTML(dataFromChild) {
        this.html = dataFromChild
    }

    handleTiers(dataFromTiers) {
        this.tiersArray = dataFromTiers;
    }

    handleChangeImage(dataFromImage) {
        this.setState({image: dataFromImage})
    }



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
                                    <p><strong> Image Banner </strong><br/> Insert the best image for your project</p>
                                    <ProfilePic onImageChange={this.handleChangeImage.bind(this)}/>
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
                                                <select className="form-select" id='categorySelected'>
                                                    {this.displayCategories()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <p><strong> Project Category </strong><br/> Choose a category that describes your project.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                        
                                            <div className="select-box">
                                                <select className="form-select" id='categorySelected'>
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
                                        </div>
                                    </div>
                                    
                                    <p><strong> Page of the project </strong><br/>Give an aspect to your page to make it more visual for the users.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                        <HTMLEditor onSelectHTML={this.handleHTML.bind(this)}/>
                                        </div>
                                    </div>

                                    

                                    <p><strong> Flexibilty </strong><br/>Indicate how flexible can you be about your fundraising and the amount you want to gather. If you check this box, the campaign will need to reach its goal before its deadline for you to get the funds, 
                                    otherwise the funds will be locked and contributors will be able to get a refund. If you don't check this, you will get all funds raised even though the goal of the campaign is not reached by its deadline.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-check">
                                        <FormControlLabel
                                            value="end"
                                            control={<Checkbox color="primary" />}
                                            label="Goal has to be reached ?"
                                            labelPlacement="end"
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