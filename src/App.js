import React, {useEffect, useState} from 'react';
import Start from './components/Start';
import Question from './components/Question';
import Button from './components/Button';
import {nanoid} from 'nanoid'
import arrayShuffle from 'array-shuffle';

function App() {

  const [allQuestions, setAllQuestions] = useState([]);
  const [allQuestionsSelected, setAllQuestionsSelected] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [started, setStarted] = useState(false);


  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => {
        const resultData = data.results;
        //shuffle answers
        for (let i = 0; i < resultData.length; i++) {
          const shuffledAnswers = arrayShuffle([
            {
              id: nanoid(),
              answer: resultData[i].correct_answer,
              isCorrect: true,
              isSelected: false,
              isRight: false,
              isWrong: false
            },
            {
              id: nanoid(),
              answer: resultData[i].incorrect_answers[0],
              isCorrect: false,
              isSelected: false,
              isRight: false,
              isWrong: false
            },
            {
              id: nanoid(),
              answer: resultData[i].incorrect_answers[1],
              isCorrect: false,
              isSelected: false,
              isRight: false,
              isWrong: false
            },
            {
              id: nanoid(),
              answer: resultData[i].incorrect_answers[2],
              isCorrect: false,
              isSelected: false,
              isRight: false,
              isWrong: false
            },
          ]);
          setAllQuestions(prevQuestions => {
            return [
              ...prevQuestions,
              {
                question: resultData[i].question,
                questionId: nanoid(),
                answers: [
                  shuffledAnswers[0], shuffledAnswers[1], shuffledAnswers[2], shuffledAnswers[3]
                ]
              }
            ]
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
  }, [newGame]);

  useEffect(() => {
    allQuestions.map(question => {
      const answers = question.answers;
      if (answers.filter(answer => answer.isSelected).length === 1) {
        setAllQuestionsSelected(true);
      } else {
        setAllQuestionsSelected(false)
      }
    });
  }, [allQuestions]);

  function selectAnswer(id, questionId) {
    setAllQuestions(prevQuestions => {
      let answers = prevQuestions.find(question => question.questionId === questionId).answers;
      answers.map(answer => answer.isSelected = false);
      answers.find(answer => answer.id === id).isSelected = true;
      return [...prevQuestions];
    })
  }

  function checkAnswers() {
    if (isFinished) {
      setAllQuestions([]);
      setNewGame(true);
      setIsFinished(false);
    } else {
      setAllQuestions(prevQuestions => {
        prevQuestions.map(question => {
          const answers = question.answers;
          for (let i = 0; i < answers.length; i++) {
            if (answers[i].isSelected && answers[i].isCorrect) {
              answers[i].isRight = true;
              // count the score here
              setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
            } else if (answers[i].isSelected && !answers[i].isCorrect) {
              answers[i].isSelected = false;
              answers[i].isWrong = true;
            }
          }
        });
        return [...prevQuestions];
      });
      // game is finished
      setIsFinished(true);
    }
  }

  function startGame() {
    setStarted(true);
  }

  const questionElements = allQuestions.map(question => {
    return (
      <Question
        key={question.questionId}
        questionId={question.questionId}
        question={question.question}
        choice1={question.answers[0]}
        choice2={question.answers[1]}
        choice3={question.answers[2]}
        choice4={question.answers[3]}
        selectAnswer={selectAnswer}
      />
    );
  });

  return (
    <div className='App'>
      {!started ? 
        <Start startGame={startGame} /> : 
        <div>
          {questionElements}
          <div className='button-container'>
            {isFinished && <h4 className='score'>You scored {correctAnswers}/5 correct answers!</h4>}
            {(started && !isFinished) ?
              <Button checkAnswers={checkAnswers} title="Check answers" /> :
              <Button checkAnswers={checkAnswers} title="New game" />
            }
          </div>
        </div>
      }
    </div>

  );
}

export default App;
