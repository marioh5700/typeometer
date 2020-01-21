import React, { Component } from 'react';

class TypingInformation extends Component {
    constructor(props){
        super(props);
        this.resetEvent = this.resetEvent.bind(this);
    }   

    resetEvent(){
        this.props.resetTimer();
    }

    render() {
        let content = this.props.content;
        let seconds = this.props.seconds;
        let wpm = Math.round(this.props.wpm);
        let started = this.props.started;

        return (
            <div id='typingInformationContainer'>
                <div className='countdownContainer'>
                    <div className='countDownBar'
                    className= {(started === true)? 'countDownBarFill' : 'countDownBarDrain'}
                    style = {(started === true)? {transition: 100 + "ms linear"} : {transition: 5000 + "ms linear"}}
                    style = {(started === true)? {width: 0 + '%'} : {width: 80 + '%'}}
                    ></div>
                    <p className='informationText' style={{margin: 5 + 'px'}}>{seconds}s</p>
                </div>
                <p className='informationText'>WPM: {wpm}</p>
                <button
                className='btn'
                onClick={this.resetEvent}>
                    <span>RESET</span>
                </button>
            </div>
        )
    }
}

export default TypingInformation;