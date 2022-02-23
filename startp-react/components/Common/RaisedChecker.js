import React from 'react';
import { campaignAbi } from '@/components/ContractRelated/CampaignAbi';
import { useSelector, useDispatch } from 'react-redux';


const RaisedChecker = (props) => {

  const web3Instance = useSelector((state) => state.web3Instance)
  const [raisedValue, setRaisedValue] = React.useState(null)

  React.useEffect(() => {
    if(web3Instance != undefined){
      let ctr = new web3Instance.eth.Contract(campaignAbi, props.address)
      let r = ctr.methods.raised.call().call().then(res => {        // anciennement totalBalance
        let raised = res
        if(props.currency == "ETH"){
          raised = web3Instance.utils.fromWei(res, 'ether')
        }
        setRaisedValue(raised)
        if(props.callback != undefined){
          props.callback(raised)
        }
      })
    }
  }, [web3Instance])

  return raisedValue
}

export default RaisedChecker;
