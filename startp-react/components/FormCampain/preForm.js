import React from 'react';
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import HTMLEditor from './HTMLEditor';
import Description from './description'
import Title from './title'
import {connect} from 'react-redux'
import Tiers from './tiers'
import * as Icon from 'react-feather';
import "react-dates/initialize";
import DatePicker from "./date-range";
import DateValidPicker from "./dateTimePicker";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {db, storage} from '../../firebase-crowdfund/index';
import {postHTMLPage, postImage} from '../../firebase-crowdfund/queries';
import "react-dates/lib/css/_datepicker.css";
import categoryList from '@/utils/CategoryList';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import MainPic from '@/components/ITStartup/MainPic.js'
import Modal from '@material-ui/core/Modal';
import PreviewCampaign from '@/components/Common/PreviewCampaign';
import { ref } from "firebase/storage";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import campaignFactoryAbi from '@/components/ContractRelated/CampaignFactoryAbi';
import campaignFactoryAddr from '@/components/ContractRelated/CampaignFactoryAddr';
import bnb_campaignFactoryAddr from '@/components/ContractRelated/bnb_CampaignFactoryAddr';

import {usdcAddr} from '@/components/ContractRelated/USDCAddr';
import {bbstAddr} from '@/components/ContractRelated/BbstAddr';
import {bnb_busdAddr} from '@/components/ContractRelated/bnb_busdAddr';
import {bnb_bbstAddr} from '@/components/ContractRelated/bnb_BbstAddr';
import { erc20standardAbi } from '../ContractRelated/ERC20standardABI';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";
import { toBaseUnit } from '@/utils/bnConverter';
import { bbstAbi } from '../ContractRelated/BbstAbi';
import DOMPurify from 'isomorphic-dompurify';
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'
import { prefixedAddress } from '@/utils/prefix';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CheckCircle } from '@material-ui/icons';
import CircularProgressWithLabel from '../Common/CircularProgressWithLabel';
import Footer from '../_App/Footer';

const Web3 = require('web3');
const BN = require('bn.js');

