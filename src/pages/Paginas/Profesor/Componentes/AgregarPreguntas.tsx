
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import toast, {Toaster } from 'react-hot-toast';

interface AgregarPreguntasProps {
  examenId: number;
  setPreguntaId: (id: number) => void;
  puntuacionRestante: number;
}

export default function AgregarPreguntas({ examenId, setPreguntaId, puntuacionRestante }: AgregarPreguntasProps) {
  const [pregunta, setPregunta] = useState('');

  const handlePreguntaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPregunta(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/Preguntas/crear-preguntas', {
        pregunta,
        examenId,
      });
      const preguntaId = response.data.id; // Obtener el ID de la pregunta creada
      setPreguntaId(preguntaId);
      toast.success('Pregunta creada con éxito.');
    } catch (error) {
      console.error('Error al crear pregunta:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-center text-xl font-bold mb-2">Agregar Pregunta al Examen</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Pregunta:</label>
          <input
            type="text"
            value={pregunta}
            onChange={handlePreguntaChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar Pregunta
          </button>
        </div>
      </form>
      <Toaster/>
    </div>
  );
};

