import React, { Component } from 'react';

class TypingSpace extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }   

    componentDidUpdate(prevProps) {
        if ((this.props.seconds === 0) && (this.props.seconds !== prevProps.seconds)) {
            this.props.submitRun();
        } else if (this.props.seconds === 5 && this.props.popup === false) {
            this._input.focus();
        }

    }

    handleChange(event){
       this.props.handleChange(event.target.value);
       this.props.startTimer();
    }

    keyPressed(event){
        if (event.key === ' ') {
            this.props.spacePressed();
            this.props.characterTyped();
        }
        if ((event.keyCode >= 48 && event.keyCode <= 90) ||  (event.keyCode >= 96 && event.keyCode <= 111)) {
            this.props.characterTyped();
        }

    }

    render() {
        let content = this.props.content;
        let seconds = this.props.seconds;

        return (
            <div id='typingSpaceContainer'>
                <input 
                    className="typingInput"
                    autoFocus={true}
                    tabIndex="-1"
                    ref={c => (this._input = c)}
                    value={content}
                    disabled = {(seconds === 0)? "disabled" : ""}
                    onChange={this.handleChange}
                    onKeyDown={this.keyPressed}
                />
            </div>
        )
    }
}

export default TypingSpace;