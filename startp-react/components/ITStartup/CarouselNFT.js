import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import NFTList from '../MachineLearning/NFTList';

const CarouselNFT = () => {
    return (
        <div className="boxes-area" style={{marginTop: 0, paddingBottom: 0}}>
			<div className="container">
				<div className="row">

                    <NFTList/>
				</div>
			</div>
		</div>
    )
}

export default CarouselNFT;
