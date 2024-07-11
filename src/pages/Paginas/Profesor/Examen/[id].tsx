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
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{examen.nombreExamen}</h1>
      <ul>
        {examen.preguntas.map((pregunta: Pregunta) => (
          <li key={pregunta.id}>
            <p>{pregunta.pregunta}</p>
            <ul>
              {pregunta.respuestas.map((respuesta: Respuesta) => (
                <li key={respuesta.id}>
                  {respuesta.respuesta} - Puntuación: {respuesta.puntucion}
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
