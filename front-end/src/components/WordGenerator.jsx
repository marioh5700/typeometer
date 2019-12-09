import React, { Component } from 'react';

class WordGenerator extends Component {   

    render() {
        let randomWords = this.props.randomWords;
        return (
            <div id='wordGeneratorContainer'>
                {randomWords
          .map(word => <h1 key={word.id} className='wordContainer'>{word.word}</h1>)}
            </div>
        )
    }
}

export default WordGenerator;