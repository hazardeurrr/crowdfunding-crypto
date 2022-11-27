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
import { campaignsCollection } from '@/utils/collections';
import { bsc_explorer_base, eth_explorer_base } from '@/utils/explorers';

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


  
  
  
class MainForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            titleError: '',
            objectiveError: '',
            modal: false,
            html:'',
            factoryInstance:undefined,
            Tx: "",
            errorMsg: "",
            snackbarOpen: false,
            dialogOpen : false,
            creationState: 10,
            new_contract_address: '',
            initializationProgress: 0,
            imageProgress: 0,
            raisingMethod: this.getStartRaisingMethod(),
            activeStep:0,
            title: null,
            image: null, 
            cats: ['---', '---'],
            small_description:'',
            objective:0,
            tiersArray:[],

        }

        this.handleCloseSnackbar.bind(this);
        this.closeDialog.bind(this);

        // this.tiers = [];
        // this.tiersArray = [];
        // this.cats = ['---', '---'];
        // this.html = '';
        // this.image = undefined;
   //     this.flexible = true;
        // this.title = undefined;
        this.startDate = undefined, 
        this.endDate = undefined, 
        // this.small_description = '',
        // this.raisingMethod = this.getStartRaisingMethod(),
        // this.tiersNumber = 0,
        // this.objective = 0,
        this.objectiveError = ''
        this.steps = this.getSteps()

    }

    onUnload = e => { // the method that will be used for both add and remove event
        e.preventDefault();
        e.returnValue = '';
     }

    getStartRaisingMethod(){
        if(this.props.chainID == chain){
            return "USDC"
        } else if(this.props.chainID == bnb_chain){
            return "b_BUSD"
        }
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload);
     }
 
     componentWillUnmount() {
         window.removeEventListener("beforeunload", this.onUnload);
     }

    
     UNSAFE_componentWillMount() {
         //web3 à gérer (init dans le header, récup via le store)
         if(this.props.web3Instance !== undefined){
             this.initFactoryInstance()
            //  console.log("remount")
         }
     }

    async initFactoryInstance(){
        var factInstance = null
        if(this.props.chainID == chain){
            factInstance = await new this.props.web3Instance.eth.Contract(campaignFactoryAbi.campaignFactoryAbi, campaignFactoryAddr.campaignFactoryAddr)
        } else if(this.props.chainID == bnb_chain){
            factInstance = await new this.props.web3Instance.eth.Contract(campaignFactoryAbi.campaignFactoryAbi, bnb_campaignFactoryAddr.bnb_campaignFactoryAddr)
        }
        this.setState({factoryInstance: factInstance})
    }

    componentDidUpdate(prevProps){
        if(prevProps.web3Instance != this.props.web3Instance || prevProps.chainID != this.props.chainID){
            // console.log("changed props component did update")
            if(prevProps.chainID != this.props.chainID){
                this.setState({raisingMethod: this.getStartRaisingMethod()})
            }
            if(this.props.web3Instance !== undefined){
                this.initFactoryInstance()
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.web3Instance !== this.props.web3Instance && nextProps.web3Instance !== undefined) {
            // console.log(nextProps.web3Instance)
            this.UNSAFE_componentWillMount()
        }
      }


    displayCategories(){
        var rows = [];
        rows.push(<option key={0} value="---" >---</option>)
        for (var i = 0; i < categoryList.length; i++) {
            rows.push(<option key={i + 1} value={categoryList[i]} >{categoryList[i]}</option>)
        }
        return rows;
    }

    tokenIndex(currency){
        if(currency == "USDC" || currency == "b_BUSD")
            return 0
        if(currency == "ETH" || currency == "b_BNB")
            return 1
        if(currency == "BBST" || currency == "b_BBST")
            return 2
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

    async createContract(){
   //     const bigMultiplier = new BN('1000000000000000000')

        let context = this
        let amt = 0
        let tierAmountArray = []  
        
        if(this.state.raisingMethod != "ETH" && this.state.raisingMethod != "b_BNB"){
            let erc20Ctr = undefined
            if(this.state.raisingMethod == "USDC"){
                erc20Ctr = new this.props.web3Instance.eth.Contract(erc20standardAbi, usdcAddr)
            } else if(this.state.raisingMethod == "BBST"){
                erc20Ctr = new this.props.web3Instance.eth.Contract(bbstAbi, bbstAddr)
            } else if(this.state.raisingMethod == "b_BBST"){
                erc20Ctr = new this.props.web3Instance.eth.Contract(bbstAbi, bnb_bbstAddr)
            } else if(this.state.raisingMethod == "b_BUSD"){
                erc20Ctr = new this.props.web3Instance.eth.Contract(erc20standardAbi, bnb_busdAddr)
            }

            if(erc20Ctr != undefined){
                await erc20Ctr.methods.decimals().call().then((decimals) => {     
                    amt = toBaseUnit(this.state.objective.toString(), decimals, this.props.web3Instance.utils.BN)               
                    // console.log("amount", amt)
                  //  tierAmountArray = this.tiersArray.map(a => a.threshold * 10**decimals) 
                    tierAmountArray = this.state.tiersArray.map(a => toBaseUnit(a.threshold.toString(), decimals, this.props.web3Instance.utils.BN))
                    // console.log(tierAmountArray)
                })
            } else {
                throw "erc20 contract instance not defined"
            }
        } else {        // <=> campagne en ETH ou MATIC
            tierAmountArray = this.state.tiersArray.map(a => this.props.web3Instance.utils.toWei(a.threshold.toString()))
            amt = this.props.web3Instance.utils.toWei(this.state.objective.toString())
        }

        let tierStockArray = this.state.tiersArray.map(a => a.maxClaimers)
        let am0 = [0]
        let st0 = [-1]
        let amountArray = am0.concat(tierAmountArray)
        let stockArray = st0.concat(tierStockArray)
        let tokenAdd = this.tokenIndex(this.state.raisingMethod)
        const ethInstance = this.props.web3Instance.eth;
        // [0, tiersArray[0].threshold, tiersArray[1].threshold]
        return await this.state.factoryInstance.methods.createCampaign(
        amt, // WEI for ETH, x 10^decimals
        parseInt(this.startDate), 
        parseInt(this.endDate), 
      //  this.flexible, 
        parseInt(tokenAdd),
        amountArray,
        stockArray
        )
        .send({from : this.props.userAddr, value: 0})
        .on('transactionHash', function(hash){
            context.openDialog()
            context.setState({ Tx: hash });
            // ethInstance.getTransactionReceipt(hash).then(console.log);
        })
        .on('confirmation', function(confirmationNumber, receipt){

            // console.log("Confirmation number:" + confirmationNumber)
        })
        .on("error", function(error) {
            context.setState({ errorMsg: error.code + " : " + error.message})
            context.openSnackbar()
            console.log(error);
        })
        .then(a => {
            this.setState({new_contract_address: a.events.CampaignCreated.returnValues[0].toLowerCase()})
            this.createFirebaseObject(a.events.CampaignCreated.returnValues[0].toLowerCase())
            }
        )
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

    createFirebaseObject(contract_addr){
        this.handleNext()

        // this.setState({ creationState: 3 });    // etat "push to bdd"
        if(!this.state.dialogOpen){
            this.openDialog()
        }

        let contract_address = contract_addr.toLowerCase()

        let uploadTaskImg = postImage('mainPic', this.state.image, this.prefixedAddress(contract_address))
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
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            storage.ref('mainPic')
             .child(this.prefixedAddress(contract_address))
             .getDownloadURL().then((downloadURL) => {
                 this.createHTMLAndPush(contract_address, downloadURL)
             }).catch(console.error)
        })
    }

    createHTMLAndPush = (contract_address, imageURL) => {
        this.handleNext()
        // this.setState({ creationState: 1 });    // etat "push to bdd"
        if(!this.state.dialogOpen){
            this.openDialog()
        }

        // console.log("CreatingFirebaseObject")
        var blob = new Blob([this.sanitizeAndParseHtml(this.state.html)], {
            type: "text/plain",
          });
        let uploadTask = postHTMLPage(blob, this.prefixedAddress(contract_address))
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
        }, 
        () => {
            console.log("Upload finished")
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            storage.ref(campaignsCollection)
             .child(this.prefixedAddress(contract_address))
             .getDownloadURL().then(async(downloadURL) => {
                // console.log('File available at', downloadURL);
                let precategs = this.state.cats.filter(a => a !== "---").filter(function (value, index, array) { 
                    return array.indexOf(value) === index;
                })

                let categs = precategs.length == 0 ? ["Diverse"] : precategs

                
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        "dynamicLinkInfo": {
                            "domainUriPrefix": "blb.st",
                            "link": `https://app.blockboosted.com/campaigns/${this.prefixedAddress(contract_address)}`,
                            "socialMetaTagInfo": {
                                "socialTitle":this.state.title,
                                "socialDescription": this.state.small_description,
                                "socialImageLink": imageURL
                            }
                        },
                        "suffix": {
                            "option": "SHORT"
                        }
                    })
                };
                const response = await fetch('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAxLDH4sjj2Cdtf-ylbdwAcqoQwKnViACM', requestOptions);
                const data = await response.json();

                let shortURL = data.shortLink ? data.shortLink : null
    
                const campainInfos = {
                    title: this.state.title,
                    start_date: this.startDate,
                    end_date: this.endDate,
                    contract_address: contract_address,
                    small_description: this.state.small_description,
                    categories: categs,
                    objective: this.state.objective,
                    long_desc: downloadURL,
                    currency: this.state.raisingMethod,
                 //   flexible: this.flexible,
                    tiers: this.state.tiersArray,
                    network: this.props.chainID,
                    main_img: imageURL,
                    raised: 0,
                    // likedTupleMap: {},
                    confirmed: null,
                    like_score: 0,
                    live:true,
                    shortURL: shortURL
                }
                // console.log(campainInfos)
        
                // campaign address to be retrieved from the solidity smart contract
                const creator_address = this.props.userAddr
                campainInfos['creator'] = creator_address
                db.collection(campaignsCollection).doc(this.prefixedAddress(contract_address)).set(campainInfos).then(x => {
                    // console.log('document written with : ' + campainInfos.title)

                    this.handleNext()
                    // this.setState({ creationState: 2 }); // etat fini
                    if(!this.state.dialogOpen){
                        this.openDialog()
                    }
                }).catch(console.error)
    
    
                }).catch(console.error);
            }
        );
    }

    prefixedAddress = (addr) => {
        if(this.props.chainID == bnb_chain){
            return "bnb_"+addr
        } else if(this.props.chainID == chain){
            return "eth_"+addr
        }
    }

    checkCampaignIsValid = () => {
        if(this.state.image != null && this.state.html != '' && this.state.title != null && this.startDate != undefined && this.endDate != undefined && this.state.objective > 0){
            return true
        }
        return false
    }

    handleCampaign = (event) => {
        event.preventDefault();

        if(this.checkCampaignIsValid()){
            this.checkContractCanBeCreated()
        } else {
            this.setState({errorMsg: "Invalid input, please check you filled everything correctly."})
            this.openSnackbar()
        }

    }

    checkContractCanBeCreated(){
        if(this.state.factoryInstance !== undefined){
            this.createContract()
            this.setState({ creationState: 10 })
            this.openDialog()
        } else {
            this.setState({ errorMsg : "Can't access Web3. Please check your wallet settings and that you don't have more than one provider installed. (Reload)"})
            this.openSnackbar()
        }
    }
    
    handleHTML(dataFromChild) {
        this.setState({html: dataFromChild})
    }

    handleChangeImage(dataFromImage) {
        this.setState({image: dataFromImage})
    }


    handleOpenModal = () => {
        this.setState({modal: true});
      };
    
    handleCloseModal = () => {
        this.setState({modal: false});
      };

    getNbrStep = () => {                    
        if(this.state.raisingMethod == "USDC" || this.state.raisingMethod == "b_BUSD")
            return 0.000001
        if(this.state.raisingMethod == "ETH" || this.state.raisingMethod == "b_BNB")
            return 0.000000000000000001
        if(this.state.raisingMethod == "BBST" || this.state.raisingMethod == "b_BBST")
            return 0.000000000000000001
    }

    handleDateChange = (startDate, endDate) => {
        // console.log(this.startDate)
        if(startDate != null){
            this.startDate = Math.floor(startDate.getTime() / 1000)
        }

        // console.log(this.endDate)
        if(endDate != null){
            this.endDate = Math.floor(endDate.getTime() / 1000)
        }
    }

    explorerLink = () => {
        if(this.props.chainID == chain){
            return <a className="responsiveLinkTx" href={`https://${eth_explorer_base}/tx/${this.state.Tx}`} target="_blank">{this.state.Tx}</a>
        } else if(this.props.chainID == bnb_chain){
            return <a className="responsiveLinkTx" href={`https://${bsc_explorer_base}/tx/${this.state.Tx}`} target="_blank">{this.state.Tx}</a>
        }
    }

    
    //---------------STEPPER----------------/
    getSteps = () => {
        return ['Create smart-contract instance', 'Upload campaign data 1/2', 'Upload campaign data 2/2'];
      }
      
    getStepContent = (step) => {
        switch (step) {
          case 0:
            return `Please confirm the transaction on your wallet and wait for blockchain confirmation. This is the only blockchain transaction you will need to do.`;
          case 1:
            return `Your contract is created ! We are uploading your campaign's data (1/2).`;
          case 2:
            return `Almost there ! We are uploading your campaign's data (2/2).`;
          default:
            return 'Unknown step';
        }
      }

      handleNext = () => {
        this.setState({activeStep: this.state.activeStep + 1});
      };
      
      getLabelIcon = (i) => {
        if(i === this.state.activeStep && i===0) return <CircularProgress style={{color:'black', width: 25, height:25}}/>
        else if(i === this.state.activeStep && i === 1) return <CircularProgressWithLabel style={{color:'black', width: 25, height:25}} value={this.state.imageProgress}/>
        else if(i === this.state.activeStep && i === 2) return <CircularProgressWithLabel style={{color:'black', width: 25, height:25}} value={this.state.initializationProgress}/>
        else if(i < this.state.activeStep) return <CheckCircle/>
        else if(i > this.state.activeStep) return i+1

      }

      displayStepper = () => {
        return (
            <div >
              <Stepper activeStep={this.state.activeStep} orientation="vertical">
                {this.steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel icon={this.getLabelIcon(index)}>{label}</StepLabel>
                    <StepContent>
                      <p>{this.getStepContent(index)}</p>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {this.state.activeStep === this.steps.length && (
                <Paper style={{marginTop: 15, textAlign:'center'}} square elevation={0}>
                  <h5>Upload complete 🎉</h5><p>Our team will review your campaign as soon as possible. You will receive a notification once it's published.</p>
                  <Link style={{marginTop: 15}} href="/"><Button
                    style={{backgroundColor: 'black', color:'white'}}
                    variant="contained"
                    >Finish
                    </Button></Link>
                </Paper>
                
              )}
            </div>
      )}

    displayConfirmModal = (x) => {
        switch(x) {
            case 0:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Waiting for confirmation...</DialogTitle>
                <DialogContent>

                    <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>

                <DialogContentText id="alert-dialog-description">
                Transaction Hash : </DialogContentText>
                <DialogContentText id="alert-dialog-description">{this.explorerLink()}</DialogContentText>
                </DialogContent></div>
            case 1:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Campaign initialization {this.state.initializationProgress.toFixed(2)}%</DialogTitle>
                <DialogContent>    
                    <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
                    <DialogContentText id="alert-dialog-description">
                Transaction confirmed : </DialogContentText>
                <DialogContentText id="alert-dialog-description">{this.explorerLink()}</DialogContentText>
                </DialogContent></div>
            case 2:
                //  return <div style={{justifyContent:'center'}}>
                // <DialogTitle id="alert-dialog-title">Your campaign is online !</DialogTitle>
                // <DialogContent>
                
                // <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                //     <h5 style={{marginBottom: 5}}>{this.title}</h5>
                //     <img src={this.image} alt='campaign image'/>
                //     <div style={{justifyContent:'center'}}>
                //         <Link href={{
                //             pathname: "/campaigns/[id]",
                //             query: {
                //                 id: this.state.new_contract_address,
                //                 }
                //             }}
                //             >
                //         <a style={{marginTop: 15}} className="btn btn-primary">See it here</a>
                //         </Link>  
                //     </div>
                // </div>    
              
                // </DialogContent></div>
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Your campaign is online !</DialogTitle>
                <DialogContent>
                
                <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                    <h5 style={{marginBottom: 5}}>{this.state.title}</h5>
                    <img src={this.state.image} alt='campaign image'/>
                    <div style={{justifyContent:'center'}}>
                        <Link href={{
                            pathname: "/campaigns/[id]",
                            query: {
                                id: prefixedAddress(this.props.chainID, this.state.new_contract_address),
                                }
                            }}
                            >
                        <a style={{marginTop: 15}} className="btn btn-primary">See it here</a>
                        </Link>  
                    </div>
                </div>    
              
                </DialogContent></div>

            case 3:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Uploading Data {this.state.imageProgress.toFixed(2)}%</DialogTitle>
                <DialogContent>    
                    <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
                    <DialogContentText id="alert-dialog-description">
                Transaction confirmed : </DialogContentText>
                <DialogContentText id="alert-dialog-description">{this.explorerLink()}</DialogContentText>
                </DialogContent></div>

            case 10:
                return  <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Campaign creation</DialogTitle>
                <DialogContent>
                    {this.displayStepper()}
                    <DialogContentText style={{marginTop: 15, marginBottom: 0}} id="alert-dialog-description">Transaction hash :</DialogContentText>
                    <p>{this.explorerLink()}</p>

                </DialogContent></div>
            default:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Waiting for confirmation...</DialogTitle>
                <DialogContent>
                
                <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
                </DialogContent></div>

        }
    }

    showCurrentNetwork(){
        if(this.props.chainID == chain){   // ETH
            return <div style={{display:"flex"}}><p>Selected network : <img style={{height: 20, marginLeft: 5}} src="/images/cryptoicons/smallethgray.svg" /> <span style={{marginLeft: 3}}>Ethereum</span></p></div>
        } else if(this.props.chainID == bnb_chain) {      // BNB MAINNET
            return <div style={{display:"flex"}}><p>Selected network : <img style={{height: 20, marginLeft: 5}} src="/images/cryptoicons/smallbnbgray.svg" /> <span style={{marginLeft: 3}}>BNB Smart Chain</span></p></div>
        } else {
            return <div style={{display:"flex"}}><p>Selected network : <Icon.AlertCircle/> <span style={{marginLeft: 5}}>Unsupported. Please switch network.</span></p></div>
        }
    }

    displayRaisingMethods(){
        if(this.props.chainID == chain){
            return <div className="payment-method">
            <p>
                <input type="radio" id="usdc" name="radio-group" value="USDC" checked={this.state.raisingMethod == "USDC"} onChange={(event) => {
                    this.setState({raisingMethod: event.target.value})
                }}/>
                <label htmlFor="usdc">USDC (3.5% fee)</label>
            </p>
            <p>
                <input type="radio" id="eth" name="radio-group" value="ETH" checked={this.state.raisingMethod == "ETH"} onChange={(event) => {
                    this.setState({raisingMethod: event.target.value})
                }}/>
                <label htmlFor="eth">ETH (3.5% fee)</label>
            </p>
            {/* <p>
                <input type="radio" id="bbst" name="radio-group" value="BBST" checked={this.state.raisingMethod == "BBST"} onChange={(event) => {
                    this.setState({raisingMethod: event.target.value})
                }}/>
                <label htmlFor="bbst">BBST (0% fee)</label>
            </p> */}
        </div>
        } else if(this.props.chainID == bnb_chain){
            return <div className="payment-method">
            {/* <p><i>Please keep in mind this campaign will be on BNB Smart Chain network.</i></p> */}
            <p>
                <input type="radio" id="bnb_busd" name="bnb_radio-group" value="b_BUSD" checked={this.state.raisingMethod == "b_BUSD"} onChange={(event) => {
                    this.setState({raisingMethod: event.target.value})
                }}/>
                <label htmlFor="bnb_busd">BUSD</label>
            </p>
            <p>
                <input type="radio" id="bnb_bnb" name="bnb_radio-group" value="b_BNB" checked={this.state.raisingMethod == "b_BNB"} onChange={(event) => {
                    this.setState({raisingMethod: event.target.value})
                }}/>
                <label htmlFor="bnb_bnb">BNB</label>
            </p>
            {/* <p>
                <input type="radio" id="bnb_bbst" name="bnb_radio-group" value="b_BBST" checked={this.state.raisingMethod == "b_BBST"} onChange={(event) => {
                    this.setState({raisingMethod: event.target.value})
                }}/>
                <label htmlFor="bnb_bbst">BBST (0% fee)</label>
            </p> */}
        </div>
        }
    }

    display(){
        if(this.props.web3Instance !== undefined && this.state.factoryInstance !== undefined){
            return <>
                {/* <Navbar /> */}
                <PageBanner pageTitle="Create your campaign !" />

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
                            <h2>Campaign</h2>
                            <div className="bar"></div>
                            <p>Here is the place where you can create your campaign and start raising funds for your project.</p>
                            {/* <br /><p><i>Beware : if your campaign promote or contains offensive, inappropriate or illegal content, it might get suspended. Thank you for your comprehension.</i></p> */}
                        </div>

                        <div className="faq-contact">
                            <h3>Complete the information for your campaign</h3>
                            <p><i>Creator address : <span className='user-address2'>{this.props.userAddr}</span></i></p>
                            {this.showCurrentNetwork()}
                            <br></br>

                            <form id="formCampaign" onSubmit={this.handleCampaign}>
                                <div className="row">
                                    <Title onChange={e => {this.setState({title: e})}}/>
                                    {this.state.titleError !== '' ? <p style={{color: 'red'}}>{this.state.titleError}</p>: null}
                                    <p><strong> Image Banner </strong><br/> Insert the best image for your project</p>
                                    <p>Size : max 1MB / Format : JPG, PNG or GIF / Resolution : 16:9 (ex: 1920x1080, 1280x720, 1024x576...)</p>
                                    <MainPic onImageChange={this.handleChangeImage.bind(this)} ratio="ratio" resolutionWidth={1920} resolutionHeight={1080} />
                                    <br></br>

                                    <p style={{marginTop: 20}}><strong> Fundraising Duration </strong><br/> Projects with shorter durations have higher success rates. You won’t be able to adjust your duration after you launch.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            {/* <DatePicker onChange={e => {
                                                if (e.endDate !== null){
                                                    console.log(new Date(e.startDate._d))
                                                    
                                                    // this.startDate = Math.floor(Date.now() / 1000);
                                                    this.startDate = Math.floor(new Date(e.startDate._d).getTime() / 1000)
                                                    // this.endDate = Math.floor(new Date(e.endDate._d).getTime() / 1000)
                                                    this.endDate = 1646233800
                                                }
                                            }}/> */}

                                            <DateValidPicker handleDateChange={this.handleDateChange.bind(this)}/>
                                        </div>
                                    </div>

                                    <Description onChange={e => {
                                        this.setState({small_description : e})
                                    }}/>

                                    <p><strong> Project Category </strong><br/> Choose a category that describes your project.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                        
                                            <div className="select-box">
                                                <select className="form-select" required onChange={(event) => {
                                                    let newArr = this.state.cats
                                                    newArr[0] = event.target.value
                                                    this.setState({cats: newArr})
                                                    // this.cats[0] = event.target.value
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
                                                     let newArr = this.state.cats
                                                     newArr[1] = event.target.value
                                                     this.setState({cats: newArr})
                                                    // this.cats[1] = event.target.value
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
                                                {this.displayRaisingMethods()}
                                            </div>
                                        </div>
                                    </div>

                                    <p><strong> Project Goal </strong><br/> Your goal should reflect the amount you wish to raise with your campaign.<br></br><i>⚠ Amount should be specified in the currency chosen above</i></p>
                                    <div className="col-lg-12 col-md-12" >
                                        <div className="form-group">
                                        <input type="number" placeholder="Goal" min="0" step={this.getNbrStep()} className="form-control" onChange={(event) => {
                                            this.setState({objective: event.target.value})
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
                                            <Button variant="contained" style={{position: 'fixed', bottom: 17}} onClick={this.handleCloseModal}>Close preview</Button>

                                            <PreviewCampaign tiers={this.state.tiersArray} cats={this.state.cats} currency={this.state.raisingMethod} image={this.state.image} title={this.state.title} desc={this.state.small_description} obj={this.state.objective} content={this.state.html}/>

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
                                    
                                    <h4 style={{marginTop: "15px", marginBottom: "20px"}}>Optional</h4>

                                    <p><strong> Rewards tiers </strong><br/> Add reward tiers depending on the value of contributions.</p>

                                    <Tiers step={this.getNbrStep()} onTiersChange={e => {
                                        this.setState({tiersArray: e})
                                        // console.log(this.tiersArray, "mainForm tiersArray")
                                    }}/>
                                    
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
        } else {
            return <>
            {/* <Navbar /> */}
            <PageBanner pageTitle="Create your campaign !" />

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
                        <h2>Campaign</h2>
                        <div className="bar"></div>
                        <p>Here is the place where you can create your campaign and start raising funds for your project.</p>
                        <br /><p><i>Beware : if your campaign promote or contains offensive, inappropriate or illegal content, it might get suspended. Thank you for your comprehension.</i></p>
                    </div>

                    <div className="faq-contact">
                        <div style={{display: "flex"}}><CircularProgress /><div style={{marginLeft: 20, marginTop: -5}}><h4>Accessing Web3</h4><p><i>Please check your provider settings and reload if it takes too long</i></p></div></div>
                    </div>
                </div>
            </div>
        </> 
        }
    }

    render() {

        return (
            this.display()
                   )
    }
}



export default connect(
    mapStateToProps
)(MainForm);