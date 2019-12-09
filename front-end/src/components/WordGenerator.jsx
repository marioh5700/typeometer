import React, { Component } from 'react';

class WordGenerator extends Component {   

    render() {
        let randomWords = this.props.randomWords;
        return (
            <div id='wordGeneratorContainer'>
                <h1>{randomWords}</h1>
            </div>
        )
    }
}

export default WordGenerator;