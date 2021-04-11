import React from 'react';

const PageBanner = ({pageTitle}) => {
    return (
        <div className="page-title-area">
            <div className="d-table">
                <div className="d-table-cell">
                    <div className="container">
                        <h2>{pageTitle}</h2>
                    </div>
                </div>
            </div>

            {/* Shape Images */}
            <div className="shape1">
                <img src="/images/shape1.png" alt="shape" />
            </div>
			<div className="shape2 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
			<div className="shape3">
                <img src="/images/shape3.svg" alt="shape" />
            </div>
			<div className="shape4">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
			<div className="shape5">
                <img src="/images/shape5.png" alt="shape" />
            </div>
			<div className="shape6 rotateme">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
			<div className="shape7">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
			<div className="shape8 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
        </div>
    );
}

export default PageBanner;