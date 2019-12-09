import React, { Component } from 'react';

class TypingSpace extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }    

   handleChange(event){
       this.props.handleChange(event.target.value);
   }

   keyPressed(event){
       if (event.key === ' ') {
            this.props.spacePressed();
       }
   }

    render() {
        let content = this.props.content;
        return (
            <div id='typingSpaceContainer'>
                <input 
                    value={content}
                    onChange={this.handleChange}
                    onKeyDown={this.keyPressed}
                />
            </div>
        )
    }
}

export default TypingSpace;