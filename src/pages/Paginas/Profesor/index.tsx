// PadreDeLosTres.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import CrearExamen from './Componentes/CrearExamen';
import PreguntasDelExamen from './Componentes/PreguntasDelExamen';

const PadreDeLosTres: React.FC = () => {
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
        } catch (error) {
          console.error('Error al recuperar exámenes:', error);
        }
      } else {
        console.error('No se encontró la ID del usuario en las cookies');
      }
    };

    fetchExamenes();
  }, []);

  const handleExamenClick = (id: number) => {
    router.push(`/Paginas/Profesor/Examen/${id}`);
  };

  return (
    <div className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
      {!examenId ? (
        <CrearExamen setExamenId={setExamenId} />
      ) : (
        <PreguntasDelExamen examenId={examenId} />
      )}
      {!examenId && (
        <div>
          <h2>Exámenes del Usuario</h2>
          <ul>
            {examenes.map((examen) => (
              <li key={examen.id}>
                <a onClick={() => handleExamenClick(examen.id)} className="cursor-pointer text-blue-500">
                  {examen.nombreExamen}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PadreDeLosTres;

