import React from 'react';

class Title extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            charLeft: 50,
            editable: false
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
        var remainingChar = 50 - characterCount
        if (remainingChar < 0) {
            this.setState({charLeft: "Too many characters, cannot exceed 150 characters", editable: true})
        } else {
            this.setState({charLeft: remainingChar, editable: false})

        }
    }
    

    render() {

        return (
            <>
            <p><strong> Fundraiser Name </strong><br/>Give a name to your project to make it searchable for the users.</p>
            <div className="col-lg-12 col-md-12">
                <div className="form-group">
                    <input type="text" placeholder="Title" className="form-control" maxLength="50" onChange={e => {
                        this.wordCount.bind(this)
                        this.props.onChange(e.target.value)
                        }}/>
                    {this.state.charLeft !== 50 ? <p>{this.state.charLeft} characters left</p> : null}
                </div>
            </div>
            </>
        )    

    }
}
export default Title;