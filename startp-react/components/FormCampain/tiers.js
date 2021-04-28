import React from 'react';

class Tiers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tiers: [],
            tiersInfos: []
        }
    }

    handleTiers(event) {
        event.preventDefault()
        const listTiers = []
        for (var i = 0; i < event.target.value; i++) {
            listTiers.push({index: i, description: ''})
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
                                    <input type="text" id={`"tiersTitle${index + 1}`} placeholder="Title" className="form-control"/>
                                </div>

                                <p>
                                <br/>
                                Amount :
                                </p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                    <input type="number" id={`"tiersAmount${index + 1}`} placeholder="Amount" min="0" className="form-control"/>
                                    </div>
                                </div>
                                </div>
                                <p>Advantage<br/>
                                Give us a description of the tier :
                                </p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                    <input type="textarea" id={`"tiersDescription${index + 1}`} placeholder="Description" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        )    

    }
}
export default Tiers;