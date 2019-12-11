import React, { Component } from 'react';

class Timer extends Component {   

    constructor(props){
        super(props);
        state = {
            seconds: 0,
            started: false
        }
        this.startTimer = this.startTimer.bind(this);
        
    }    

    startTimer() {
        if (!this.state.started){
            this.myInterval = setInterval(() => {
                const seconds = this.state;

                if (seconds > 0) {
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }))
                } else {
                    clearInterval(this.myInterval);
                } 

            }, 1000)
        }
        this.setState({started: true});
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const  seconds = this.state.seconds
        return (
            <div>
                <h1>Time Remaining: {seconds}</h1>
            </div>
        )
    }
}

export default Timer;