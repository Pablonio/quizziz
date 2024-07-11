// ExamenDetalle.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Respuesta {
  id: number;
  respuesta: string;
  puntucion: number;
  correcta: boolean;
}

interface Pregunta {
  id: number;
  pregunta: string;
  respuestas: Respuesta[];
}

interface Examen {
  id: number;
  nombreExamen: string;
  preguntas: Pregunta[];
}

const ExamenDetalle: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [examen, setExamen] = useState<Examen | null>(null);

  useEffect(() => {
    const fetchExamen = async () => {
      if (id) {
        try {
          const response = await axios.post('/api/Examen/recuperar-examen', { examenId: id });
          setExamen(response.data);
        } catch (error) {
          console.error('Error al recuperar el examen:', error);
        }
      }
    };

    fetchExamen();
  }, [id]);

  if (!examen) {
    return <div className="text-center text-xl mt-4">Cargando...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{examen.nombreExamen}</h1>
      <ul className="space-y-4">
        {examen.preguntas.map((pregunta: Pregunta) => (
          <li key={pregunta.id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="font-semibold">{pregunta.pregunta}</p>
            <ul className="mt-2 space-y-2">
              {pregunta.respuestas.map((respuesta: Respuesta) => (
                <li key={respuesta.id} className="flex justify-between">
                  <span>{respuesta.respuesta}</span>
                  <span className="text-gray-600">Puntuación: {respuesta.puntucion}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamenDetalle;
