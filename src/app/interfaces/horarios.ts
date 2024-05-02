export interface Ihorario {
  IdInstructor: number,
  IdGrupo: number,
  CodigoComun: number,
  IdDia: number,
  HoraInicio: number,
  HoraFin: number,
  IdSalon: number,
  IdJornada: number,
  Vigencia: number,
  Semestre: number,
  IdPrograma: number,
}
export interface IHorariosView {
  nombreInstructor : string,
  apellidoInstructor : string,
  idInstructor?: number,
  nombreDia: string,
  idDia?: number;
  idGrupo: number,
  nombreSalon: string,
  idSalon: number,
  horario?: string,
  horaInicio: number,
  horaFin: number,
  asignatura: string,
  idAsignatura: number,
  jornada: string,
  vigencia: number,
  nombreProgrma: string,
  idPrograma?: number,
  cantidadEstudiante?: number
}
export interface IPreviewHorario{
  nombreDia: string,
  idDia?: number,
  salon: string
  idSalon?: number,
  nombreInstructor: string,
  idInstructor?: number,
  horario: string,
  idHoraInicio?: number,
  idHoraFin?: number,
  asignatura: string,
  grupo: number,
  codigoComun?: number,
  idPrograma?: number
}
export interface CargaAcademicaEstudianteHorario{
  Id?: number,
  idEstudiante: number,
  idPrograma: number,
  idInstructor: number,
  idAsignatura: number,
  Vigencia: number,
  Semestre: number,
  Jornada?: number,
  Grupo: number,
  idSalon: number,
  idDia: number,
  HoraInicio: number,
  HoraFin: number
}
