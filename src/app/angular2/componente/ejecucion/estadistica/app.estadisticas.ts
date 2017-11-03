import { Component } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { EntidadEducativa } from '../../../modelo/entidadeducativa/entidadeducativa';
import { EstadisticaCenso } from '../../../modelo/estadisticacenso/EstadisticaCenso';
import { OrganizacionEducativa } from '../../../modelo/organizacioneducativa/OrganizacionEducativa';
import { EntidadService } from '../../../servicio/entidad_educativa/entidadservicio';

class PrimeEntidad implements EntidadEducativa {
    constructor(
        public codigoEntidad?,
        public nombre?,
        public direccion?,
        public telefono1?,
        public telefono2?,
        public fax?,
        public inicialesModalidad?,
        public codigoDepartamento?,
        public codigoMunicipio?,
        public codigoNombre?
    ) { }
}

class PrimeOrganizacion implements OrganizacionEducativa {
    constructor(
        public idOrganizacionEducativa?,
        public codigoEntidad?,
        public nombreMiembro?,
        public telDirector?
    ) { }
}

class PrimeEstadisticaCenso implements EstadisticaCenso {
    public idEstadistica: number;
    public idNivelEducativo: number;
    public codigoEntidad: string;
    public masculino: number = 0;
    public femenimo: number = 0
    public idProcesoAdq: number

    constructor(

    ) { }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.estadisticas.html',
    styleUrls: ['./app.estadisticas.css'],
    providers: [EntidadService]
})
export class EstadisticaComponent {
    private lstEntidades: PrimeEntidad[];
    private lstEstadisticaCenso: PrimeEstadisticaCenso[];
    private estadisticaPar: EstadisticaCenso = new PrimeEstadisticaCenso();
    private estadisticaICiclo: EstadisticaCenso = new PrimeEstadisticaCenso();
    private estadisticaIICiclo: EstadisticaCenso = new PrimeEstadisticaCenso();
    private estadisticaIIICiclo: EstadisticaCenso = new PrimeEstadisticaCenso();
    private estadisticaBar: EstadisticaCenso = new PrimeEstadisticaCenso();
    private entidad: EntidadEducativa = new PrimeEntidad();
    private organizacion: OrganizacionEducativa = new PrimeOrganizacion();
    
    itemsMenu: MenuItem[];

    constructor(private entidadService: EntidadService) {
        this.itemsMenu = [
            {
                label: 'Nuevo',
                icon: 'fa-file-o'
            },
            {
                label: 'Modificar',
                icon: 'fa-edit'
            },
            {
                label: 'Guardar',
                icon: 'fa-save',
                command: (event) => { this.guardar() }
            }
        ];
    }
    
    guardar() {
        
    }

    valuechange(event) {
        if (event.length >= 5) {
            this.entidad = this.lstEntidades.find(item => item.codigoEntidad === event);
            //this.entidadService.getOrganizacionCeMedium(event).then(presidente => this.organizacion = presidente)
            this.entidadService.getEstadisticaCensoMedium(event, 9).then(lst => this.lstEstadisticaCenso = lst)
                .then(result => {
                    this.estadisticaPar = this.lstEstadisticaCenso.find(item => item.idNivelEducativo === 1);
                    this.estadisticaICiclo = this.lstEstadisticaCenso.find(item => item.idNivelEducativo === 3);
                    this.estadisticaIICiclo = this.lstEstadisticaCenso.find(item => item.idNivelEducativo === 4);
                    this.estadisticaIIICiclo = this.lstEstadisticaCenso.find(item => item.idNivelEducativo === 5);
                    this.estadisticaBar = this.lstEstadisticaCenso.find(item => item.idNivelEducativo === 6);
                });
        } else {
            this.entidad = new PrimeEntidad();
        }
    }

