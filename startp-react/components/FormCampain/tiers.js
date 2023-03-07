import React from 'react';
import NFTTier from '../ITStartup/NFTTier';
import Claimers from './claimers';

class Tiers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tiers: [],
            tiersInfos: [],
            nfts:[]
        }
        this.tiers = []
    }

    handleTiers(event) {
        event.preventDefault()
        let listTiers = this.state.tiers
        let nfts = this.state.nfts
        
        if(event.target.value > this.tiers.length){
            var length = this.tiers.length;
            for (var i = 0; i < event.target.value - length; i++) {
                    listTiers.push({index: i, description: ''})
                    nfts.push(null)
                    this.tiers.push({
                        title: "",
                        threshold: 0,
                        description: "",
                        maxClaimers: -1,
                    })
                }
        } else if(event.target.value < this.tiers.length){
            // console.log("removing")
            listTiers = listTiers.slice(0, event.target.value)
            this.tiers = this.tiers.slice(0, event.target.value)
            nfts = nfts.slice(0, event.target.value)
        }
      //  console.log(this.tiers)
        this.setState({tiers: listTiers})
        this.props.onTiersChange(this.tiers)
        this.setState({nfts: nfts})
        this.props.onTiersChange(nfts)
    }

    handleNFTUpload = (image, index) => {
        // console.log("image changed")
        let newArr = this.state.nfts
        newArr[index] = image
        this.props.onNFTsChange(newArr)
        this.setState({nfts: newArr});
    }


    render() {

        return (
            <>
            <div className="col-lg-12 col-md-12">
                <div className="form-group">
                        <select className="form-select" id='categorySelected' onChange={this.handleTiers.bind(this)}>
                            {[0, 1, 2, 3, 4, 5].map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>
            </div>
                {
                    this.state.tiers.map((elt, index) => {
                        return (
                            <div key={`tier${index+1}`}>
                                <strong>Tier {index + 1}</strong>
                                <p>Title for the tier<br/>
                                Give us a description of the tier :
                                </p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                    <input type="text" id={`"tiersTitle${index + 1}`} placeholder="Title" className="form-control" maxLength="50" onChange={e => {
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
                                    <input type="textarea" id={`"tiersDescription${index + 1}`} placeholder="Description" maxLength="350" className="form-control"
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
                                        this.props.onTiersChange(this.tiers)
                                    }} />

                                <p>Add a custom NFT as a reward for your backers chosing this tier</p>
                                <NFTTier tier={index} onImageChange={this.handleNFTUpload.bind(this)}/>

                                
                            </div>
                        )
                    })
                }
            </>
        )    

    }
}
export default Tiers;