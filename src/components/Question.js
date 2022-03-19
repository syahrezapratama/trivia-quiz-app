import React from 'react';
import { decode } from 'html-entities';

export default function Question(props){

    function setButtonClass(choice) {
        if (choice.isRight) {
            return 'right';
        } else if (choice.isSelected) {
            return 'selected';
        } else if (choice.isWrong) {
            return 'wrong';
        }
    }

    return(
        <div className='questionBox'>
            <h4 className='question'>{decode(props.question)}</h4>
            <div className='optionsContainer'>
                <div className={`options ${setButtonClass(props.choice1)}`} onClick={() => props.selectAnswer(props.choice1.id, props.questionId)}>
                    {decode(props.choice1.answer)}
                </div>
                <div className={`options ${setButtonClass(props.choice2)}`} onClick={() => props.selectAnswer(props.choice2.id, props.questionId)}>
                    {decode(props.choice2.answer)}
                </div>
                <div className={`options ${setButtonClass(props.choice3)}`} onClick={() => props.selectAnswer(props.choice3.id, props.questionId)}>
                    {decode(props.choice3.answer)}    
                </div>
                <div className={`options ${setButtonClass(props.choice4)}`} onClick={() => props.selectAnswer(props.choice4.id, props.questionId)}>
                    {decode(props.choice4.answer)}
                </div>
            </div>
        </div>
    );
}