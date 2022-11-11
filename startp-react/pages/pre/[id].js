import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import * as Icon from 'react-feather';
import Parser from 'html-react-parser';
import Link from '@/utils/ActiveLink'
import ProgressBar from 'react-bootstrap/ProgressBar';
import PreCampaignSidebar from '@/components/Blog/PreCampaignSidebar';
import VerifTooltip from '@/components/Common/VerifTooltip';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ChipUser from '@/components/Common/ChipUser';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import FlexibleTooltip from '@/components/Common/FlexibleTooltip';
import ShareIcons from '@/components/Common/ShareIcons';
import HeartAnim from '@/components/Common/HeartAnim';
import {getOne} from '../../firebase-crowdfund/queries';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'

import RaisedChecker from '@/components/Common/RaisedChecker';
import { MdSentimentVerySatisfied } from 'react-icons/md';
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import Withdraw from '../../components/Common/withdraw';
import Refund from '../../components/Common/refund';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Custom404 from 'pages/404';
import DOMPurify from 'isomorphic-dompurify';

import { prefixedAddress } from '@/utils/prefix';
import { NoBscProviderError } from '@binance-chain/bsc-connector';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SendIcon from '@mui/icons-material/Send';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import { CheckCircle } from '@material-ui/icons';
import DateValidPicker from '@/components/FormCampain/dateTimePicker';

import campaignFactoryAbi from '@/components/ContractRelated/CampaignFactoryAbi';
import campaignFactoryAddr from '@/components/ContractRelated/CampaignFactoryAddr';
import bnb_campaignFactoryAddr from '@/components/ContractRelated/bnb_CampaignFactoryAddr';

import {usdcAddr} from '@/components/ContractRelated/USDCAddr';
import {bbstAddr} from '@/components/ContractRelated/BbstAddr';
import {bnb_busdAddr} from '@/components/ContractRelated/bnb_busdAddr';
import {bnb_bbstAddr} from '@/components/ContractRelated/bnb_BbstAddr';
import { erc20standardAbi } from '@/components/ContractRelated/ERC20standardABI';
import { db } from 'firebase-crowdfund/index'
import { toBaseUnit } from '@/utils/bnConverter';
import { bbstAbi } from '@/components/ContractRelated/BbstAbi';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      }
  }));

  
const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
  }))(Tooltip);


