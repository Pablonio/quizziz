'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Estudiante = () => {
  const [examenes, setExamenes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchExamenes = async () => {
      try {
        const response = await axios.get('/api/Examen/recuperar-todos');
        setExamenes(response.data);
      } catch (error) {
        console.error('Error al recuperar exámenes:', error);
      }
    };

    fetchExamenes();
  }, []);

  const handleExamenClick = (id: number) => {
    router.push(`/Paginas/Estudiante/Examen/${id}`);
  };

  return (
    <div className="App">
      <h1>Estudiante</h1>
      <h2>Exámenes Disponibles</h2>
      <ul>
        {examenes.map((examen) => (
          <li key={examen.id}>
            <button onClick={() => handleExamenClick(examen.id)}>{examen.nombreExamen}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Estudiante;
