import React from 'react';

class Description extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            charLeft: 150,
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
    wordCount(e) {

        var currentText = e.target.value;
        //Now we need to recalculate the number of characters that have been typed in so far
        var characterCount = currentText.length;
        var remainingChar = 150 - characterCount
        if (remainingChar < 0) {
            this.setState({charLeft: "Too many characters, cannot exceed 150 characters"})
        } else {
            this.setState({charLeft: str(remainingChar) + " characters left"})
        }
    }
    

    render() {

        return (
            <>
            <p><strong> Project Description </strong><br/> Make a short description of your project to make it more attractive.</p>
            <div className="col-lg-12 col-md-12">
                <div className="form-group">
                    <textarea name="message" cols="30" rows="6" placeholder="Description" className="form-control" maxLength="150" onChange={this.wordCount.bind(this)}></textarea>
                    <p>{this.state.charLeft} </p>
                </div>
            </div>
            </>
        )    

    }
}
export default Description;