import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';

interface CrearExamenProps {
  setExamenId: (id: number) => void;
}

const CrearExamen: React.FC<CrearExamenProps> = ({ setExamenId }) => {
  const [nombreExamen, setNombreExamen] = useState('');
  const [estado, setEstado] = useState('activo');
  const [usuarioId, setUsuarioId] = useState(0); 

  useEffect(() => {

    const usuarioIdFromCookie = Cookies.get('id');
    if (usuarioIdFromCookie) {
      setUsuarioId(parseInt(usuarioIdFromCookie)); 
    }
  }, []); 

  const handleNombreExamenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombreExamen(e.target.value);
  };
//

  const handleEstadoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEstado(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('datos enviados', nombreExamen, usuarioId, estado);
      const response = await axios.post('/api/Examen/crear-examen', {
        nombreExamen,
        usuarioId: parseInt(Cookies.get('id') || '0'),
        estado,
      });
      const examenId = response.data.id;
      setExamenId(examenId);
      console.log('Examen creado con éxito:', response.data);
    } catch (error) {
      console.error('Error al crear examen:', error);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
        <h2 className="text-center text-xl font-bold mb-4">Crear Examen</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Examen:</label>
          <input
            type="text"
            value={nombreExamen}
            onChange={handleNombreExamenChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Estado:</label>
          <select
            value={estado}
            onChange={handleEstadoChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear Examen
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default CrearExamen;


