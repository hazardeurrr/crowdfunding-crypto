import React from 'react';

class Description extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            charLeft: 150,
        }
    }


    wordCount(e) {

        var currentText = e.target.value;
        //Now we need to recalculate the number of characters that have been typed in so far
        var characterCount = currentText.length;
        var remainingChar = 150 - characterCount
        }
    

    render() {

        return (
            <>
            <p style={{marginTop: 25}}><strong> Brief Description </strong><br/> Write a short description of you / what you do. Make it quick and catchy ! (max. 150 characters)</p>
            <div className="col-lg-12 col-md-12">
                <div className="form-group">
                    <textarea name="message" cols="30" rows="6" placeholder="Short Description" className="form-control" maxLength="150" onChange={e => {
                        this.wordCount.bind(this)
                        this.props.onChange(e.target.value)
                        }}></textarea>
                    {this.state.charLeft !== 150 ? <p>{this.state.charLeft} </p> : null}
                </div>
            </div>
            </>
        )    

    }
}
export default Description;