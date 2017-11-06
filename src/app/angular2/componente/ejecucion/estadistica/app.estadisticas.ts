import {Component, OnInit} from '@angular/core';
import {MenuItem, Message} from 'primeng/primeng';
import {EntidadEducativa} from '../../../modelo/entidadeducativa/EntidadEducativa';
import {EstadisticaCenso} from '../../../modelo/estadisticacenso/EstadisticaCenso';
import {OrganizacionEducativa} from '../../../modelo/organizacioneducativa/OrganizacionEducativa';
import {EntidadService} from '../../../servicio/entidad_educativa/entidadservicio';

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
    ) {}
}/*

class PrimeOrganizacion implements OrganizacionEducativa {
    constructor(
        public idOrganizacionEducativa?,
        public codigoEntidad?,
        public nombreMiembro?,
        public telDirector?
    ) {}
}

class PrimeEstadisticaCenso implements EstadisticaCenso {
    public idEstadistica: number;
    public idNivelEducativo: number;
    public codigoEntidad: string;
    public masculino: number = 0;
    public femenimo: number = 0
    public idProcesoAdq: number

    constructor(

    ) {}
}*/

@Component({
    selector: 'app-root',
    templateUrl: './app.estadisticas.html',
    styleUrls: ['./app.estadisticas.css'],
    providers: [EntidadService]
})
export class EstadisticaComponent implements OnInit {
    lstEntidades: PrimeEntidad[];
    gifAjax: boolean = false;
    msg: Message[] = [];
    private lstEstadisticaCenso: EstadisticaCenso[];
    private lstEstCensoSend: EstadisticaCenso[];
    private estPar: EstadisticaCenso = new EstadisticaCenso();
    private estICiclo: EstadisticaCenso = new EstadisticaCenso();
    private estIICiclo: EstadisticaCenso = new EstadisticaCenso();
    private estIIICiclo: EstadisticaCenso = new EstadisticaCenso();
    private est7Grado: EstadisticaCenso = new EstadisticaCenso();
    private est8Grado: EstadisticaCenso = new EstadisticaCenso();
    private est9Grado: EstadisticaCenso = new EstadisticaCenso();
    private estBar: EstadisticaCenso = new EstadisticaCenso();
    private entidad: EntidadEducativa = new PrimeEntidad();
    private organizacion: OrganizacionEducativa = new OrganizacionEducativa();

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
                command: (event) => {this.guardar()}
            }
        ];
    }

    guardar() {
        this.lstEstCensoSend = [];
        for (let est of this.lstEstadisticaCenso) {
            this.gifAjax = false;

            if (est.idEstadistica == null) {
                //create
                this.lstEstCensoSend.push(est);
            } else {
                //update
                this.entidadService.updEstadistica(est);
            }
        }

        if (this.lstEstCensoSend.length > 0) {
            this.entidadService.addAllEstadistica(this.lstEstCensoSend).subscribe(
                (data) => {
                    console.log(data);
                    this.gifAjax = true;
                    this.msg.push({severity: "info", summary: 'Información', detail: "Operación realizada con éxito."});
                },
                error => {this.msg.push({severity: "error", summary: 'Error', detail: "Ha ocurrido un error."});}
            );
        }
    }

    valuechange(event) {
        if (event.length >= 5) {
            this.entidad = this.lstEntidades.find(item => item.codigoEntidad === event);
            this.entidadService.getOrganizacionCeMedium(this.entidad.codigoEntidad).then(presidente => this.organizacion = presidente)
            this.entidadService.getEstadisticaCensoMedium(this.entidad.codigoEntidad, 12).then(lst => this.lstEstadisticaCenso = lst)
                .then(result => {
                    this.estPar = this.lstEstadisticaCenso.find(item => item.idNivelEducativo === 1);
                    this.estICiclo = this.lstEstadisticaCenso.find(item => item.idNivelEducativo === 3);
                    this.estIICiclo = this.lstEstadisticaCenso.find(item => item.idNivelEducativo === 4);
                    this.estIIICiclo = this.lstEstadisticaCenso.find(item => item.idNivelEducativo === 5);
                    this.estBar = this.lstEstadisticaCenso.find(item => item.idNivelEducativo === 6);
                    this.est7Grado = this.lstEstadisticaCenso.find(item => item.idNivelEducativo === 7);
                    this.est8Grado = this.lstEstadisticaCenso.find(item => item.idNivelEducativo === 8);
                    this.est9Grado = this.lstEstadisticaCenso.find(item => item.idNivelEducativo === 9);
                });
        } else {
            this.entidad = new PrimeEntidad();
        }
    }

    ngOnInit() {
        this.entidadService.getEntidadesMedium().
            then(lstEntidades => {
                this.lstEntidades = lstEntidades;
                this.gifAjax = true;
            });
    }
    //Parvularia
    getTotalUniPar(): number {
        return (this.estPar.femenimo * 8.5) + (this.estPar.masculino * 8.25);
    }
    getTotalUtiPar(): number {
        return (this.estPar.femenimo + this.estPar.masculino) * 7.4;
    }
    getTotalZapPar(): number {
        return (this.estPar.femenimo + this.estPar.masculino) * 14.60;
    }

    //I Ciclo
    getTotalUniICiclo(): number {
        return (this.estICiclo.femenimo * 9) + (this.estICiclo.masculino * 10.50);
    }
    getTotalUtiICiclo(): number {
        return (this.estICiclo.femenimo + this.estICiclo.masculino) * 6.75;
    }
    getTotalZapICiclo(): number {
        return (this.estICiclo.femenimo + this.estICiclo.masculino) * 14.60;
    }

    //II Ciclo
    getTotalUniIICiclo(): number {
        return (this.estIICiclo.femenimo * 9) + (this.estIICiclo.masculino * 10.50);
    }
    getTotalUtiIICiclo(): number {
        return (this.estIICiclo.femenimo + this.estIICiclo.masculino) * 7.25;
    }
    getTotalZapIICiclo(): number {
        return (this.estIICiclo.femenimo + this.estIICiclo.masculino) * 14.60;
    }

    //III Ciclo
    getTotalUniIIICiclo(): number {
        return (this.estIIICiclo.femenimo * 9) + (this.estIIICiclo.masculino * 10.50);
    }
    getTotalUtiIIICiclo(): number {
        return (this.estIIICiclo.femenimo + this.estIIICiclo.masculino) * 9;
    }
    getTotalZapIIICiclo(): number {
        return (this.estIIICiclo.femenimo + this.estIIICiclo.masculino) * 14.60;
    }

    //Bachillerato
    getTotalUniBar(): number {
        return (this.estBar.femenimo * 9) + (this.estBar.masculino * 10.50);
    }
    getTotalUtiBar(): number {
        return (this.estBar.femenimo + this.estBar.masculino) * 10;
    }
    getTotalZapBar(): number {
        return (this.estBar.femenimo + this.estBar.masculino) * 16;
    }

    //7mo Grado
    getTotalUni7Grado(): number {
        return (this.est7Grado.femenimo * 9) + (this.est7Grado.masculino * 10.50);
    }
    getTotalUti7Grado(): number {
        return (this.est7Grado.femenimo + this.est7Grado.masculino) * 10;
    }
    getTotalZap7Grado(): number {
        return (this.est7Grado.femenimo + this.est7Grado.masculino) * 16;
    }

    //total de alumnos
    getTotalFem(): number {
        return this.estPar.femenimo + this.estICiclo.femenimo + this.estIICiclo.femenimo + this.estIIICiclo.femenimo + this.estBar.femenimo;
    }
    getTotalMas(): number {
        return this.estPar.masculino + this.estICiclo.masculino + this.estIICiclo.masculino + this.estIIICiclo.masculino + this.estBar.masculino;
    }
    getTotal(): number {
        return this.getTotalFem() + this.getTotalMas();
    }

    //totales de montos
    getTotalUni(): number {
        return this.getTotalUniPar() + this.getTotalUniICiclo() + this.getTotalUniIICiclo() + this.getTotalUniIIICiclo() + this.getTotalUniBar();
    }
    getTotalUti(): number {
        return this.getTotalUtiPar() + this.getTotalUtiICiclo() + this.getTotalUtiIICiclo() + this.getTotalUtiIIICiclo() + this.getTotalUtiBar();
    }
    getTotalZap(): number {
        return this.getTotalZapPar() + this.getTotalZapICiclo() + this.getTotalZapIICiclo() + this.getTotalZapIIICiclo() + this.getTotalZapBar();
    }
}
