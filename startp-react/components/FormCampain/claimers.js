import React from 'react';

class Claimers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: true
        }
    }

    handleLimited() {
        this.setState( {disabled: !this.state.disabled} )
    }

    render() {

        return (
            <>
              <div className="col-lg-12 col-md-12">
                  <div className="form-group">
                    <div className="order-details">
                        <div className="payment-method">
                            <p>
                                <input type="radio" id={`unlimited/${this.props.index}`} name={`radio-tier/${this.props.index}`} defaultChecked value="Unlimited" onChange={(event) => {
                                         this.props.onClaimersChange(-1)
                                         this.handleLimited()

                                }}/>
                                <label htmlFor={`unlimited/${this.props.index}`}>Unlimited</label>
                            </p>
                            <p>
                                <input type="radio" id={`limited/${this.props.index}`} name={`radio-tier/${this.props.index}`} value="Limited" onChange={(event) => {
                                   this.handleLimited()
                                }}/>
                                <label htmlFor={`limited/${this.props.index}`}>Limited</label>
                            </p>
                            <input type={(this.state.disabled) ? "hidden" : "number"} id="nbClaimers" placeholder="Limit" min="1" className="form-control"
                            onChange={e => {
                              this.props.onClaimersChange(e.target.value)
                            }}/>
                        </div>
                    </div>
                  </div>
              </div>
            </>
        )    

    }
}
export default Claimers;