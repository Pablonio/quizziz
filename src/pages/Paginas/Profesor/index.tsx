
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import CrearExamen from './Componentes/CrearExamen';
import PreguntasDelExamen from './Componentes/PreguntasDelExamen';
import toast, { Toaster } from 'react-hot-toast';

export default function PadreDeLosTres() {
  const [examenId, setExamenId] = useState<number | null>(null);
  const [examenes, setExamenes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchExamenes = async () => {
      const userId = Cookies.get('id');
      if (userId) {
        try {
          const response = await axios.post('/api/Examen/recuperar-todos-los-examenes', { userId });
          setExamenes(response.data);
          toast.success('Se han recuperado todos los exámenes del usuario.');
        } catch (error) {
            toast.error('Error al recuperar exámenes del usuario.');
        }
      } else {
        toast.error('No se encontró la ID del usuario en las cookies.');
      }
    };

    fetchExamenes();
  }, []);

  const handleExamenClick = (id: number) => {
    router.push(`/Paginas/Profesor/Examen/${id}`);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% min-h-screen p-8">
      {!examenId ? (
        <CrearExamen setExamenId={setExamenId} />
      ) : (
        <PreguntasDelExamen examenId={examenId} />
      )}
      {!examenId && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Hola Sebas</h2>
          <ul className="space-y-2">
            {examenes.map((examen) => (
              <li key={examen.id}>
                <a onClick={() => handleExamenClick(examen.id)} className="cursor-pointer text-blue-500 hover:text-blue-700">
                  {examen.nombreExamen}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Toaster/>
    </div>
  );
};



