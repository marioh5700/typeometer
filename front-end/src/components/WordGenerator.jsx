import React, { Component } from 'react';

class WordGenerator extends Component {
    constructor(props){
        super(props);
        this.state = {commonWordList : ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 
        'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'],
        randomWordList : []};
        

    }    

    randomiseWords() {
        let tempList = []
        for (let i = 0; i < 50; i++) {
            let word = this.state.commonWordList[Math.floor(Math.random() * this.state.commonWordList.length)] + " "
            tempList.push(word)
        }
        this.setState({randomWordList: tempList})
        
    }

    componentDidMount() {
        this.randomiseWords()
    }

    render() {
        return (
            <div>
                <h1>{this.state.randomWordList}</h1>
            </div>
        )
    }
}

export default WordGenerator;