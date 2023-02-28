import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import NFTList from '../MachineLearning/NFTList';

const CarouselNFT = (props) => {
    return (
        <div className="boxes-area" style={{marginTop: 0}}>
			<div className="container">
				<div className="row"
				//  style={{ border : "3px solid #d84b53c7", borderRadius:25}}
				 >
					<h6 style={{textAlign:'center', paddingTop: 15, paddingBottom: 10}}>Buy NFTs from {props.campaign.name}</h6>

                    <NFTList/>
				</div>
			</div>
		</div>
    )
}

export default CarouselNFT;
