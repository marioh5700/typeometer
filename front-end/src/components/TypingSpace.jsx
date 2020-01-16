import React, { Component } from 'react';
import LastTenRuns from './LastTenRuns';

class TypingSpace extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
        this.resetEvent = this.resetEvent.bind(this);
    }   

    componentDidUpdate(prevProps) {
        if ((this.props.seconds === 0) && (this.props.seconds !== prevProps.seconds)) {
            this.props.submitRun();
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

    resetEvent(){
        this.props.resetTimer();
    }

    render() {
        let content = this.props.content;
        let seconds = this.props.seconds;
        let wpm = Math.round(this.props.wpm);
        let stats = this.props.stats;

        return (
            <div id='typingSpaceContainer'>
                <input 
                    value={content}
                    disabled = {(seconds === 0)? "disabled" : ""}
                    onChange={this.handleChange}
                    onKeyDown={this.keyPressed}
                />
                <h1>Time Remaining: {seconds}</h1>
                <h1>WPM: {wpm}</h1>
                <button
                onClick={this.resetEvent}
                >Reset</button>
                <div>
                {stats
              .map((stat, index) => <h1 key={index} className='wordContainer'>{stat.wpm}</h1>)}
                </div>
                <LastTenRuns
                seconds={seconds}
                stats={stats}/>
            </div>
        )
    }
}

export default TypingSpace;