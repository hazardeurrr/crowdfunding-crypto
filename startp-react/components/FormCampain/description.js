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
            <p><strong> Project Description </strong><br/> Make a short description of your project to make it more attractive.</p>
            <div className="col-lg-12 col-md-12">
                <div className="form-group">
                    <textarea name="message" cols="30" rows="6" placeholder="Description" className="form-control" maxLength="150" onChange={e => {
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