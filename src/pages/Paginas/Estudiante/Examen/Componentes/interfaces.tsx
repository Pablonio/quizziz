
export interface Respuesta {
    id: number;
    respuesta: string;
    correcta: boolean;
  }
  
  export interface Pregunta {
    id: number;
    pregunta: string;
    respuestas: Respuesta[];
  }
  
  export interface Examen {
    id: number;
    nombreExamen: string;
    preguntas: Pregunta[];
  }
  