import React from 'react';
import * as Icon from 'react-feather';

const ComingSoon = () => {
	const [days, setDays] = React.useState('');
    const [hours, setHours] = React.useState('');
    const [minutes, setMinutes] = React.useState('');
    const [seconds, setSeconds] = React.useState('');

    React.useEffect(() => {
        const interval = setInterval(() => { 
            commingSoonTime();
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    const commingSoonTime = () => {
        let endTime = new Date("August 23, 2022 17:00:00 PDT");
        let endTimeParse = (Date.parse(endTime)) / 1000;
        let now = new Date();
        let nowParse = (Date.parse(now) / 1000);
        let timeLeft = endTimeParse - nowParse;
        let days = Math.floor(timeLeft / 86400); 
        let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    }

    return (
        <div className="coming-soon-area">
			<div className="d-table">
				<div className="d-table-cell">
					<div className="container">
						<div className="coming-soon-content">
                            <h1>Under Construction</h1>
                            <p>Our website is currently undergoing scheduled maintenance. We Should be back shortly. Thank you for your patience.</p>

                            <form>
								<input type="email" className="email-input" placeholder="Enter email address" name="email" required />
			
								<button type="submit" className="submit-btn">
									Notify Me
								</button>
							</form>

							<div id="timer">
                                <div id="days">
                                    {days} <span>Days</span>
                                </div>
                                <div id="hours">
                                    {hours} <span>Hours</span>
                                </div>
                                <div id="minutes">
                                    {minutes} <span>Minutes</span>
                                </div>
                                <div id="seconds">
                                    {seconds} <span>Seconds</span>
                                </div>
                            </div>
						</div>
					</div>
				</div>
			</div>

            <ul className="social-list">
                <li className="list-heading">Follow us for update:</li>
                <li>
                    <a href="#" className="facebook" target="_blank">
                        <Icon.Facebook />
                    </a>
                </li>
                <li>
                    <a href="#" className="twitter" target="_blank">
                        <Icon.Twitter />
                    </a>
                </li>
                <li>
                    <a href="#" className="linkedin" target="_blank">
                        <Icon.Linkedin />
                    </a>
                </li>
                <li>
                    <a href="#" className="instagram" target="_blank">
                        <Icon.Instagram />
                    </a>
                </li>
            </ul>
		</div>
    )
}

export default ComingSoon;