import React, { Component } from 'react';

class TypingSpace extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }    

   handleChange(event){
       this.props.handleChange(event.target.value);
       this.props.startTimer();
   }

   keyPressed(event){
       if (event.key === ' ') {
            this.props.spacePressed();
       }
       this.props.characterTyped();

   }

    render() {
        let content = this.props.content;
        let seconds = this.props.seconds;
        let wpm = this.props.wpm;
        return (
            <div id='typingSpaceContainer'>
                <input 
                    value={content}
                    onChange={this.handleChange}
                    onKeyDown={this.keyPressed}
                />
                <h1>Time Remaining: {seconds}</h1>
                <h1>WPM: {wpm}</h1>
            </div>
        )
    }
}

export default TypingSpace;