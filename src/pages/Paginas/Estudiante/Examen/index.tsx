import React from 'react';

import Header from './Componentes/header';
import Pregunta from './Componentes/PreguntasBox'

const questions = [
  {
    question: "¿Cuál es la capital de Francia?",
    options: ["Madrid", "París", "Berlín", "Lisboa"]
  },
  {
    question: "¿Cuál es el río más largo del mundo?",
    options: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"]
  },

];

const App = () => {
  const userName = "Juan Pérez"; 

  return (
    <div className="App">
      <Header userName={userName} />
      <div className="p-4">
        <h2 className="text-xl mb-4">Progreso del Examen</h2>
        {questions.map((q, index) => (
          <Pregunta key={index} question={q.question} options={q.options} />
        ))}
      </div>
    </div>
  );
};

export default App;
