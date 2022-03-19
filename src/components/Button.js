import React from 'react';

export default function(props) {
    return (
        <button 
            className='button' 
            onClick={() => props.checkAnswers()}
        >
            {props.title}
        </button>    
        
    )
}