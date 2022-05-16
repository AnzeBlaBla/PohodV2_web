import React from 'react';

export default function QuestionCard({
  question,
  answerId,
  setAnswerId,
  submitQuestion,
}) {
  return (
    <div>
      <h2 className="font-bold my-3">{question.text}</h2>
      <hr></hr>

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
      <div className="flex justify-end items-center">
        <button className="button my-3" onClick={submitQuestion}>
          Odgovori
        </button>
      </div>
    </div>
  );
}
