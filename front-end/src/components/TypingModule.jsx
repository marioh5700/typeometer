import React, { Component } from 'react';
import WordGenerator from './WordGenerator';
import TypingSpace from './TypingSpace';

class TypingModule extends Component {
    constructor(props){
        super(props);
        this.state = {commonWords : ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 
        'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'],
        randomWords : [],
        content: ''};
        this.randomiseWords = this.randomiseWords.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.spacePressed = this.spacePressed.bind(this);
        
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

    componentDidMount() {
        this.randomiseWords();
    }

    handleChange(contentChild){
        if(contentChild !== ' '){
            this.setState({content: contentChild});
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

    render() {
        let randomWords = this.state.randomWords;
        let content = this.state.content;
        return (
            <div id='typingModuleContainer'>
                <WordGenerator
                randomWords={randomWords}/>
                <TypingSpace
                content={content}
                handleChange={this.handleChange}
                spacePressed={this.spacePressed}/>
            </div>
        )
    }
}

export default TypingModule;