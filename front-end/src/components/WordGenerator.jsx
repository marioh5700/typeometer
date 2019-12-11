import React, { Component } from 'react';

class WordGenerator extends Component {   

    render() {
        let randomWords = this.props.randomWords;
        if (this.props.incorrect === true){
            return (
                <div id='wordGeneratorContainerIncorrect'>
                    {randomWords
              .map(word => <h1 key={word.id} className='wordContainer'>{word.word}</h1>)}
                </div>
            )
        } else {
            return (
                <div id='wordGeneratorContainer'>
                    {randomWords
              .map(word => <h1 key={word.id} className='wordContainer'>{word.word}</h1>)}
                </div>
            )
        }
    }
}

export default WordGenerator;