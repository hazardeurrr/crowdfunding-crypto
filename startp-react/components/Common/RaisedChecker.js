import React from 'react';
import { campaignAbi } from '@/components/ContractRelated/CampaignAbi';
import { useSelector, useDispatch } from 'react-redux';
import { toBaseUnit } from '@/utils/bnConverter';
import {usdcAddr} from '@/components/ContractRelated/USDCAddr';
import {bbstAddr} from '@/components/ContractRelated/BbstAddr';
import {bnb_busdAddr} from '@/components/ContractRelated/bnb_busdAddr';
import {bnb_bbstAddr} from '@/components/ContractRelated/bnb_BbstAddr';
import { erc20standardAbi } from '../ContractRelated/ERC20standardABI';
import { bbstAbi } from '../ContractRelated/BbstAbi';
import {chain} from '@/utils/chain';
import {bnb_chain} from '@/utils/bnb_chain'

const BN = require('bn.js');

const RaisedChecker = (props) => {


  const web3Instance = useSelector((state) => state.web3Instance)
  const eth_web3Instance = useSelector((state) => state.eth_web3Instance)
  const bnb_web3Instance = useSelector((state) => state.bnb_web3Instance)
  const [raisedValue, setRaisedValue] = React.useState(null)
  var now = Date.now() / 1000;

  const [web3, setweb3] = React.useState(undefined)

  

  React.useEffect(() => {
    // console.log("inRaiseChecker")
    if(props.campaign.network == chain)
      setweb3(eth_web3Instance)
    if(props.campaign.network == bnb_chain)
      setweb3(bnb_web3Instance)
    
    if(web3 != undefined){
      let ctr = new web3.eth.Contract(campaignAbi, props.campaign.contract_address)

      if(props.campaign.currency == "ETH" || props.campaign.currency == "b_BNB"){
        web3.eth.getBalance(props.campaign.contract_address).then(
          r0 => {
            callRaiseCheck(r0, ctr)
          }
        )
      } else {
        let erc20Ctr = undefined
        if(props.campaign.currency == "USDC")
          erc20Ctr = new web3.eth.Contract(erc20standardAbi, usdcAddr)
        else if(props.campaign.currency == "BBST")
          erc20Ctr = new web3.eth.Contract(bbstAbi, bbstAddr)
        else if(props.campaign.currency == "b_BUSD")
          erc20Ctr = new web3.eth.Contract(erc20standardAbi, bnb_busdAddr)
        else if(props.campaign.currency == "b_BBST")
          erc20Ctr = new web3.eth.Contract(bbstAbi, bnb_bbstAddr)

        
        erc20Ctr.methods.balanceOf(props.campaign.contract_address).call().then(r1 => {
            callRaiseCheck(r1, ctr)
        })
      }
    }
    return () => {
      setRaisedValue(null); // This worked for me
      setweb3(undefined)
    };
  }, [web3Instance, bnb_web3Instance, eth_web3Instance, web3])

  const callRaiseCheck = (contractBalance, ctr) => {
    if(props.campaign.end_date < now && contractBalance == 0){
      getRaised(ctr)
    } else {
      convertAndSet(contractBalance)
    }
  }

  const getRaised = (ctr) => {
    ctr.methods.raised.call().call().then(res => {
      convertAndSet(res)
    })
  }

  const convertAndSet = (res) => {
    if(props.campaign.currency == "ETH" || props.campaign.currency == "b_BNB"){
          setRaisedAndCB(web3.utils.fromWei(res.toString(), 'ether'))
        } else {
          let erc20Ctr = undefined
          if(props.campaign.currency == "USDC")
            erc20Ctr = new web3.eth.Contract(erc20standardAbi, usdcAddr)
          else if(props.campaign.currency == "BBST")
            erc20Ctr = new web3.eth.Contract(bbstAbi, bbstAddr)
          else if(props.campaign.currency == "b_BUSD")
            erc20Ctr = new web3.eth.Contract(erc20standardAbi, bnb_busdAddr)
          else if(props.campaign.currency == "b_BBST")
            erc20Ctr = new web3.eth.Contract(bbstAbi, bnb_bbstAddr)

          erc20Ctr.methods.decimals().call().then((decimals) => {
            setRaisedAndCB(parseFloat((res / (10**(decimals))).toFixed(decimals)))
          })
        }
  }

  const setRaisedAndCB = (value) => {
    setRaisedValue(value)
    if(props.callback != undefined){
      props.callback(value)
    }
  }

  const returnValueWithDec = () => {
    if(props.decToShow == undefined || raisedValue == null || raisedValue == undefined || raisedValue == 0 || props.decToShow < 1){
      return raisedValue
    } else {
      return truncateVal(raisedValue, props.decToShow)
    }
  }

  const truncateVal = (num, decimals) => {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (decimals || -1) + '})?');
    return parseFloat(num.toString().match(re)[0]);
  }

  return returnValueWithDec()
}

export default RaisedChecker;
