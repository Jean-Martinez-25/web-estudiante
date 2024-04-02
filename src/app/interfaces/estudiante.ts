export interface IEstudiante {
  id?: number;
  idEstudiante: number,
  nombre: string;
  apellido: string;
  programa: string;
  telefono: number;
  email: string;
  fecha_nacimiento: string;
  estado: string;
  vigencia: number,
  courses?: INota[]; // Lista de notas del estudiante
}


// Definición de la interfaz para cursos
export interface INota {
  id?: number;
  idEstudiante: number;
  nombre: string;
  nombreInstructor: string;
  calificacion: number;
  creditos: number;
  vigencia: number;
}