const mapStateToProps = state => {
    return {
        web3Instance: state.web3Instance,
        userAddr: state.address,
        chainID: state.chainID
    }
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  
  
  
class preForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            titleError: '',
            objectiveError: '',
            modal: false,
            html:'',
            Tx: "",
            errorMsg: "",
            snackbarOpen: false,
            dialogOpen : false,
            creationState: 10,
            initializationProgress: 0,
            imageProgress: 0,
            endTxt: "",
            imgMethod: "link"
        }

        this.handleCloseSnackbar.bind(this);
        this.closeDialog.bind(this);

        this.cats = ['---', '---'];
        this.html = '';
        this.image = undefined;
   //     this.flexible = true;
        this.title = undefined;
        this.small_description = '',
        this.objective = 0,
        this.id = undefined,
        this.creator_name = "",
        this.creator_img = "",
        this.raised = 0,
        this.objectiveError = '',
        this.twitter = null,
        this.linkedin = null,
        this.facebook = null,
        this.email = null,
        this.origin = undefined,
        this.imgLink = ""
    }


    displayCategories(){
        var rows = [];
        rows.push(<option key={0} value="---" >---</option>)
        for (var i = 0; i < categoryList.length; i++) {
            rows.push(<option key={i + 1} value={categoryList[i]} >{categoryList[i]}</option>)
        }
        return rows;
    }


    openDialog(){
        this.setState({dialogOpen: true})
    }

    closeDialog(){
        this.setState({dialogOpen: false})
        this.setState({activeStep: 0})
    }

    openSnackbar() {
        this.closeDialog()
        this.setState({snackbarOpen: true})
    }

    handleCloseSnackbar() {
        this.setState({snackbarOpen: false})
    }

      
    sanitizeAndParseHtml(htmlString){
        DOMPurify.addHook('afterSanitizeAttributes', function (node) {
            // set all elements owning target to target=_blank
            if (node.hasAttribute('target')){
              node.setAttribute('target', '_blank')
              node.setAttribute('rel', 'noopener');
            }
          });
          const cleanHtmlString = DOMPurify.sanitize(htmlString, { USE_PROFILES: { html: true }, ADD_ATTR: ['target', 'allow', 'allowfullscreen', 'frameborder', 'scrolling'], ADD_TAGS: ["iframe"] });
        return cleanHtmlString;
    }

    createFirebaseObject(){

        if(!this.state.dialogOpen){
            this.openDialog()
        }

        if(this.state.imgMethod == "link"){
            this.createHTMLAndPush(this.imgLink)
        } else {
            let uploadTaskImg = postImage('mainPic', this.image, this.id.toString())
            uploadTaskImg.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                this.setState({imageProgress: progress})
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
                console.log(error)
                this.setState({endTxt: error.message})
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                storage.ref('mainPic')
                 .child(this.id.toString())
                 .getDownloadURL().then((downloadURL) => {
                     this.createHTMLAndPush(downloadURL)
                 }).catch(console.error)
            })
        }
    }

    createHTMLAndPush = (imageURL) => {
        // this.setState({ creationState: 1 });    // etat "push to bdd"
        if(!this.state.dialogOpen){
            this.openDialog()
        }

        // console.log("CreatingFirebaseObject")
        var blob = new Blob([this.sanitizeAndParseHtml(this.html)], {
            type: "text/plain",
          });
        let uploadTask = storage.ref('preCampaignsTest/'+this.id.toString()).put(blob);
            // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            this.setState({initializationProgress: progress})
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
            console.log(error)
            this.setState({endTxt: error.message})
        }, 
        () => {
            console.log("Upload finished")
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            storage.ref('preCampaignsTest')
             .child(this.id.toString())
             .getDownloadURL().then(async(downloadURL) => {
                // console.log('File available at', downloadURL);
                let precategs = this.cats.filter(a => a !== "---").filter(function (value, index, array) { 
                    return array.indexOf(value) === index;
                })

                let socials = {twitter: this.twitter, facebook: this.facebook, linkedin: this.linkedin, email: this.email}
               

                let categs = precategs.length == 0 ? ["Diverse"] : precategs
                const campainInfos = {
                    id: this.id,
                    title: this.title,
                    small_description: this.small_description,
                    categories: categs,
                    objective: this.objective,
                    origin: this.origin,
                    long_desc: downloadURL,
                    main_img: imageURL,
                    socials: socials,
                    raised: this.raised,
                    objective: this.objective,
                    currency: "$",
                    creator_name: this.creator_name,
                    creator_img: this.creator_img,
                    tiers:[],
                    whitelist_address:null
                }
                // console.log(campainInfos)

                db.collection('preCampaignsTest').doc(this.id.toString()).set(campainInfos).then(x => {
                    this.setState({endTxt: "Creation successful ✅"})

                    // this.setState({ creationState: 2 }); // etat fini
                    if(!this.state.dialogOpen){
                        this.openDialog()
                    }
                }).catch((error) => this.setState({endTxt: error.message}))
    
    
                }).catch((error) => this.setState({endTxt: error.message}));
            }
        );
    }

    checkCampaignIsValid = () => {
        if(this.html != '' && this.title != undefined && this.id != undefined && this.origin != undefined){
            return true
        }
        return false
    }

    handleCampaign = (event) => {
        event.preventDefault();

        if(this.checkCampaignIsValid()){
            this.createFirebaseObject()
        } else {
            this.setState({errorMsg: "Invalid input, please check you filled everything correctly."})
            this.openSnackbar()
        }

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

    displayConfirmModal = (x) => {
        switch(x) {
            default:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Uploading...</DialogTitle>
                <DialogContent>
                
                <DialogContentText>Image : {this.state.imageProgress} %</DialogContentText>
                <DialogContentText>Long description : {this.state.initializationProgress} %</DialogContentText>
                <DialogContentText>{this.state.endTxt}</DialogContentText>
                </DialogContent></div>

        }
    }

    showImgPicker(){
        if(this.state.imgMethod == "link"){
            return <div className="col-lg-12 col-md-12" >
            <div className="form-group">
            <input type="text" placeholder="Main img Link" className="form-control" onChange={(event) => {
                this.imgLink = event.target.value
            }}/>
            </div>
        </div>
        } else {
            return <><p>Size : max 1MB / Format : JPG, PNG or GIF / Resolution : 16:9 (ex: 1920x1080, 1280x720, 1024x576...)</p>
            <MainPic onImageChange={this.handleChangeImage.bind(this)} ratio="ratio" resolutionWidth={1920} resolutionHeight={1080} /></>
        }
    }

    display(){
            return <>
                {/* <Navbar /> */}
                <PageBanner pageTitle="PrePage creation form" />

                <Snackbar
                    open={this.state.snackbarOpen}
                    onClose={() => this.handleCloseSnackbar()}
                    autoHideDuration={9000}
                >
                <Alert onClose={() => this.handleCloseSnackbar()} severity="error" >
                    Error : {this.state.errorMsg}
                </Alert>
                </Snackbar>

                <Dialog
                    className='dialogResponsive'
                    open={this.state.dialogOpen}
                    onClose={(_, reason) => {
                        if (reason !== "backdropClick") {
                          this.closeDialog();
                        }
                      }}
                    
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {this.displayConfirmModal(this.state.creationState)}
                    {/* <DialogActions>
                    <Button onClick={this.closeDialog} color="primary">
                        Close
                    </Button>
                    </DialogActions> */}
                </Dialog>


                <div className="services-area-two pt-80 pb-50 bg-f9f6f6">
                    <div className="container">
                        <div className="section-title">
                            <h2>Pre-Campaign</h2>
                            <div className="bar"></div>
                            <p>Here is the place where you can create your prepage for your campaign.</p>
                        </div>

                        <div className="faq-contact">
                            <h3>Complete the information for your campaign</h3>
                      

                            <form id="formCampaign" onSubmit={this.handleCampaign}>
                                <div className="row">
                                    <p><strong> ID </strong></p>
                                    <div className="col-lg-12 col-md-12" >
                                        <div className="form-group">
                                        <input type="number" placeholder="ID" min="0" step={1} className="form-control" onChange={(event) => {
                                            this.id = event.target.value
                                        }}/>
                                        </div>
                                    </div>
                                    <Title onChange={e => {this.title = e}}/>
                                    {this.state.titleError !== '' ? <p style={{color: 'red'}}>{this.state.titleError}</p>: null}
                                    <p><strong> Image Banner </strong><br/> 
                                    Insert the best image for your project</p>

                                        <div style={{display:'flex'}}><p>
                                            <input type="radio" id="link" name="radio-group" value="link" checked={this.state.imgMethod == "link"} onChange={(event) => {
                                                this.setState({imgMethod: event.target.value})
                                            }}/>
                                            <label htmlFor="link">Link</label>
                                        </p>
                                        <p>
                                            <input type="radio" id="upload" name="radio-group" value="upload" checked={this.state.imgMethod == "upload"} onChange={(event) => {
                                                this.setState({imgMethod: event.target.value})
                                            }}/>
                                            <label htmlFor="link">Upload</label>
                                        </p></div>
                                    {this.showImgPicker()}
                                    <br></br>

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

                                    <p><strong> Project Goal </strong></p>
                                    <div className="col-lg-12 col-md-12" >
                                        <div className="form-group">
                                        <input type="number" placeholder="Goal" min="0" step={0.01} className="form-control" onChange={(event) => {
                                            this.objective = event.target.value
                                        }}/>
                                        {this.state.objectiveError !== '' ? <p style={{color: 'red'}}>{this.state.objectiveError}</p>: null}
                                        </div>
                                    </div>

                                    <p><strong> Amount already raised </strong></p>
                                    <div className="col-lg-12 col-md-12" >
                                        <div className="form-group">
                                        <input type="number" placeholder="Raised" min="0" step={0.01} className="form-control" onChange={(event) => {
                                            this.raised = event.target.value
                                        }}/>
                                        {/* {this.state.objectiveError !== '' ? <p style={{color: 'red'}}>{this.state.objectiveError}</p>: null} */}
                                        </div>
                                    </div>

                                    <p><strong> Creator name </strong></p>
                                    <div className="col-lg-12 col-md-12" >
                                        <div className="form-group">
                                        <input type="text" placeholder="Creator name" className="form-control" onChange={(event) => {
                                            this.creator_name = event.target.value
                                        }}/>
                                        {/* {this.state.objectiveError !== '' ? <p style={{color: 'red'}}>{this.state.objectiveError}</p>: null} */}
                                        </div>
                                    </div>

                                    <p><strong> Creator image link </strong></p>
                                    <div className="col-lg-12 col-md-12" >
                                        <div className="form-group">
                                        <input type="text" placeholder="Creator Img Link" className="form-control" onChange={(event) => {
                                            this.creator_img = event.target.value
                                        }}/>
                                        {/* {this.state.objectiveError !== '' ? <p style={{color: 'red'}}>{this.state.objectiveError}</p>: null} */}
                                        </div>
                                    </div>

                                    <h4>SOCIALS & ORIGIN</h4>
                                    <p><strong> Origin </strong></p>
                                    <div className="col-lg-12 col-md-12" >
                                        <div className="form-group">
                                        <input type="text" placeholder="Original campaign link" className="form-control" onChange={(event) => {
                                            this.origin = event.target.value
                                        }}/>
                                        </div>
                                    </div>

                                    <p><strong> Twitter (@...)</strong></p>
                                    <div className="col-lg-12 col-md-12" >
                                        <div className="form-group">
                                        <input type="text" placeholder="Twitter" className="form-control" onChange={(event) => {
                                            this.origin = event.target.value
                                        }}/>
                                        </div>
                                    </div>

                                    <p><strong> Facebook (link) </strong></p>
                                    <div className="col-lg-12 col-md-12" >
                                        <div className="form-group">
                                        <input type="text" placeholder="Facebook link" className="form-control" onChange={(event) => {
                                            this.facebook = event.target.value
                                        }}/>
                                        </div>
                                    </div>

                                    <p><strong> Linkedin (link) </strong></p>
                                    <div className="col-lg-12 col-md-12" >
                                        <div className="form-group">
                                        <input type="text" placeholder="Linkedin link" className="form-control" onChange={(event) => {
                                            this.linkedin = event.target.value
                                        }}/>
                                        </div>
                                    </div>

                                    <p><strong> Email </strong></p>
                                    <div className="col-lg-12 col-md-12" >
                                        <div className="form-group">
                                        <input type="text" placeholder="Email address" className="form-control" onChange={(event) => {
                                            this.email = event.target.value
                                        }}/>
                                        </div>
                                    </div>
                                    
                                    <p><strong> Page of the project </strong><br/>Give an aspect to your page to make it more visual for the users.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                        <HTMLEditor onSelectHTML={this.handleHTML.bind(this)}/>
                                        </div>
                                    </div>

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
                                    
                                    {/* <p style={{marginTop: 30}}><strong> Flexibilty </strong><br/>Indicate how flexible can you be about your fundraising and the amount you want to gather. <br></br>If you check this box, the campaign will need to reach its goal before its deadline for you to get the funds, 
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
                                    </div> */}
                                    
                                    
                                    <div className="col-lg-12 col-md-12">
                                        <button className="btn btn-primary" type="submit" >Create my campain !</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Footer />
            </> 
    }

    render() {

        return (
            this.display()
                   )
    }
}



export default connect(
    mapStateToProps
)(preForm);