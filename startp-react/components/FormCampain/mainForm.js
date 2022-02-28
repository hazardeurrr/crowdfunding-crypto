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
import { ref } from "firebase/storage";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import campaignFactoryAbi from '@/components/ContractRelated/CampaignFactoryAbi';
import campaignFactoryAddr from '@/components/ContractRelated/CampaignFactoryAddr';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";

const Web3 = require('web3');
const BN = require('bn.js');

const mapStateToProps = state => {
    return {
        web3Instance: state.web3Instance,
        userAddr: state.address
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
            creationState: 0,
            new_contract_address: '',
            initializationProgress: 0            
        }

        this.handleCloseSnackbar.bind(this);
        this.closeDialog.bind(this);

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
        this.raisingMethod = "USDC",
        this.tiersNumber = 0,
        this.objective = 0,
        this.objectiveError = ''
    }

    
     componentWillMount() {
         //web3 à gérer (init dans le header, récup via le store)
         if(this.props.web3Instance !== undefined){
             this.initFactoryInstance()
             console.log("remount")
         }
     }

    async initFactoryInstance(){
        const factInstance = await new this.props.web3Instance.eth.Contract(campaignFactoryAbi.campaignFactoryAbi, campaignFactoryAddr.campaignFactoryAddr)
        this.setState({factoryInstance: factInstance})
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.web3Instance !== this.props.web3Instance && nextProps.web3Instance !== undefined) {
            console.log(nextProps.web3Instance)
            this.componentWillMount()
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
        if(currency == "USDC")
            return 0
        if(currency == "ETH")
            return 1
        if(currency == "BBST")
            return 2
    }

    openDialog(){
        this.setState({dialogOpen: true})
    }

    closeDialog(){
        this.setState({dialogOpen: false})
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
        let amt = this.raisingMethod == "ETH" ? this.props.web3Instance.utils.toWei(this.objective.toString()) : this.objective
        let tierAmountArray = this.tiersArray.map(a => this.props.web3Instance.utils.toWei(a.threshold.toString()))        // ATTENTION CHECK POUR LES ERC20 le nb de décimales
        let tierStockArray = this.tiersArray.map(a => a.maxClaimers)
        let am0 = [0]
        let st0 = [-1]
        let amountArray = am0.concat(tierAmountArray)
        let stockArray = st0.concat(tierStockArray)
        // [0, tiersArray[0].threshold, tiersArray[1].threshold]
        return await this.state.factoryInstance.methods.createCampaign(
        amt, // WEI for ETH, no conversion for the ERC20
        parseInt(this.startDate), 
        parseInt(this.endDate), 
        this.flexible, 
        parseInt(this.tokenIndex(this.raisingMethod)),
        amountArray,
        stockArray
        )
        .send({from : this.props.userAddr, value: 0})
        .on('transactionHash', function(hash){
            context.openDialog()
            console.log("hash :" + hash)
            context.setState({ Tx: hash });

        })
        .on('confirmation', function(confirmationNumber, receipt){ 

            console.log("Confirmation number:" + confirmationNumber)
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

    createFirebaseObject(contract_addr){
        this.setState({ creationState: 1 });    // etat "push to bdd"
        if(!this.state.dialogOpen){
            this.openDialog()
        }
        console.log("CreatingFirebaseObject")
        let contract_address = contract_addr.toLowerCase()
        var blob = new Blob([this.html], {
            type: "text/plain",
          });
        let uploadTask = postHTMLPage(blob, contract_address)
            // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
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
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            storage.ref('campaigns')
             .child(contract_address)
             .getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
    
                const campainInfos = {
                    title: this.title,
                    start_date: this.startDate,
                    end_date: this.endDate,
                    contract_address: contract_address,
                    small_description: this.small_description,
                    categories: this.cats.filter(a => a !== "---").filter(function (value, index, array) { 
                        return array.indexOf(value) === index;
                    }), // remove '---' and then remove double
                    objective: this.objective,
                    long_desc: downloadURL,
                    currency: this.raisingMethod,
                    flexible: this.flexible,
                    tiers: this.tiersArray,
                    main_img: this.image,
                    raised: 0,
                    likedTupleMap: {}
                }
                console.log(campainInfos)
        
                // campaign address to be retrieved from the solidity smart contract
                const creator_address = localStorage.getItem('current_address')
                campainInfos['creator'] = creator_address
                if (this.cats.length < 1) {return}
                db.collection('campaign').doc(contract_address).set(campainInfos).then(x => {
                    console.log('document written with : ' + campainInfos.title)
                    this.setState({ creationState: 2 }); // etat fini
                    if(!this.state.dialogOpen){
                        this.openDialog()
                    }
                }).catch(console.error)
    
    
                });
            }
        );
    }

    checkCampaignIsValid = () => {
        if(this.image != undefined && this.html != '' && this.title != undefined && this.startDate != undefined && this.endDate != undefined && this.objective > 0){
            return true
        }
        return false
    }

    handleCampaign = (event) => {
        event.preventDefault()

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
        } else {
            this.setState({ errorMsg : "Can't access Web3. Please check your metamask settings and that you don't have more than one provider installed. (Reload)"})
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

    getNbrStep = () => {                    // marche pas (pas de state)
        if(this.raisingMethod == "USDC")
            return 0.000001
        if(this.raisingMethod == "ETH")
            return 0.000000000000000001
        if(this.raisingMethod == "BBST")
            return 0.000000000000000001
    }

    displayConfirmModal = (x) => {
        switch(x) {
            case 0:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Waiting for confirmation...</DialogTitle>
                <DialogContent>

                    <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>

                <DialogContentText id="alert-dialog-description">
                Transaction Hash : </DialogContentText>
                <DialogContentText id="alert-dialog-description"><a href={`https://etherscan.io/tx/${this.state.Tx}`} target="_blank">{this.state.Tx}</a></DialogContentText>
                </DialogContent></div>
            case 1:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Campaign initialization {this.state.initializationProgress}%</DialogTitle>
                <DialogContent>    
                    <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
                    <DialogContentText id="alert-dialog-description">
                Transaction confirmed : </DialogContentText>
                <DialogContentText id="alert-dialog-description"><a href={`https://etherscan.io/tx/${this.state.Tx}`} target="_blank">{this.state.Tx}</a></DialogContentText>
                </DialogContent></div>
            case 2:
                 return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Your campaign is online !</DialogTitle>
                <DialogContent>
                
                <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                    <h5 style={{marginBottom: 5}}>{this.title}</h5>
                    <img src={this.image} alt='campaign image'/>
                    <div style={{justifyContent:'center'}}>
                        <Link href={{
                            pathname: "/Campaigns/[id]",
                            query: {
                                id: this.state.new_contract_address,
                                }
                            }}
                            >
                        <a style={{marginTop: 15}} className="btn btn-primary">See it here</a>
                        </Link>  
                    </div>
                </div>    
              
                </DialogContent></div>
            default:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Waiting for confirmation...</DialogTitle>
                <DialogContent>
                
                <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
                </DialogContent></div>

        }
    }

    render() {

        return (
            <>
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
                                    <p><strong> Fundraising Duration </strong><br/> Projects with shorter durations have higher success rates. You won’t be able to adjust your duration after you launch.</p>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <DatePicker onChange={e => {
                                                if (e.endDate !== null){
                                                    console.log(new Date(e.startDate._d))
                                                    
                                                    this.startDate = Math.floor(new Date(e.startDate._d).getTime() / 1000)
                                                    // this.endDate = Math.floor(new Date(e.endDate._d).getTime() / 1000)
                                                    this.endDate = 1646063205
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
                                                        <input type="radio" id="usdc" name="radio-group" defaultChecked value="USDC" onChange={(event) => {
                                                            this.raisingMethod = event.target.value

                                                        }}/>
                                                        <label htmlFor="usdc">USDC (2.5% fee)</label>
                                                    </p>
                                                    <p>
                                                        <input type="radio" id="eth" name="radio-group" value="ETH" onChange={(event) => {
                                                            this.raisingMethod = event.target.value
                                                        }}/>
                                                        <label htmlFor="eth">ETH (2.5% fee)</label>
                                                    </p>
                                                    <p>
                                                        <input type="radio" id="bbst" name="radio-group" value="BBST" onChange={(event) => {
                                                            this.raisingMethod = event.target.value
                                                        }}/>
                                                        <label htmlFor="bbst">BBST (0% fee)</label>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p><strong> Project Goal </strong><br/> Your goal should reflect the minimum amount of funds you need to complete your project and send out rewards, and include a buffer for payments processing fees.<br></br><i>⚠ Amount should be specified in the currency chosen above</i></p>
                                    <div className="col-lg-12 col-md-12" >
                                        <div className="form-group">
                                        <input type="number" placeholder="Goal" min="0" step={this.getNbrStep()} className="form-control" onChange={(event) => {
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

                                    <Tiers step={this.getNbrStep()} onTiersChange={e => {
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



export default connect(
    mapStateToProps
)(MainForm);