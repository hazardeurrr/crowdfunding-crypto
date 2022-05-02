import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';

const Features = () => {
    return (
        <div className="boxes-area">
			<div className="container">
				<div className="row">
					<div className="col-lg-3 col-md-6">
						<div className="single-box">
							<div className="icon">
                                <Icon.DollarSign />
							</div>

							<h3>
								<Link href="/feature-details">
									<a>Low fees</a>
								</Link>
							</h3>

							<p>Most of the crowdfunding platforms charge 5% fees + payment fees. We charge only 1% to keep the project alive.</p>
						</div>
					</div>

					<div className="col-lg-3 col-md-6">
						<div className="single-box bg-f78acb">
							<div className="icon">
                                <Icon.Code />
							</div>

							<h3>
								<Link href="/feature-details">
									<a>Blockchain based</a>
								</Link>
							</h3>

							<p>We use blockchain. We never touch the money : smart contract rules it all.</p>
						</div>
					</div>

					<div className="col-lg-3 col-md-6">
						<div className="single-box bg-c679e3">
							<div className="icon">
                                <Icon.Users />
							</div>

							<h3>
								<Link href="/feature-details">
									<a>Easy to use</a>
								</Link>
							</h3>

							<p>Create a campaign in 2 minutes, contribute in 1. Everyone can raise fund and everyone can support anyone.</p>
						</div>
					</div>

					<div className="col-lg-3 col-md-6">
						<div className="single-box bg-eb6b3d">
							<div className="icon">
                                <Icon.CheckCircle />
							</div>

							<h3>
								<Link href="/feature-details">
									<a>ETH and USDC supported</a>
								</Link>
							</h3>

							<p>Raise funds in Ether or USDC.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Features;
