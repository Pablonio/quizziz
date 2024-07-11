'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AgregarPreguntas from './AgregarPreguntas';
import AgregarRespuestas from './AgregarRespuestas';

interface PreguntasDelExamenProps {
  examenId: number;
}

interface Pregunta {
  id: number;
  pregunta: string;
  respuestas: Respuesta[];
}

interface Respuesta {
  id: number;
  respuesta: string;
  puntucion: number;
}

export default function PreguntasDelExamen({ examenId }: PreguntasDelExamenProps) {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [addingPregunta, setAddingPregunta] = useState(false);
  const [addingRespuestas, setAddingRespuestas] = useState(false);
  const [preguntaActualId, setPreguntaActualId] = useState<number | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [totalPuntuacion, setTotalPuntuacion] = useState(0);

  const MAX_PUNTUACION = 100;

  const fetchPreguntas = async () => {
    try {
      const response = await axios.post('/api/Examen/recuperar-examen', { examenId });
      const fetchedPreguntas = response.data.preguntas;
      setPreguntas(fetchedPreguntas);
      // Calcular la puntuación total
      const puntuacion = fetchedPreguntas.reduce((acc: number, pregunta: Pregunta) => {
        const sumaRespuestas = pregunta.respuestas.reduce((resAcc, respuesta) => resAcc + respuesta.puntucion, 0);
        return acc + sumaRespuestas;
      }, 0);
      setTotalPuntuacion(puntuacion);
    } catch (error) {
      console.error('Error al obtener preguntas del examen:', error);
    }
  };

  useEffect(() => {
    fetchPreguntas();
  }, [examenId, shouldRefetch]);

  const handleAgregarPregunta = () => {
    setAddingPregunta(true);
  };

  const handlePreguntaCreada = (id: number) => {
    setPreguntaActualId(id);
    setAddingPregunta(false);
    setAddingRespuestas(true);
  };

  const handleRespuestasCreadas = () => {
    setShouldRefetch((prev) => !prev); // Cambia el estado para desencadenar la actualización
    setAddingRespuestas(false);
    setPreguntaActualId(null);
  };

  const puntuacionRestante = MAX_PUNTUACION - totalPuntuacion;

  return (
    <div className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% min-h-screen flex flex-col justify-center'>
    <div className='max-w-3xl mx-auto p-8 bg-white shadow-md rounded-md text-center'>
      <h2 className='text-xl font-bold mb-2'>Preguntas del Examen</h2>
      <p className='text-base'>Puntuación Total: {totalPuntuacion} / {MAX_PUNTUACION}</p>
      <p className='text-base'>Puntuación Restante: {puntuacionRestante}</p>
      <ol className='mt-4'>
        {preguntas.map((pregunta, preguntaIndex) => (
          <li key={pregunta.id }>
            {pregunta.pregunta}
            <ol type="a">
              {pregunta.respuestas.map((respuesta, respuestaIndex) => (
                <li key={respuesta.id}>
                  <p className='text-neutral-600'>
                    {respuesta.respuesta} - Puntuación: {respuesta.puntucion}
                  </p>   
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      {!addingPregunta && puntuacionRestante > 0 && !addingRespuestas && (
        <button className='bg-blue-600 text-white px-3 py-1 mt-2 rounded-md' onClick={handleAgregarPregunta}>Agregar Pregunta</button>
      )}
      {addingPregunta && (
        <AgregarPreguntas examenId={examenId} setPreguntaId={handlePreguntaCreada} puntuacionRestante={puntuacionRestante} />
      )}
      {addingRespuestas && preguntaActualId !== null && (
        <AgregarRespuestas preguntaId={preguntaActualId} setPreguntaId={handleRespuestasCreadas} puntuacionRestante={puntuacionRestante} />
      )}
      {addingPregunta && puntuacionRestante <= 0 && (
        <p className="mt-6 text-red-500">No puedes agregar más preguntas, has alcanzado la puntuación máxima de {MAX_PUNTUACION}</p>
      )}
    </div>
    </div>
  );
};

