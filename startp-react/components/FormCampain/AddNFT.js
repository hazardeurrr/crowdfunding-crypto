import React from 'react';
import NFTTier from '../ITStartup/NFTTier';
import Nftoptions from './nftoptions';

class AddNFT extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tiers: [],
            tiersInfos: [],
            nfts:[],
            nftradio: "nonft"
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
                    nfts.push({name: null, price:null, quantity: null, image: null})
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
        this.props.onNFTsChange(nfts)
    }

    handleNFTUpload = (image, index) => {
        // console.log("image changed")
        let newArr = this.state.nfts
        newArr[index].image = image
        this.props.onNFTsChange(newArr)
        this.setState({nfts: newArr});
    }

    handleNFTNameChange = (name, index) => {
        // console.log("image changed")
        let newArr = this.state.nfts
        newArr[index].name = name
        this.props.onNFTsNameChange(newArr)
        this.setState({nftsName: newArr});
    }

    handleNFTQtyChange = (qty, index) => {
        // console.log("image changed")
        let newArr = this.state.nfts
        newArr[index].quantity = qty
        this.props.onNFTsNameChange(newArr)
        this.setState({nftsName: newArr});
    }

    handleNFTPriceChange = (price, index) => {
        // console.log("image changed")
        let newArr = this.state.nfts
        newArr[index].price = price
        this.props.onNFTsNameChange(newArr)
        this.setState({nftsName: newArr});
    }


    render() {

        return (
            <>
            <div className="col-lg-12 col-md-12">
                <div className="form-group">
                        <select className="form-select" id='categorySelected' onChange={this.handleTiers.bind(this)}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>
            </div>
                {
                    this.state.tiers.map((elt, index) => {
                        return (
                            <div key={`tier${index+1}`}>
                                <strong>Tier {index + 1}</strong>
                                <p><b>Title for the tier</b><br/>
                                Give us a description of the tier :
                                </p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                    <input type="text" id={`"tiersTitle${index + 1}`} placeholder="Title" className="form-control" maxLength="50" onChange={e => {
                                        this.tiers[index]["title"] = e.target.value
                                        this.props.onTiersChange(this.tiers)
                                    }}/>
                                </div>

                                <p><b>
                                Amount :</b>
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
                                <p><b>Advantage</b><br/>
                                Give us a description of the tier. Tell us what will people get :
                                </p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                    <textarea id={`"tiersDescription${index + 1}`} placeholder="Description" rows="3" maxLength="350" className="form-control"
                                    onChange={e => {
                                        this.tiers[index]["description"] = e.target.value
                                        this.props.onTiersChange(this.tiers)
                                    }}/>
                                    </div>
                                </div>
                              
                                <b><p>NFT Reward</p></b>
                                <p>Reward the backers of this tier with an exclusive NFT.</p>
                                <Nftoptions 
                                    handleNFTUpload={this.handleNFTUpload.bind(this)}
                                    handleNFTNameChange={this.handleNFTNameChange.bind(this)}
                                    onNftOptionChange={this.onNftOptionChange.bind(this)}
                                    index={index}
                                />

                                <p><b>Quantity</b> <br/>
                                Do you want to restreint the number of claimers for this plan ?
                                </p>

                                <Claimers index={index} onClaimersChange={e => {
                                    this.tiers[index]["maxClaimers"] = parseInt(e)
                                    this.props.onTiersChange(this.tiers)
                                }} />


                            </div>
                        )
                    })
                }
            </>
        )    

    }
}
export default AddNFT;