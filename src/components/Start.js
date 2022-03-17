import React from 'react';

export default function Start(props) {
    return(
        <div className='start'>
            <h1 className='title'>Geo Trivia Quiz</h1>
            <p className='subtitle'>Test your Geography knowledge!</p>
            <button className='start-button' onClick={props.startGame}>Start Quiz</button>
        </div>
    );
}