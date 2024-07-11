'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Estudiante() {
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
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-rose-500 to-blue-500">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-center text-2xl font-bold mb-4">Estudiante</h1>
        <h2 className="text-center text-xl font-bold mb-4">Exámenes Disponibles</h2>
        <ul className="list-none p-0">
          {examenes.map((examen) => (
            <li key={examen.id} className="mb-4">
              <button
                onClick={() => handleExamenClick(examen.id)}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {examen.nombreExamen}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


