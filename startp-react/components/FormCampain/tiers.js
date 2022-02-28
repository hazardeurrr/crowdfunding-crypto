import React from 'react';
import Claimers from './claimers';

class Tiers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tiers: [],
            tiersInfos: [],
        }
        this.tiers = []
    }

    handleTiers(event) {
        event.preventDefault()
        const listTiers = []
        this.tiers = []
        let index_tiers = 0
        for (var i = 1; i <= event.target.value; i++) {
            listTiers.push({index: i, description: ''})
            this.tiers.push({
                title: "",
                threshold: 0,
                description: "",
                maxClaimers: -1,
            })
        }
        this.setState({tiers: listTiers})
    }

    render() {

        return (
            <>
            <div className="col-lg-12 col-md-12">
                <div className="form-group">
                        <select className="form-select" id='categorySelected' onChange={this.handleTiers.bind(this)}>
                            {[0, 1, 2, 3, 4, 5].map(i => <option value={i}>{i}</option>)}
                        </select>
                    </div>
            </div>
                {
                    this.state.tiers.map((elt, index) => {
                        return (
                            <div>
                                <strong>Tier {index + 1}</strong>
                                <p>Title for the tier<br/>
                                Give us a description of the tier :
                                </p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                    <input type="text" id={`"tiersTitle${index + 1}`} placeholder="Title" className="form-control" onChange={e => {
                                        this.tiers[index]["title"] = e.target.value
                                        this.props.onTiersChange(this.tiers)
                                    }}/>
                                </div>

                                <p>
                                Amount :
                                </p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                    <input type="number" id={`"tiersAmount${index + 1}`} placeholder="Amount" min="0" step={this.props.step} className="form-control"
                                    onChange={e => {
                                        this.tiers[index]["threshold"] = e.target.value
                                        this.props.onTiersChange(this.tiers)
                                    }}/>
                                    </div>
                                </div>
                                </div>
                                <p>Advantage<br/>
                                Give us a description of the tier :
                                </p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                    <input type="textarea" id={`"tiersDescription${index + 1}`} placeholder="Description" className="form-control"
                                    onChange={e => {
                                        this.tiers[index]["description"] = e.target.value
                                        this.props.onTiersChange(this.tiers)
                                    }}/>
                                    </div>
                                </div>
                                <p>Quantity<br/>
                                Do you want to restreint the number of claimers for this plan ? :
                                </p>

                                <Claimers index={index} onClaimersChange={e => {
                                        this.tiers[index]["maxClaimers"] = parseInt(e)
                                    }} />

                                
                            </div>
                        )
                    })
                }
            </>
        )    

    }
}
export default Tiers;