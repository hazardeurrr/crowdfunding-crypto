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
  var now = Date.now() / 1000;

  React.useEffect(() => {
    if(web3Instance != undefined){
      let ctr = new web3Instance.eth.Contract(campaignAbi, props.address)

      if(props.currency == "ETH"){
        web3Instance.eth.getBalance(props.address).then(
          r0 => {
            callRaiseCheck(r0, ctr)
          }
        )
      } else {
        let erc20Ctr = undefined
        if(props.currency == "USDC")
          erc20Ctr = new web3Instance.eth.Contract(erc20standardAbi, usdcAddr)
        else if(props.currency == "BBST")
          erc20Ctr = new web3Instance.eth.Contract(bbstAbi, bbstAddr)
        
        erc20Ctr.methods.balanceOf(props.address).call().then(r1 => {
            callRaiseCheck(r1, ctr)
        })
      }
    }
  }, [web3Instance])

  const callRaiseCheck = (contractBalance, ctr) => {
    if(props.end_date < now && contractBalance == 0){
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
    if(props.currency == "ETH"){
          setRaisedAndCB(web3Instance.utils.fromWei(res.toString(), 'ether'))
        } else {
          let erc20Ctr = undefined
          if(props.currency == "USDC")
            erc20Ctr = new web3Instance.eth.Contract(erc20standardAbi, usdcAddr)
          else if(props.currency == "BBST")
            erc20Ctr = new web3Instance.eth.Contract(bbstAbi, bbstAddr)
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
