import React from 'react';

export default function QuestionOverlay({ setIsAnswering, title, text }) {
  return (
    <div className="p-3 flex flex-col justify-center items-center">
      <h2 className="font-bold text-center my-3">{title}</h2>
      <button className="button my-3" onClick={() => setIsAnswering(true)}>
        {text}
      </button>
    </div>
  );
}
