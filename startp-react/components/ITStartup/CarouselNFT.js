import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import NFTList from '../MachineLearning/NFTList';
import { useSelector, useDispatch } from 'react-redux';
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'

const CarouselNFT = (props) => {

	const bnb_web3Instance = useSelector((state) => state.bnb_web3Instance)
	const eth_web3Instance = useSelector((state) => state.eth_web3Instance)
	const [nfts, setNts] = React.useState([])
	const campaign = props.campaign

	React.useEffect(() => {
		getNFTs()
	}, [bnb_web3Instance, eth_web3Instance])

	const getNFTs = async() => {
		var web3 = null
		if(campaign.network == chain){
				web3 = eth_web3Instance
		} else if (campaign.network == bnb_chain){
				web3 = bnb_web3Instance
		}
		if(web3){
				const campCtrInstance = new web3.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
				let nftArray = []
				let i = 1
				let stop = false
				do {
					let s = await campCtrInstance.methods.getUploadedNFT(i).call().then(res => {
						if(res.tokenURI.length == 0){
							stop = true
						} else {
							if(res.quantity > 0){
								nftArray.push(res)
							}
						}
						i = i + 1
					})
				} while(!stop)
				setNts(nftArray)
			
		}        
	}

	const showOrNot = () => {
		if(nfts.length > 0){
			return <div className="boxes-area" style={{marginTop: 0}}>
				<div className="container">
					<div className="row">
						<h6 style={{textAlign:'center', paddingTop: 15, paddingBottom: 10}}>Buy NFTs from {props.campaign.name}</h6>
							<NFTList campaign={campaign} nfts={nfts}/>
					</div>
				</div>
			</div>
		} else return null
	}

	return (
		showOrNot()
	)
}

export default CarouselNFT;
