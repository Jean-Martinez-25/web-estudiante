import { IPrograma } from "./programa";

export interface IEstudiante {
  id?: number;
  idEstudiante: number,
  nombre: string;
  apellido: string;
  idPrograma: number;
  programa?: string;
  telefono: number;
  email: string;
  fecha_nacimiento: string;
  vigencia: number,
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
