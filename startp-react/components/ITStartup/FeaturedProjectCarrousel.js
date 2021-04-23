import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import Projects from '@/components/MachineLearning/Projects'

const FeaturedProjectCarrousel = () => {
    return (
        <div className="boxes-area">
			<div className="container">
				<div className="row">

                    <Projects/>
				</div>
			</div>
		</div>
    )
}

export default FeaturedProjectCarrousel;
