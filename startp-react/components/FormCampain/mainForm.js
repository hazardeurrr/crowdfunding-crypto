import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import HTMLEditor from './HTMLEditor';
import Tiers from './tiers'
import * as Icon from 'react-feather';
import "react-dates/initialize";
// import { DateRangePicker } from "react-dates";
import DatePicker from "./date-range";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import "react-dates/lib/css/_datepicker.css";
import CategoryList from '@/utils/CategoryList'
import categoryList from '@/utils/CategoryList';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import { withStyles } from '@material-ui/core/styles';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

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
            tiers: []
        }
        this.tiers = [];
        this.html = '';
    }

    displayCategories(){
        var rows = [];
        for (var i = 0; i < categoryList.length; i++) {
            rows.push(<option key={i} value={categoryList[i]} >{categoryList[i]}</option>)
        }
        return rows;
    }

    handleCampain = (event) => {
        event.preventDefault()
        console.log(event)
        let raisingMethod;
        if (event.target[108].checked === true) {
            raisingMethod = 'USDT'
        }
        else if (event.target[109].checked === true) {
            raisingMethod = 'ETH'
        }
        const campainInfos = {
            title: event.target[0].value,
            startDate: event.target[1].value,
            endDate: event.target[2].value,
            description: event.target[3].value,
            category: event.target[4].value,
            goal: event.target[5].value,
            presentation: this.html,
            raisingMethod: raisingMethod,
            partialGoal: event.target[110].checked,
            tiers: event.target[111].checked
        }
        console.log(campainInfos)
    }
    
    handleHTML(dataFromChild) {
        this.html = dataFromChild
    }





    render() {

        return (
            <>
                <Navbar />

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
                                    <p><strong> Fundraiser Name </strong><br/>Give a name to your project to make it searchable for the users.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <input type="text" placeholder="Title" className="form-control" />
                                        </div>
                                    </div>

                                    <p><strong> Fudraising Duration </strong><br/> Projects with shorter durations have higher success rates. You won’t be able to adjust your duration after you launch.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <DatePicker />
                                        </div>
                                    </div>

                                    <p><strong> Project Description </strong><br/> Make a short description of your project to make it more attractive.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <textarea name="message" cols="30" rows="6" placeholder="Description" className="form-control"></textarea>
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

                                    <p><strong> Flexibilty </strong><br/>Indicate how flexible can you be about your fundraising and the amount you want to gather.</p>
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

                                    <Tiers/>
                                    
                                    <div className="col-lg-12 col-md-12">
                                        <button className="btn btn-primary" type="submit" >Create my campain !</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Footer />
            </>        )
    }
}

export default MainForm;