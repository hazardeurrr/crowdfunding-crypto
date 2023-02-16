import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import ProjectsCrea from '@/components/MachineLearning/ProjectsCrea'

const CarouselCrea = () => {
    return (
        <div className="boxes-area" style={{marginTop: 130, paddingBottom: 0}}>
			<div className="container">
				<div className="row">

                    <ProjectsCrea/>
				</div>
			</div>
		</div>
    )
}

export default CarouselCrea;
