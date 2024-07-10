import React from 'react';

type QuestionProps = {
  question: string;
  options: string[];
};

const Pregunta: React.FC<QuestionProps> = ({ question, options }) => {
  return (
    <div className="border p-4 my-2">
      <h2 className="text-lg">{question}</h2>
      <ul className="list-disc pl-5">
        {options.map((option, index) => (
          <li key={index} className="py-1">
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pregunta;
