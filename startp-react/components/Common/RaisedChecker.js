import React from 'react';
import { campaignAbi } from '@/components/ContractRelated/CampaignAbi';
import { useSelector, useDispatch } from 'react-redux';
import { toBaseUnit } from '@/utils/bnConverter';
import {usdcAddr} from '@/components/ContractRelated/USDCAddr';
import {bbstAddr} from '@/components/ContractRelated/BbstAddr';
import { erc20standardAbi } from '../ContractRelated/ERC20standardABI';

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
          else if(props.currency = "BBST")
            erc20Ctr = new web3Instance.eth.Contract(erc20standardAbi, bbstAddr)
          erc20Ctr.methods.decimals().call().then((decimals) => {
            setRaisedAndCB(parseFloat((res * 10**(-decimals)).toFixed(decimals)))
          })
        }
      })
    }
  }, [web3Instance])

  const setRaisedAndCB = (value) => {
    setRaisedValue(value)
    if(props.callback != undefined){
      props.callback(value)
    }
  }

  return raisedValue
}

export default RaisedChecker;
