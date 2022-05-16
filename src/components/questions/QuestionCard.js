import React from 'react';

import QuestionTimer from './QuestionTimer';

export default function QuestionCard({
  question,
  answerId,
  questionIndex,
  numberOfQuestions,
  setAnswerId,
  isAnswering,
  timerDuration,
  remainingTime,
  onComplete,
  onUpdate,
  submitQuestion,
}) {
  return (
    <div>
      <h2 className="my-3">{question.text}</h2>
      <hr></hr>

      <div className="flex justify-between items-center">
        {/* Timer */}
        <QuestionTimer
          isPlaying={isAnswering}
          duration={timerDuration}
          initialRemainingTime={remainingTime}
          onComplete={onComplete}
          onUpdate={onUpdate}
        />

        {/* Question counter */}
        <h3 className="font-bold text-2xl my-3">
          {questionIndex} / {numberOfQuestions}
        </h3>
      </div>

      {/* Answers */}
      <div className="flex flex-col justify-center my-5">
        {question.answers.map((answer, index) => (
          <button
            className={`${
              answerId === answer.answer_id
                ? 'button-warning'
                : 'button-default'
            } my-2`}
            key={answer.answer_id}
            onClick={() => setAnswerId(answer.answer_id)}
          >
            {answer.text}
          </button>
        ))}
      </div>

      <hr></hr>
      {/* Submit button */}
      <div className="flex justify-end items-center">
        <button className="button my-3" onClick={submitQuestion}>
          Odgovori
        </button>
      </div>
    </div>
  );
}
