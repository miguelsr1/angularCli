export class EstadisticaCenso {
    idEstadistica: number;
    idNivelEducativo: number;
    codigoEntidad: string;
    masculino: number;
    femenimo: number;
    idProcesoAdq: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}