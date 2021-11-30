import React from 'react';
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import HTMLEditor from './HTMLEditor';
import Description from './description'
import Title from './title'

import Tiers from './tiers'
import * as Icon from 'react-feather';
import "react-dates/initialize";
import DatePicker from "./date-range";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {db, storage} from '../../firebase-crowdfund/index';
import {postHTMLPage, postImage} from '../../firebase-crowdfund/queries';
import "react-dates/lib/css/_datepicker.css";
import categoryList from '@/utils/CategoryList';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import ProfilePic from '@/components/ITStartup/ProfilePic.js'
import Modal from '@material-ui/core/Modal';
import PreviewCampaign from 'pages/PreviewCampaign';


class MainForm extends React.Component {
    

    constructor(props){
        super(props);
        this.state = {
            titleError: '',
            objectiveError: '',
            modal: false,
            html:''
        }

        this.tiers = [];
        this.tiersArray = [];
        this.cats = ['---', '---'];
        this.html = '';
        this.image = undefined;
        this.flexible = true;
        this.title = undefined;
        this.startDate = undefined, 
        this.endDate = undefined, 
        this.small_description = '',
        this.categoryPicked = undefined,
        this.raisingMethod = undefined,
        this.tiersNumber = 0,
        this.objective = null,
        this.objectiveError = ''
    }

    displayCategories(){
        var rows = [];
        rows.push(<option key={0} value="---" >---</option>)
        for (var i = 0; i < categoryList.length; i++) {
            rows.push(<option key={i + 1} value={categoryList[i]} >{categoryList[i]}</option>)
        }
        return rows;
    }
    

    handleCampaign = (event) => {
        event.preventDefault()
        let contract_address = '0x569854865654az9e8z5f6azziotr'
        postHTMLPage('campaigns', this.html, contract_address)
        
        const campainInfos = {
            title: this.title,
            start_date: this.startDate,
            end_date: this.endDate,
            contract_address: '0x569854865654az9e8z5f6azziotr',
            small_description: this.small_description,
            categories: this.cats,
            objective: parseInt(this.objective),
            long_desc: this.html,
            currency: this.raisingMethod,
            flexible: this.flexible,
            tiers: this.tiersArray,
            main_img: this.image,
            raised: 0,
        }
        console.log(campainInfos)

        // campaign address to be retrieved from the solidity smart contract
        const creator_address = localStorage.getItem('current_address')
        campainInfos['creator'] = creator_address
        if (this.cats.length < 1) {return}
        db.collection('campaign').doc(contract_address).set(campainInfos).then(x => {
            console.log('document written with : ' + campainInfos.title)
        }).catch(console.error)
    }
    
    handleHTML(dataFromChild) {
        this.html = dataFromChild
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
                            <form id="formCampaign" onSubmit={this.handleCampaign}>
                                <div className="row">
                                    <Title onChange={e => {this.title = e}}/>
                                    {this.state.titleError !== '' ? <p style={{color: 'red'}}>{this.state.titleError}</p>: null}
                                    <p><strong> Image Banner </strong><br/> Insert the best image for your project</p>
                                    <p>Size : max 800kb / Format : JPG, PNG or GIF / Resolution : 16:9 (ex: 1920x1080, 1280x720, 1024x576)</p>
                                    <ProfilePic onImageChange={this.handleChangeImage.bind(this)} ratio="ratio" resolutionWidth={1920} resolutionHeight={1080} />
                                    <br></br>
                                    <p><strong> Fudraising Duration </strong><br/> Projects with shorter durations have higher success rates. You won’t be able to adjust your duration after you launch.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <DatePicker onChange={e => {
                                                if (e.endDate !== null){
                                                    this.startDate = Math.floor(new Date(e.startDate._d).getTime() / 1000)
                                                    this.endDate = Math.floor(new Date(e.endDate._d).getTime() / 1000)
                                                }
                                            }}/>
                                        </div>
                                    </div>

                                    <Description onChange={e => {
                                        this.small_description = e
                                    }}/>

                                    <p><strong> Project Category </strong><br/> Choose a category that describes your project.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                        
                                            <div className="select-box">
                                                <select className="form-select" required onChange={(event) => {
                                                    this.cats[0] = event.target.value
                                                }}>
                                                    {this.displayCategories()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                     <p><strong> Second Project Category </strong><br/> Choose a second category to describe your project.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                        
                                            <div className="select-box">
                                                <select className="form-select" onChange={(event) => {
                                                    this.cats[1] = event.target.value
                                                }}>
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
                                                        <input type="radio" id="usdt" name="radio-group" defaultChecked value="USDT" onChange={(event) => {
                                                            this.raisingMethod = event.target.value
                                                        }}/>
                                                        <label htmlFor="usdt">USDT (Tether - 2.5% fee)</label>
                                                    </p>
                                                    <p>
                                                        <input type="radio" id="eth" name="radio-group" value="ETH" onChange={(event) => {
                                                            this.raisingMethod = event.target.value
                                                        }}/>
                                                        <label htmlFor="eth">ETH (Ether - 2.5% fee)</label>
                                                    </p>
                                                    <p>
                                                        <input type="radio" id="bbst" name="radio-group" value="BBST" onChange={(event) => {
                                                            this.raisingMethod = event.target.value
                                                        }}/>
                                                        <label htmlFor="bbst">BBST (BlockBoosted - 0% fee)</label>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p><strong> Project Goal </strong><br/> Your goal should reflect the minimum amount of funds you need to complete your project and send out rewards, and include a buffer for payments processing fees.<br></br><i>⚠ Amount should be in the currency chosen above</i></p>
                                    <div className="col-lg-12 col-md-12" >
                                        <div className="form-group">
                                        <input type="number" placeholder="Goal" min="0" className="form-control" onChange={(event) => {
                                            this.objective = event.target.value
                                        }}/>
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
                                        <div style={{margin: "auto", width : "90%", backgroundColor:'white'}}>
                                            <PreviewCampaign content={this.html}/>
                                        </div>
                                    </Modal>
                                    
                                    <p style={{marginTop: 30}}><strong> Flexibilty </strong><br/>Indicate how flexible can you be about your fundraising and the amount you want to gather. <br></br>If you check this box, the campaign will need to reach its goal before its deadline for you to get the funds, 
                                    otherwise the funds will be locked and contributors will be able to get a refund. If you don't check this, you will get all funds raised even though the goal of the campaign is not reached by its deadline.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-check">
                                        <FormControlLabel
                                            value="end"
                                            control={<Checkbox color="primary" onChange={(event) => {
                                                this.flexible = !event.target.checked;
                                            }}/>}
                                                label="Goal has to be reached ?"
                                                labelPlacement="end"
                                                id='goal'
                                            />
                                            
                                        </div>
                                    </div>
                                    
                                    <h4 style={{marginTop: "15px", marginBottom: "20px"}}>Optionnal</h4>

                                    <p><strong> Rewards tiers </strong><br/> Add reward tiers depending on the value of contributions.</p>

                                    <Tiers onTiersChange={e => {
                                        this.tiersArray = e
                                    }}/>
                                    
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