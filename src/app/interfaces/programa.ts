export interface IPrograma{
  id? : number,
  idPrograma : number,
  nombre: string,
  abreviatura: string,
  idEstado: number,
}
export interface ISemestrePrograma{
  id: number,
  nombre?: string,
  semestres: number,
}
