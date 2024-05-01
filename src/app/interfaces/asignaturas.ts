export interface IAsignaturas {
  id?: number,
  idAsignatura: number,
  idCodigoComun: number,
  nombre: string,
  creditos: number,
  idPrograma: number,
  idEstado: number,
  numSemestre: number
}
export interface ICargaAcademicaEstudiante{
  id?: number,
  idEstudiante: number,
  idPrograma: number,
  idAsignatura: number,
  vigencia: number,
}
export interface IRespuestaCargaAcademica{
  idEstudiante : number,
  idPrograma : number,
  nombre: string,
  creditos: number,
  numSemestre: number,
}