const PreCampaign = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [campaign, setCampaign] = React.useState(undefined)
    const [user, setUser] = React.useState(undefined)   // ATTENTION : USER = USER PROFILE OF THE CREATOR OF THE CAMPAIGN
    const [htmlTxt, setHTMLTxt] = React.useState("")
    const [raisedRetrieve, setRaisedRetrieve] = React.useState(false)
    const [dialogState, setDialogState] = React.useState(0)
    const [activeStep, setActiveStep] = React.useState(0)
    const [raisingMethod, setRaisingMethod] = React.useState("b_BUSD")
    const [startDate, setStartDate] = React.useState(null)
    const [endDate, setEndDate] = React.useState(null)
    const [goal, setGoal] = React.useState(0)
    const [Tx, setTx] = React.useState("")
    const [onCreation, setOnCreation] = React.useState(false)

    // const campaign = projectList.find(e => e.contract_address == props.address)
    // const raised = Math.random()*100
    // const user = usersListJson.users.find(e => e.eth_address == campaign.creator)


    var now = Date.now() / 1000;
  
    const connected = useSelector((state) => state.metamask_connected)
    const chainID = useSelector((state) => state.chainID)
    const currentUser = useSelector((state) => state.currentUser)
    const metamask_connected = useSelector((state) => state.metamask_connected)
    const userAddr = useSelector((state) => state.address)
    const web3Instance = useSelector((state) => state.web3Instance)
    


    React.useEffect(() => {

       // console.log(props.address)

        // console.log(props)

        getOne('preCampaignsTest', props.address, function(doc) {
          if (doc.exists) {
            setCampaign(doc.data())
            displayHTMLTxt(doc.data().long_desc)
            // console.log(campaign)
          } else {
              console.log("Document not found")
          }
        })
    }, [])


    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const showCurrencyWoPrefix = () => {
            return campaign.currency
    }

    const displayRaised = () => { 
      return  parseInt(campaign.raised)
    }

    const contactCreator = () => {

    }


    const BackButton = () => {
      return <>
      <h6 style={{marginBottom: 0}}><Icon.Frown /> This campaign is not available on BlockBoosted yet.</h6>
      <p onClick={contactCreator} style={{textDecoration:'underline', cursor:"pointer", fontWeight: 500}}>Ask the creator to activate it in two clicks !</p>
      {/* <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <Button startIcon={<SendIcon />} size="big" style={{textTransform: 'inherit', color:'white', backgroundColor:'#c47be4'}} variant="contained">Contact creator</Button>
        <Button style={{textTransform: 'inherit'}} startIcon={<AssignmentIndIcon />} size="small" variant="contained">I'm the creator</Button>
      </div> */}
      </>
    }


    const displayProgressBar = () => {         
      return <ProgressBar variant="purple" now={(campaign.raised / campaign.objective) * 100}/>
    }

    const showCats = () => {
        if(campaign.categories.length == 1){
            return campaign.categories[0]
        } else if(campaign.categories.length != 0){
            return `${campaign.categories[0]} & ${campaign.categories[1]}`
        }
    }

    async function displayHTMLTxt(data){
        // console.log(data)
        let txt = await fetch(data).then(r => {
            let b = r.blob().then((a) => a.text().then(h => setHTMLTxt(h)))
    });
    }

    const ShowTxt = () => {
        if(htmlTxt === "" || htmlTxt === undefined){
            return <div>
                    <Skeleton variant="rect" animation='pulse' height={550}/>
                </div>
        } else {
            return sanitizeAndParseHtml(htmlTxt)
        }
    }

    const sanitizeAndParseHtml = (htmlString) => {
        DOMPurify.addHook('afterSanitizeAttributes', function (node) {
            // set all elements owning target to target=_blank
            if (node.hasAttribute('target')){
              node.setAttribute('target', '_blank')
              node.setAttribute('rel', 'noopener');
            }
          });
          const cleanHtmlString = DOMPurify.sanitize(htmlString, { USE_PROFILES: { html: true }, ADD_ATTR: ['target', 'allow', 'allowfullscreen', 'frameborder', 'scrolling'], ADD_TAGS: ["iframe"] });
        const html = Parser(cleanHtmlString);
        return html;
}

    const displayCurrency = () => {
        return campaign.currency
    }

    const displayObjective = () => {
            return <p className="justandtextcenter" style={{marginTop: -10, marginBottom: 7}}>raised out of {parseInt(campaign.objective)} {showCurrencyWoPrefix()}</p>
    }

    const showOrigin = () => {
      return <li><Icon.ExternalLink /> <a target="_blank" href={`${campaign.origin}`}>See original campaign</a></li>
    }

    const insideDialog = () => {
        if(!(metamask_connected && chainID == bnb_chain)){
            return <><DialogTitle id="alert-dialog-title">{"You are not connected to a supported network"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Please connect your wallet. If you are already connected, make sure to select a supported network.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
            </DialogActions></>
        } else {
            switch(dialogState){
            
                case 0:
                    return <><DialogTitle id="alert-dialog-title">Campaign activation</DialogTitle>
                    <DialogContent>
                        {displayStepper()}
                        <DialogContentText style={{marginTop: 15, marginBottom: 0}} id="alert-dialog-description">Transaction hash :</DialogContentText>
                        <p>{explorerLink()}</p>
    
                    </DialogContent></>
            }
        }
    }

    const explorerLink = () => {
        if(chainID == chain){
            return <a className="responsiveLinkTx" href={`https://goerli.etherscan.io/tx/${Tx}`} target="_blank">{Tx}</a>
        } else if(chainID == bnb_chain){
            return <a className="responsiveLinkTx" href={`https://testnet.bscscan.com/tx/${Tx}`} target="_blank">{Tx}</a>
        }
    }

    const skip = () => {
        handleNext()
    }

    const handleDateChange = (sD, eD) => {
        // console.log(this.startDate)
        if(sD != null){
            setStartDate(Math.floor(sD.getTime() / 1000))
        }

        // console.log(this.endDate)
        if(eD != null){
            setEndDate(Math.floor(eD.getTime() / 1000))
        }
    }

    const getNbrStep = () => {                    
        if(raisingMethod == "USDC" || raisingMethod == "b_BUSD")
            return 0.000001
        if(raisingMethod == "ETH" || raisingMethod == "b_BNB")
            return 0.000000000000000001
        if(raisingMethod == "BBST" || raisingMethod == "b_BBST")
            return 0.000000000000000001
    }

    const showNextBtnDate = () => {
        if(startDate !== null && endDate !== null){
            return <Button variant="contained" onClick={handleNext}>Next</Button>
        }
    }

    const showNextBtnMethods = () => {
        if(goal > 0){
            return <Button style={{marginTop: 10}} variant="contained" onClick={handleNext}>Next</Button>
        }
    }

    const steps = ['Select duration', 'Set currency & objective', 'Create smart-contract instance', 'Upload data']
    const getStepContent = (step) => {
        switch (step) {
          case 0:
            return <StepContent>
            <p>Select the duration of your campaign</p>
            <div><DateValidPicker handleDateChange={handleDateChange}/></div>
            {showNextBtnDate()}
          </StepContent>
          case 1:
            return <StepContent>
            <p>Select in which cryptocurrency you wish to raise money in, and enter the amount you wish to raise</p>
            <div className="form-group">
                <div className="order-details">
                    {displayRaisingMethods()}
                </div>
            </div>
            <input type="number" placeholder="Goal" min="0" step={getNbrStep()} className="form-control" style={{maxWidth: 250}} onChange={(event) => {
                setGoal(event.target.value)
            }}/>
            {showNextBtnMethods()}
          </StepContent>
          case 2:
            return <StepContent>
            <p>Please confirm the transaction on your wallet and wait for blockchain confirmation. This is the only blockchain transaction you will need to do.</p>
            {showCreateCampBtn()}
          </StepContent>
          case 3:
            return <StepContent>
            <p>Please wait during upload...</p>
          </StepContent>
        //   case 4:
        //     return <StepContent>
        //     <p>Click on the button to update your profile as displayed</p>
        //     <Chip style={{marginTop:-5, maxWidth:'100%'}} avatar={<Avatar alt='avatar' src={campaign.creator_img} />} label={<div style={{
        //                                                   alignItems:'center',
        //                                                   width: '100%',
        //                                                   whiteSpace: 'nowrap',
        //                                                   overflow: 'hidden',
        //                                                   textOverflow: 'ellipsis',
        //                                                   fontSize : "14px",
        //                                                   fontStyle: 'italic'
        //                                               }}>{campaign.creator_name} </div>}/>
        //     <div style={{marginTop: 10}} ><Button variant="contained" onClick={updateProfile}>Update</Button>
        //     <Button onClick={skip}>Skip</Button></div>
        //   </StepContent>
          default:
            return <StepContent>
            <p>Unknown step</p>
            </StepContent>
        }
      }

      const showCreateCampBtn = () => {
        if(!onCreation){
            return <Button onClick={createContract}>Create</Button>
        }
      }

      const handleNext = () => {
        console.log(activeStep)
        setActiveStep(activeStep + 1);
      };
      
      const getLabelIcon = (i) => {
        if(i === activeStep){
            if(i == 2 && onCreation || i == 3){
                return <CircularProgress style={{color:'black', width: 25, height:25}}/>
            } else {
                return i+1
            }
        } 
        else if(i < activeStep) return <CheckCircle/>
        else if(i > activeStep) return i+1

      }

    const displayStepper = () => {
        return (
            <div >
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel icon={getLabelIcon(index)}>{label}</StepLabel>
                    {getStepContent(index)}
                    
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
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


    const displayRaisingMethods = () => {
        if(chainID == chain){
            return <div className="payment-method">
            <p>
                <input type="radio" id="usdc" name="radio-group" value="USDC" checked={raisingMethod == "USDC"} onChange={(event) => {
                    setRaisingMethod(event.target.value)
                }}/>
                <label htmlFor="usdc">USDC (3.5% fee)</label>
            </p>
            <p>
                <input type="radio" id="eth" name="radio-group" value="ETH" checked={raisingMethod == "ETH"} onChange={(event) => {
                    setRaisingMethod(event.target.value)
                }}/>
                <label htmlFor="eth">ETH (3.5% fee)</label>
            </p>
            {/* <p>
                <input type="radio" id="bbst" name="radio-group" value="BBST" checked={this.state.raisingMethod == "BBST"} onChange={(event) => {
                    setRaisingMethod(event.target.value)
                }}/>
                <label htmlFor="bbst">BBST (0% fee)</label>
            </p> */}
        </div>
        } else if(chainID == bnb_chain){
            return <div className="payment-method">
            {/* <p><i>Please keep in mind this campaign will be on BNB Smart Chain network.</i></p> */}
            <p>
                <input type="radio" id="bnb_busd" name="bnb_radio-group" value="b_BUSD" checked={raisingMethod == "b_BUSD"} onChange={(event) => {
                    setRaisingMethod(event.target.value)
                }}/>
                <label htmlFor="bnb_busd">BUSD</label>
            </p>
            <p>
                <input type="radio" id="bnb_bnb" name="bnb_radio-group" value="b_BNB" checked={raisingMethod == "b_BNB"} onChange={(event) => {
                    setRaisingMethod(event.target.value)
                }}/>
                <label htmlFor="bnb_bnb">BNB</label>
            </p>
            {/* <p>
                <input type="radio" id="bnb_bbst" name="bnb_radio-group" value="b_BBST" checked={this.state.raisingMethod == "b_BBST"} onChange={(event) => {
                    setRaisingMethod(event.target.value)
                }}/>
                <label htmlFor="bnb_bbst">BBST (0% fee)</label>
            </p> */}
        </div>
        }
    }

    const imCreator = () => {
        setDialogState(0)
        handleDialogOpen()
    }

    async function getFactory(){
        if(chainID == chain){
            return new web3Instance.eth.Contract(campaignFactoryAbi.campaignFactoryAbi, campaignFactoryAddr.campaignFactoryAddr)
        } else if(chainID == bnb_chain){
            return new web3Instance.eth.Contract(campaignFactoryAbi.campaignFactoryAbi, bnb_campaignFactoryAddr.bnb_campaignFactoryAddr)
        }
    }

    const updateProfile = () => {
       
        db.collection('profile').doc(userAddr).update({username:campaign.creator_name, image:campaign.creator_img}).then(() => {
            let newus = currentUser
            newus.username = campaign.creator_name
            newus.image = campaign.creator_img
            setActiveStep(4)
            dispatch({
                type: 'SET_CURRENT_USER',
                id: newus
            })
		}).catch((err) => {
			console.log(err);
		})
    }


    async function createContract(){
        setOnCreation(true)
        //     const bigMultiplier = new BN('1000000000000000000')
             let amt = 0
             let tierAmountArray = []  
             
             if(raisingMethod != "ETH" && raisingMethod != "b_BNB"){
                 let erc20Ctr = undefined
                 if(raisingMethod == "USDC"){
                     erc20Ctr = new web3Instance.eth.Contract(erc20standardAbi, usdcAddr)
                 } else if(raisingMethod == "BBST"){
                     erc20Ctr = new web3Instance.eth.Contract(bbstAbi, bbstAddr)
                 } else if(raisingMethod == "b_BBST"){
                     erc20Ctr = new web3Instance.eth.Contract(bbstAbi, bnb_bbstAddr)
                 } else if(raisingMethod == "b_BUSD"){
                     erc20Ctr = new web3Instance.eth.Contract(erc20standardAbi, bnb_busdAddr)
                 }
     
                 if(erc20Ctr != undefined){
                     await erc20Ctr.methods.decimals().call().then((decimals) => {     
                         amt = toBaseUnit(goal.toString(), decimals, web3Instance.utils.BN)               
                         // console.log("amount", amt)
                       //  tierAmountArray = this.tiersArray.map(a => a.threshold * 10**decimals) 
                         tierAmountArray = campaign.tiers.map(a => toBaseUnit(a.threshold.toString(), decimals, web3Instance.utils.BN))
                         // console.log(tierAmountArray)
                     })
                 } else {
                     throw "erc20 contract instance not defined"
                 }
             } else {        // <=> campagne en ETH ou MATIC
                 tierAmountArray = campaign.tiers.map(a => web3Instance.utils.toWei(a.threshold.toString()))
                 amt = web3Instance.utils.toWei(goal.toString())
             }
     
             let tierStockArray = campaign.tiers.map(a => a.maxClaimers)
             let am0 = [0]
             let st0 = [-1]
             let amountArray = am0.concat(tierAmountArray)
             let stockArray = st0.concat(tierStockArray)
             let tokenAdd = tokenIndex(raisingMethod)
             let factoryInstance = await getFactory()
            
             return await factoryInstance.methods.createCampaign(
             amt, // WEI for ETH, x 10^decimals
             parseInt(startDate), 
             parseInt(endDate), 
           //  this.flexible, 
             parseInt(tokenAdd),
             amountArray,
             stockArray
             )
             .send({from : userAddr, value: 0})
             .on('transactionHash', function(hash){
                //  console.log("hash :" + hash)
                 setTx(hash);
                 // ethInstance.getTransactionReceipt(hash).then(console.log);
             })
             .on('confirmation', function(confirmationNumber, receipt){
     
                //  console.log("Confirmation number:" + confirmationNumber)
             })
             .on("error", function(error) {
                //  context.setState({ errorMsg: error.code + " : " + error.message})
                //  context.openSnackbar()
                 console.log(error);
                 setOnCreation(false)
             })
             .then(a => {
                 createFirebaseObject(a.events.CampaignCreated.returnValues[0].toLowerCase())
                 }
             )
         }

    const tokenIndex = (currency) => {
        if(currency == "USDC" || currency == "b_BUSD")
            return 0
        if(currency == "ETH" || currency == "b_BNB")
            return 1
        if(currency == "BBST" || currency == "b_BBST")
            return 2
    }

    const createFirebaseObject = (contract_address) => {
        handleNext()
    
                const campainInfos = {
                    title: campaign.title,
                    start_date: startDate,
                    end_date: endDate,
                    contract_address: contract_address,
                    small_description: campaign.small_description,
                    categories: campaign.categories,
                    objective: goal,
                    long_desc: campaign.long_desc,
                    currency: raisingMethod,
                 //   flexible: this.flexible,
                    tiers: campaign.tiers,
                    network: chainID,
                    main_img: campaign.main_img,
                    raised: 0,
                    likedTupleMap: {},
                    confirmed: null,
                    creator: userAddr
                }
                               
                db.collection('campaignsBNB').doc(prefixedAddress(chainID, contract_address)).set(campainInfos).then(() => {
                    updateProfile()
                    // handleNext()    
                    // setActiveStep(4)

                }).catch((err) => console.log(err.message))
    }

    const displayContent = () => {
        if(campaign != undefined){
          let us = {bio: "", eth_address: "", image:campaign.creator_img, liked:[], site:"", twitter:"", username:campaign.creator_name, verified: false}
            return <div>
            <div className="blog-details-area ptb-80">
                <div className="container">
                    <div className="about-area ptb-80">
                        <div className="container-fluid">
                            <div className="row align-items-center">

                              <div className="preBlock">
                                <div style={{flex: 1.5, textAlign:"center"}}><Icon.AlertCircle /> &nbsp; Unfortunately, the creator has not enabled crypto donations yet.</div>
                                <div className="preBtns" style={{display:'flex', justifyContent:'space-around', flex:1 }}>
                                    <Button onClick={contactCreator} startIcon={<SendIcon />} size="large" style={{marginRight: 7.5, textTransform: 'inherit', color:'white', backgroundColor:'#c47be4'}} variant="contained">Contact creator</Button>
                                    <Button onClick={imCreator} style={{textTransform: 'inherit', marginLeft: 7.5}} startIcon={<AssignmentIndIcon />} size="small" variant="outlined">I'm the creator</Button>
                                </div>
                              </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-img">
                                        <img src={campaign.main_img} alt="image" />
                                        
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-content">

                                        <span className="sub-title" style={{marginBottom: 10}}>{showCats()}</span>
                                        {/* <ShareIcons campaign={campaign}/> */}

                                        

                                        <h2 style={{marginTop: 0, marginBottom: 10}}>{campaign.title}</h2>
                                         <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        
                                                    <li style={{maxWidth: '85%'}}>
                                                        <span style={{display:'flex', alignItems:'center'}}> <Icon.User />
                                                        <Chip style={{maxWidth:'100%'}} avatar={<Avatar alt='avatar' src={campaign.creator_img} />} label={<div style={{
                                                          alignItems:'center',
                                                          width: '100%',
                                                          whiteSpace: 'nowrap',
                                                          overflow: 'hidden',
                                                          textOverflow: 'ellipsis',
                                                          fontSize : "14px",
                                                          fontStyle: 'italic'
                                                      }}>{campaign.creator_name} </div>}/>
                                                            </span>     
                                                           
                   
                                                        </li>
                                                        {/* <VerifTooltip toBeChecked={user.verified}/> */}

                                                        
                                                  
                                                        {/* {showTwitter()} */}

                                                    </ul>
                                                   
                                                </div>              
                                            </div>
                                        </div>
                                        <div className="bar"></div>
                                    
                                        <p style={{fontSize: 15, marginBottom: 30}}>{campaign.small_description}</p>
                                        <h5 className="justandtextcenter" style={{display:"flex"}}>{displayRaised()} {displayCurrency()}</h5> 
                                        {displayObjective()}
                                        {displayProgressBar()}
                                        <div className="blog-details-desc justandtextcenter">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                      
                                                    <ul>
                                                        {/* <li style={{color:'#6084a4'}}>
                                                            <Icon.AlertCircle /> Unfortunately, the creator has not enabled donations in crypto yet.
                                                        </li> */}
                                                        {/* <li>
                                                            <Icon.Globe /> Network : {showNetwork()}
                                                        </li> */}
                                                            {showOrigin()}
                                                        
                                                    </ul>                                                 


                                                </div>              
                                            </div>
                                        </div>

                                        <div className="justandtextcenter">
                                            {BackButton()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Dialog
                        className='dialogResponsive'
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        {insideDialog()}
                    </Dialog>

                   

                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="blog-details-desc">

                                <div className="article-content">  

                                
                                <div className="separator"></div>
                                    <div id="htmlDisplay">
                                        {ShowTxt()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            <PreCampaignSidebar project = {campaign}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    } else {
                // return <CircularProgress style={{marginTop: 100}}/>
                return <div>
            <div className="blog-details-area ptb-80">
                <div className="container">
                    <div className="about-area ptb-80">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-img">
                                        <Skeleton animation='pulse' variant="rect" height={350} />

                                        
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-content">

                                        <span className="sub-title">
                                            <Skeleton animation='pulse' variant="text" width={100}/>
                                        </span>
                                        {/* <ShareIcons campaign={campaign}/> */}

                                        <h2 style={{marginTop: 20, marginBottom: 10}}><Skeleton animation='pulse' variant="text"/></h2>
                                         <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        
                                                        {/* <li>     
                                                            <Icon.User />
                                                            <ChipUser user={user}/>
                                                                                             
                                                        </li> */}
                                                        
                                                  
                                                        <Skeleton animation='pulse' variant="text" />
                                                        <Skeleton animation='pulse' variant="text" />
                                                    </ul>
                                                </div>              
                                            </div>
                                        </div>
                                        <div className="bar"></div>

                                    
                                        <p style={{fontSize: 15, marginBottom: 30}}><Skeleton animation='pulse' variant="text" /><Skeleton animation='pulse' variant="text" /><Skeleton animation='pulse' variant="text" /></p>
                                        <h5><Skeleton animation='pulse' variant="text" /></h5> 
                                        <ProgressBar animated now={0}/>
                                        <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        <li>
                                                            <Skeleton animation='pulse' variant="text" width={50}/>
                                                        </li>
                                                    </ul>
                                                </div>              
                                            </div>
                                        </div>

                                        <div style={{display: "flex"}}>
                                            {/* {BackButton()}
                                            {RefundButton()}

                                            
                                            {showHeart()}          */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                   

                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="blog-details-desc">

                                <div className="article-content">  

                                
                                <div className="separator"></div>
                                    <Skeleton variant="rect" animation='pulse' height={550}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            <div className="widget-area" id="secondary">
                                <div className="widget widget_startp_posts_thumb">
                                    <div>

                                        <h3 className="widget-title"><Skeleton variant="text" animation='pulse'/></h3>
                                        <Skeleton variant="rect" animation='pulse' height={150}/>
                                        <br></br>
                                        <Skeleton variant="rect" animation='pulse' height={150}/>
                                        <br></br>
                                        <Skeleton variant="rect" animation='pulse' height={150}/>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }



    return (
        <>
            {/* <Navbar /> */}
            
            {/* <PageBanner pageTitle={campaign.title}/> */}

            
            {displayContent()}

            <Footer />
        </>
    )
}

export default PreCampaign



export async function getServerSideProps (context) {
//   console.log(context.query) 
  // returns { id: episode.itunes.episode, title: episode.title}
  

  //you can make DB queries using the data in context.query
  return {
      props: { 
         address: context.query.id.toLowerCase() //pass it to the page props
      }
  }
}