import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import HTMLEditor from './HTMLEditor';
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
            tierChecked: false,
            htmlEditor: undefined,
            categoryPicked: undefined,
            raisingMethod: undefined
        }
        this.tiers = [];
        this.html = '';
    }

    displayCategories(){
        var rows = [];
        for (var i = 0; i < categoryList.length; i++) {
            rows.push(<option key={i} value={categoryList[i]}>{categoryList[i]}</option>)
        }
        return rows;
    }

    handleCampain = (event) => {
        event.preventDefault()
        console.log('click on submit button')
        console.log(event)
        console.log(this.html)
        console.log(event.target[0].value)
        console.log(event.target[1].value)
        console.log(event.target[2].value)
        console.log(event.target[3].value)
        console.log(event.target[5].value)
        let partialGoal;
        if(event.target[110].value === 'on') {
            partialGoal = true
        }
        else {
            partialGoal = false
        }
        const campainInfos = {
            title: event.target[0].value,
            startDate: event.target[1].value,
            endDate: event.target[2].value,
            description: event.target[3].value,
            category: '',
            goal: event.target[5].value,
            presentation: this.html,
            raisingMethod: '',
            partialGoal,
            tiers: this.state.tierChecked
        }
        console.log(campainInfos)
    }
    
    handleHTML(dataFromChild) {
        console.log(dataFromChild)
        this.html = dataFromChild
    }

    handleTiers(event) {
        this.setState({ tierChecked: event.target.checked })
    }

    handleMethod(event) {
        this.setState({raisingMethod: event.target.selected})
    }
    

    // const [startDate, setStartDate] = React.useState();
    // const [endDate, setEndDate] = React.useState();
    // const [focusedInput, setFocusedInput] = React.useState();
    // const [state, setState] = React.useState({
    //     checkedG: true,
    //   });
    // const handleChange = (event) => {
    //     setState({ ...state, [event.target.name]: event.target.checked });
    // };
    // const [state, setState] = React.useState({
    //     tierChecked: false,
    // });

    // handleChange = (event) => {
    //     state.tierChecked = !state.tierChecked
    //     // console.log(state.tierChecked)
    // };


    render() {
        const hidden = this.state.tierChecked ? 'block' : 'none';

    
        
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
                                            {/* <input
                                                id="date"
                                                label="Birthday"
                                                type="date"
                                                defaultValue='2021-04-15'
                                                className="form-control"
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                            /> */}
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
                                                <select className="form-select">
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
                                            <input type="checkbox" className="form-check-input" id="goal"/>
                                            <label className="goal" htmlFor="goal">Goal has to be reached?</label>
                                            {/* <div className="order-details">
                                                <FormControlLabel
                                                    control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG" />}
                                                    label="Goal has to be reached"
                                                />
                                                </div> */}
                                        </div>
                                    </div>
                                    
                                    <h4 style={{marginTop: "15px", marginBottom: "20px"}}>Optionnal</h4>

                                    <p><strong>Do you want to add any tiers to contribute for your project ?</strong></p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-check">
                                        <FormControlLabel
                                            value="end"
                                            control={<Checkbox color="primary" onChange={this.handleTiers} />}
                                            label="Any tiers ?"
                                            labelPlacement="end"
                                            />
                                        </div>
                                    </div>

                                    <div style={{display: hidden }}>
                                        <p><strong> Number of tiers </strong><br/> Indicate how many tiers do you want to add to your fundraising project.</p>
                                        <div className="col-lg-2 col-md-1">
                                            <div className="form-group">
                                            <input type="number" placeholder="Tiers" className="form-control" />
                                            </div>
                                        </div>
                                    </div>


                                    {/* <p><strong> Tiers </strong><br/>Indicate differents levels of contribution for your fundraising.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <input type="number" placeholder="Threshold" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" placeholder="Title" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <textarea name="message" cols="30" rows="6" placeholder="Description" className="form-control"></textarea>
                                        </div>
                                    </div>
                                     */}
                                    <div className="col-lg-12 col-md-12">
                                        <button className="btn btn-primary" type="submit" >Create Fundraiser !</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        )
    }
}

export default MainForm;