import React from 'react';

export default function(props) {
    return (
        <button 
            className='button-check' 
            onClick={() => props.checkAnswers()}
        >
            {props.title}
        </button>    
        
    )
}