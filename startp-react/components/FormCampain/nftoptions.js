import React from 'react';
import NFTTier from '../ITStartup/NFTTier';
const BASE_NFT_IMG = "https://firebasestorage.googleapis.com/v0/b/crowdfunding-dev-5f802.appspot.com/o/coinbb.png?alt=media&token=9bb5befd-20a6-49d0-8aa0-c564a8ce0814"

class Nftoptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nftradio:"nonft"
        }
    }

    showNFT(index) {
        if(this.state.nftradio == "customnft"){
            return <div>
                <p style={{marginTop: 10, marginBottom: 0}}>Title :</p> <input type="text" id={`nftname${index}`} placeholder={`Tier ${index+1} reward`} className="form-control"
                    onChange={e => {
                       this.props.handleNFTNameChange(e.target.value, index)
                    }}
                />
                <p style={{marginTop: 20, marginBottom: 0}}>Upload the artwork (JPG, PNG or GIF) for your custom NFT :</p><NFTTier tier={index} onImageChange={this.props.handleNFTUpload.bind(this)}/>
                
            </div>
        } else if(this.state.nftradio == "bbstnft"){
            return <img src={BASE_NFT_IMG} style={{maxWidth: 125, maxHeight: 125}}/>
        }
    }

    render() {

        return (
            <>
              <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                        <div className="order-details">
                            <div className="payment-method">
                                <p>
                                    <input type="radio" id={`nonft/${this.props.index}`} name={`nftradio/${this.props.index}`} defaultChecked value="nonft" onChange={(event) => {
                                            this.props.onNftOptionChange(event.target.value, this.props.index)
                                            this.setState({nftradio : event.target.value})
                                        }}/>
                                    <label htmlFor={`nonft/${this.props.index}`}>No NFT Reward</label>
                                </p>
                                <p>
                                    <input type="radio" id={`bbstnft/${this.props.index}`} name={`nftradio/${this.props.index}`}  value="bbstnft" onChange={(event) => {
                                            this.props.onNftOptionChange(event.target.value, this.props.index)
                                            this.setState({nftradio : event.target.value})
                                        }}/>
                                    <label htmlFor={`bbstnft/${this.props.index}`}>BlockBoosted NFT Reward</label>
                                </p>
                                <p>
                                    <input type="radio" id={`customnft/${this.props.index}`} name={`nftradio/${this.props.index}`} value="customnft" onChange={(event) => {
                                            this.props.onNftOptionChange(event.target.value, this.props.index)
                                            this.setState({nftradio : event.target.value})
                                        }}/>
                                    <label htmlFor={`customnft/${this.props.index}`}>Custom NFT Reward</label>
                                </p>
                                
                            </div>
                            {this.showNFT(this.props.index)}
                        </div>
                    </div>
                </div>
            </>
        )    

    }
}
export default Nftoptions;