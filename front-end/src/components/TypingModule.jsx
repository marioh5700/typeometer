import React, { Component } from 'react';
import WordGenerator from './WordGenerator';
import TypingSpace from './TypingSpace';

class TypingModule extends Component {
    constructor(props){
        super(props);
        this.state = {commonWords : ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 
        'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'by', 'this', 'we', 
        'you', 'do', 'but', 'from', 'or', 'which', 'one', 'would', 'all', 'will', 'there', 'say', 
        'who', 'make', 'when', 'can', 'more', 'if', 'no', 'man', 'out', 'other', 'so', 'what', 'time',
         'up', 'go', 'about', 'than', 'into', 'could', 'state', 'only', 'new', 'year', 'some', 'take', 
         'come', 'these', 'know', 'see', 'use', 'get', 'like', 'then', 'first', 'any'],
        randomWords : [],
        content: '',
        incorrect: false,
        started: false,
        seconds: 5,
        charCount: 0,
        wpm: 0,
        stats: [],
        tempValues: []};
        
        this.randomiseWords = this.randomiseWords.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.spacePressed = this.spacePressed.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.characterTyped = this.characterTyped.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.getData = this.getData.bind(this);
        this.submitRun = this.submitRun.bind(this);
        
    }    

    componentDidMount() {
        this.randomiseWords();
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loggedIn !== this.props.loggedIn && this.props.loggedIn === true) {
            this.setState({stats: []}, () => {
                this.setState({tempValues: []}, () => {
                    this.getData();
                });
            });
        } else if (prevProps.loggedIn === true && this.props.loggedIn === false) {
            this.setState({stats: [], tempValues: []}, () => {
                console.log(this.state.stats);  
                this.getData();
            });
        }
    }

    randomiseWords() {
        let tempList = []
        for (let i = 0; i < 50; i++) {
            let word = {word: this.state.commonWords[Math.floor(Math.random() * this.state.commonWords.length)],
            id: tempList.length}
            tempList.push(word)
        }
        this.setState({randomWords: tempList});
        
    }

    getData() {
        if (this.props.loggedIn){
            fetch('http://localhost:5000/', {
                credentials: 'include'
            })
            .then(res => res.json())
            .then((results) => {
                this.setState({stats: results});
            })
        } else {
            this.setState({stats: this.state.tempValues.slice()});
        }
    }

    submitRun() {
        if (this.props.loggedIn) {
            let params = {
                wpm: Math.round(this.state.wpm)
            };

            fetch('http://localhost:5000/postrun', {
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(params)
            })
            .then((results) => {
                this.getData()
            });
        } else {
            let data = this.state.tempValues;
            data.push({wpm: Math.round(this.state.wpm)});
            if (data.length === 11) {
                data.shift();
            }
            this.setState({tempValues: data}, () => {
                this.getData();
            }); 
        }
    }

    handleChange(contentChild){
        if(contentChild !== ' '){
            this.setState({content: contentChild});
            if(this.state.randomWords[0].word.startsWith(contentChild)) {
                this.setState({incorrect: false});
            } else {
                this.setState({incorrect: true});
            }
        }

    }

    spacePressed() {
        let tempList = this.state.randomWords;
        if (this.state.content === tempList[0].word) {
            tempList.shift();
            tempList.push({word: this.state.commonWords[Math.floor(Math.random() * this.state.commonWords.length)],
            id: tempList[tempList.length - 1].id + 1})
            this.setState({randomWords: tempList,
                            content: ''})
        }
    }

    characterTyped() {
        if (!this.state.incorrect) {
            this.setState(({charCount}) => ({
                charCount: charCount + 1
            }))
        }
    }

    startTimer() {
        if (!this.state.started){
            this.countdown = setInterval(() => {
                const seconds = this.state.seconds;

                if (seconds > 0) {
                    this.setState(({seconds}) => ({
                        seconds: seconds - 1
                    }))
                    this.setState(({charCount, seconds}) => ({
                        wpm: ((charCount / 5) / ((30 - seconds) / 60))
                    }))
                } else {
                    clearInterval(this.countdown);
                } 

            }, 1000)
            this.setState({started: true});
        }
    }

    resetTimer() {
        clearInterval(this.countdown);
        this.setState({content: '',
                        incorrect:false,
                        charCount: 0,
                        started: false,
                        seconds: 5,
                        wpm: 0})
        this.randomiseWords();
    }

    render() {
        let randomWords = this.state.randomWords;
        let content = this.state.content;
        let incorrect = this.state.incorrect;
        let seconds = this.state.seconds;
        let wpm = this.state.wpm;
        let stats = this.state.stats;
        let loggedIn = this.props.loggedIn;

        return (
            <div id='typingModuleContainer'>
                <WordGenerator
                randomWords={randomWords}
                incorrect={incorrect}/>
                <TypingSpace
                content={content}
                seconds={seconds}
                wpm={wpm}
                stats={stats}
                handleChange={this.handleChange}
                spacePressed={this.spacePressed}
                characterTyped={this.characterTyped}
                startTimer={this.startTimer}
                resetTimer={this.resetTimer}
                getData={this.getData}
                submitRun={this.submitRun}
                loggedIn={loggedIn}/>
            </div>
        )
    }
}

export default TypingModule;