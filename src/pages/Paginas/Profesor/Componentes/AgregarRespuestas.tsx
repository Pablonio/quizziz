import React, { useState, FormEvent } from 'react';
import axios from 'axios';

interface Opcion {
  respuesta: string;
  puntucion: number;
  correcta: boolean;
}

interface AgregarRespuestasProps {
  preguntaId: number;
  setPreguntaId: (id: number | null) => void; // Para volver a null después de agregar las respuestas
  puntuacionRestante: number;
}

const AgregarRespuestas: React.FC<AgregarRespuestasProps> = ({ preguntaId, setPreguntaId, puntuacionRestante }) => {
  const [opciones, setOpciones] = useState<Opcion[]>([{ respuesta: '', puntucion: 0, correcta: false }]);
  const [totalPuntuacion, setTotalPuntuacion] = useState(0);

  const handleOpcionChange = (index: number, field: keyof Opcion, value: string | number | boolean) => {
    const newOpciones = [...opciones];
    newOpciones[index] = { ...newOpciones[index], [field]: value };

    // Si se desmarca una opción correcta, se asegura de que su puntuación sea 0
    if (field === 'correcta' && value === false) {
      newOpciones[index].puntucion = 0;
    }

    setOpciones(newOpciones);

    // Actualizar la puntuación total
    const nuevaPuntuacionTotal = newOpciones.reduce((acc, opcion) => acc + opcion.puntucion, 0);
    setTotalPuntuacion(nuevaPuntuacionTotal);
  };

  const handleAddOpcion = () => {
    setOpciones([...opciones, { respuesta: '', puntucion: 0, correcta: false }]);
  };

  const handleRemoveOpcion = (index: number) => {
    const newOpciones = [...opciones];
    newOpciones.splice(index, 1);
    setOpciones(newOpciones);

    // Actualizar la puntuación total
    const nuevaPuntuacionTotal = newOpciones.reduce((acc, opcion) => acc + opcion.puntucion, 0);
    setTotalPuntuacion(nuevaPuntuacionTotal);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (totalPuntuacion > puntuacionRestante) {
        alert('La puntuación total de las respuestas excede la puntuación restante del examen.');
        return;
      }

      // Crear las respuestas asociadas a la pregunta
      await Promise.all(
        opciones.map((opcion) =>
          axios.post('/api/Respuestas/crear-respuesta', {
            respuesta: opcion.respuesta,
            puntucion: opcion.correcta ? opcion.puntucion : 0,
            preguntaId,
            correcta: opcion.correcta,
          })
        )
      );
      console.log('Respuestas creadas con éxito');
      setPreguntaId(null); // Volver a null para permitir agregar otra pregunta
    } catch (error) {
      console.error('Error al crear respuestas:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-center text-xl font-bold mb-4">Agregar Respuestas a la Pregunta</h2>
        {opciones.map((opcion, index) => (
          <div key={index} className="mb-4">
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Respuesta:</label>
              <input
                type="text"
                value={opcion.respuesta}
                onChange={(e) => handleOpcionChange(index, 'respuesta', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={opcion.correcta}
                onChange={(e) => handleOpcionChange(index, 'correcta', e.target.checked)}
                className="mr-2 leading-tight"
              />
              <label className="block text-gray-700 text-sm font-bold">Selecciona la correcta</label>
            </div>
            {opcion.correcta && (
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">Puntuación:</label>
                <input
                  type="number"
                  value={opcion.puntucion}
                  onChange={(e) => handleOpcionChange(index, 'puntucion', parseInt(e.target.value))}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => handleRemoveOpcion(index)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mx-auto block"
            >
              Eliminar Opción
            </button>
          </div>
        ))}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={handleAddOpcion}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto block"
          >
            Agregar Opción
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto block"
          >
            Crear Respuestas
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarRespuestas;