    ngOnInit() {
        this.entidadService.getEntidadesMedium().then(lstEntidades => this.lstEntidades = lstEntidades);
    }
    //Parvularia
    getTotalUniPar(): number {
        return (this.estadisticaPar.femenimo * 8.5 * 2) + (this.estadisticaPar.masculino * 8.25 * 2);
    }
    getTotalUtiPar(): number {
        return (this.estadisticaPar.femenimo + this.estadisticaPar.masculino) * 7.4;
    }
    getTotalZapPar(): number {
        return (this.estadisticaPar.femenimo + this.estadisticaPar.masculino) * 14.60;
    }
    
    //I Ciclo
    getTotalUniICiclo(): number {
        return (this.estadisticaICiclo.femenimo * 9 * 2) + (this.estadisticaICiclo.masculino * 10.50 * 2);
    }
    getTotalUtiICiclo(): number {
        return (this.estadisticaICiclo.femenimo + this.estadisticaICiclo.masculino) * 6.75;
    }
    getTotalZapICiclo(): number {
        return (this.estadisticaICiclo.femenimo + this.estadisticaICiclo.masculino) * 14.60;
    }
    
    //II Ciclo
    getTotalUniIICiclo(): number {
        return (this.estadisticaIICiclo.femenimo * 9 * 2) + (this.estadisticaIICiclo.masculino * 10.50 * 2);
    }
    getTotalUtiIICiclo(): number {
        return (this.estadisticaIICiclo.femenimo + this.estadisticaIICiclo.masculino) * 7.25;
    }
    getTotalZapIICiclo(): number {
        return (this.estadisticaIICiclo.femenimo + this.estadisticaIICiclo.masculino) * 14.60;
    }
    
    //III Ciclo
    getTotalUniIIICiclo(): number {
        return (this.estadisticaIIICiclo.femenimo * 9 * 2) + (this.estadisticaIIICiclo.masculino * 10.50 * 2);
    }
    getTotalUtiIIICiclo(): number {
        return (this.estadisticaIIICiclo.femenimo + this.estadisticaIIICiclo.masculino) * 9;
    }
    getTotalZapIIICiclo(): number {
        return (this.estadisticaIIICiclo.femenimo + this.estadisticaIIICiclo.masculino) * 14.60;
    }
    
    //Bachillerato
    getTotalUniBar(): number {
        return (this.estadisticaBar.femenimo * 9 * 2) + (this.estadisticaBar.masculino * 10.50 * 2);
    }
    getTotalUtiBar(): number {
        return (this.estadisticaBar.femenimo + this.estadisticaBar.masculino) * 10;
    }
    getTotalZapBar(): number {
        return (this.estadisticaBar.femenimo + this.estadisticaBar.masculino) * 16;
    }
    
    //total de alumnos
    getTotalFem():number{
        return this.estadisticaPar.femenimo + this.estadisticaICiclo.femenimo + this.estadisticaIICiclo.femenimo + this.estadisticaIIICiclo.femenimo + this.estadisticaBar.femenimo;
    }
    getTotalMas():number{
        return this.estadisticaPar.masculino + this.estadisticaICiclo.masculino + this.estadisticaIICiclo.masculino + this.estadisticaIIICiclo.masculino + this.estadisticaBar.masculino;
    }
    getTotal():number{
        return this.getTotalFem() + this.getTotalMas();
    }
    
    //totales de montos
    getTotalUni():number{
        return this.getTotalUniPar() + this.getTotalUniICiclo() + this.getTotalUniIICiclo() + this.getTotalUniIIICiclo() + this.getTotalUniBar();
    }
    getTotalUti():number{
        return this.getTotalUtiPar() + this.getTotalUtiICiclo() + this.getTotalUtiIICiclo() + this.getTotalUtiIIICiclo() + this.getTotalUtiBar();
    }
    getTotalZap():number{
        return this.getTotalZapPar() + this.getTotalZapICiclo() + this.getTotalZapIICiclo() + this.getTotalZapIIICiclo() + this.getTotalZapBar();
    }
}
