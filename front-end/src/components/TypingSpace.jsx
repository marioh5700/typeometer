import React, { Component } from 'react';

class TypingSpace extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);

    }    

   handleChange(event){
       this.props.handleChange(event.target.value);
   }

    render() {
        let content = this.props.content;
        return (
            <div id='typingSpaceContainer'>
                <input 
                    value={content}
                    onChange={this.handleChange}/>
            </div>
        )
    }
}

export default TypingSpace;