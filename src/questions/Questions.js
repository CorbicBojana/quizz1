import React, { useState, useEffect } from "react";

import Question from "./components/Question";
import Answer from "./components/Answer";
import Submit from "./components/Submit";
import GameEnd from "./components/GameEnd";
import Timer from "./components/Timer";

function Questions(props) {
  const [nextQuestion, setNextQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [countTime, setCountTime] = useState(8);

  const { handleRestart, data } = props;

  const changeStyle = document.getElementsByClassName("answer-list");

  const handleNextQuestion = () => {
    setNextQuestion(nextQuestion + 1);
    setIsClicked(false);
    changeStyle[0].style.backgroundColor = "#fff";
    setCountTime(8);
  };

  const handleAnswer = e => {
    setIsClicked(true);
    const correctAnswer = data[nextQuestion].correct_answer;
    const userAnswer = e.target.textContent;
    if (correctAnswer === userAnswer) {
      changeStyle[0].style.backgroundColor = "#0094da";
      setScore(score + 1);
    }
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      setCountTime(countTime - 1);
      if (countTime === 0) {
        setNextQuestion(nextQuestion + 1);
        setCountTime(8);
        setIsClicked(false);
        if (!changeStyle[0]) {
          return null;
        }
        changeStyle[0].style.backgroundColor = "#fff";
      }
    }, 1000);
    return () => {
      clearTimeout(myInterval);
    };
  });

  if (!data.length) return <p>No Data</p>;

  return (
    <div className="questions">
      {nextQuestion + 1 <= data.length ? (
        <>
          <Timer countTime={countTime} />
          <Question data={data} nextQuestion={nextQuestion} />
          <Answer
            data={data}
            nextQuestion={nextQuestion}
            handleAnswer={handleAnswer}
          />
          <Submit
            handleNextQuestion={handleNextQuestion}
            isClicked={isClicked}
          />
        </>
      ) : (
        <GameEnd score={score} data={data} handleRestart={handleRestart} />
      )}
    </div>
  );
}

export default Questions;
