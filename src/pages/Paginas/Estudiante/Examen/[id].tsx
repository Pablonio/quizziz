'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Examen, Pregunta, Respuesta } from './Componentes/interfaces';

export default function ExamenDetalle() {
  const router = useRouter();
  const { id } = router.query;
  const [examen, setExamen] = useState<Examen | null>(null);
  const [respuestas, setRespuestas] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const fetchExamen = async () => {
      if (id) {
        try {
          const response = await axios.post<Examen>('/api/Examen/recuperar-examen', { examenId: id });
          setExamen(response.data);
        } catch (error) {
          console.error('Error al recuperar el examen:', error);
        }
      }
    };

    fetchExamen();
  }, [id]);

  const handleRespuestaChange = (preguntaId: number, respuestaId: number) => {
    setRespuestas((prevRespuestas: { [key: number]: number }) => ({
      ...prevRespuestas,
      [preguntaId]: respuestaId,
    }));
  };

  const handleSubmit = async () => {
    try {
      const estudianteId = Cookies.get('id'); // Obtener el ID del estudiante de las cookies
      if (!estudianteId) {
        alert('No se encontró la ID del estudiante en las cookies');
        return;
      }
  
      const respuestasEnviar = Object.entries(respuestas).map(([preguntaId, respuestaId]) => ({
        preguntaId: parseInt(preguntaId),
        respuestaId: respuestaId as number,
      }));
  
      // Enviar respuestas del estudiante al servidor
      await axios.post('/api/ExamenEstudiantes/guardar-respuestas', {
        examenId: id,
        estudianteId: parseInt(estudianteId),
        respuestas: respuestasEnviar,
      });
      console.log('Respuestas enviadas:', respuestasEnviar);
  
      // Recuperar la puntuación de las respuestas del estudiante
      const respuestaIds = respuestasEnviar.map(respuesta => respuesta.respuestaId);
      const puntuaciones = [];
      for (const respuestaId of respuestaIds) {
        const response = await axios.post('/api/Respuestas/recuperar-respuest', { respuestaId });
        puntuaciones.push(response.data.puntucion);
      }
  
      // Sumar las puntuaciones
      const puntajeTotal = puntuaciones.reduce((acum, puntuacion) => acum + puntuacion, 0);
  
      // Guardar la nota final del estudiante
      const response = await axios.post('/api/Nota/crear-nota', {
        puntajeTotal,
        examenEstudianteId: parseFloat(estudianteId), // Convert to float
      });

      console.log('Nota final guardada:', response.data);
  
    } catch (error) {
      console.error('Error al enviar respuestas:', error);
      alert('Error al enviar respuestas');
    }
  };
  

  if (!examen) {
    return <div className="flex justify-center items-center h-screen">
             <div className="text-lg font-bold">Cargando...</div>
           </div>;
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-2xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-h-screen overflow-y-auto">
        <h1 className="text-center text-2xl font-bold mb-6">{examen.nombreExamen}</h1>
        <ul className="list-none p-0">
          {examen.preguntas.map((pregunta: Pregunta) => (
            <li key={pregunta.id} className="mb-6">
              <p className="text-lg font-semibold mb-2">{pregunta.pregunta}</p>
              <ul className="list-none p-0">
                {pregunta.respuestas.map((respuesta: Respuesta) => (
                  <li key={respuesta.id} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name={`respuesta-${pregunta.id}`}
                        value={respuesta.id}
                        checked={respuestas[pregunta.id] === respuesta.id}
                        onChange={() => handleRespuestaChange(pregunta.id, respuesta.id)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">{respuesta.respuesta}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enviar Respuestas
          </button>
        </div>
      </div>
    </div>
  );
};



