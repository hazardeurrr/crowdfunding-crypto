import React from 'react';

const DomainSearch = () => {
    return (
        <div className="domain-search-area ptb-80">
            <div className="container">
                <div className="domain-search-content">
                    <h2>Find Your Best Domain Name</h2>
                    <form>
                        <input type="text" className="form-control" name="domain-search" id="domain-search" placeholder="Search domain name here" />

                        <div className="domain-select">
                            <select className="form-select">
                                <option>.com</option>
                                <option>.net</option>
                                <option>.xyz</option>
                                <option>.tech</option>
                                <option>.club</option>
                                <option>.space</option>
                                <option>.global</option>
                                <option>.edu</option>
                            </select>
                        </div>

                        <button type="submit">Search</button>
                    </form>

                    <ul className="domain-price">
                        <li>.com<br />$ 9.88</li>
                        <li>.net<br />$ 7.88</li>
                        <li>.xyz<br />$ 3.88</li>
                        <li>.tech<br />$ 5.28</li>
                        <li>.club<br />$ 2.38</li>
                        <li>.space<br />$ 4.98</li>
                        <li>.global<br />$ 8.99</li>
                        <li>.edu<br />$ 6.88</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DomainSearch;
