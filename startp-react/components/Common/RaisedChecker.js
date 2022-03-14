import React from 'react';
import { campaignAbi } from '@/components/ContractRelated/CampaignAbi';
import { useSelector, useDispatch } from 'react-redux';
import { toBaseUnit } from '@/utils/bnConverter';
import {usdcAddr} from '@/components/ContractRelated/USDCAddr';
import {bbstAddr} from '@/components/ContractRelated/BbstAddr';
import { erc20standardAbi } from '../ContractRelated/ERC20standardABI';
import { bbstAbi } from '../ContractRelated/BbstAbi';
const BN = require('bn.js');

const RaisedChecker = (props) => {

  const web3Instance = useSelector((state) => state.web3Instance)
  const [raisedValue, setRaisedValue] = React.useState(null)

  React.useEffect(() => {
    if(web3Instance != undefined){
      let ctr = new web3Instance.eth.Contract(campaignAbi, props.address)
      let r = ctr.methods.raised.call().call().then(res => {        
        if(props.currency == "ETH"){
          setRaisedAndCB(web3Instance.utils.fromWei(res, 'ether'))
        } else {
          let erc20Ctr = undefined
          if(props.currency == "USDC")
            erc20Ctr = new web3Instance.eth.Contract(erc20standardAbi, usdcAddr)
          else if(props.currency == "BBST")
            erc20Ctr = new web3Instance.eth.Contract(bbstAbi, bbstAddr)
          erc20Ctr.methods.decimals().call().then((decimals) => {
            console.log(res)
            setRaisedAndCB(parseFloat((res / (10**(decimals))).toFixed(decimals)))
          })
        }
      })
    }
  }, [web3Instance])

  const setRaisedAndCB = (value) => {
    setRaisedValue(value)
    if(props.callback != undefined){
      console.log(value)
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
