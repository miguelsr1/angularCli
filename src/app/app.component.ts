import {Component} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    text: string;

    disabled: boolean = true;

    toggleDisabled() {
        this.disabled = !this.disabled;
    }

    lstMenu: MenuItem[];
    stringMenu: string;

    constructor() {
        //console.log("ok 3 :" + this.stringMenu);
    }


    ngOnInit() {
        //this.menuService.getMenuMedium().then(stringMenu => this.stringMenu = stringMenu);
        //this.lstMenu = this.menuService.getMenuMedium()

        this.lstMenu = [{"label": "Paquete Escolar", "items": [{"label": "Ejecución", "items": [{"label": "Estadistica Censo", "routerLink": ['/estadisticas'], "expanded": false, "disabled": false}, {"label": "Oferta de Bienes y/o Servicios", "url": "/app/ejecucion/regOferta.mined", "expanded": false, "disabled": false}, {"label": "Detalle Oferta", "url": "/app/ejecucion/regDetalleOferta.mined", "expanded": false, "disabled": false}, {"label": "Reserva de Fondos", "url": "/app/ejecucion/regReservaFondos.mined", "expanded": false, "disabled": false}, {"label": "Generación de Contratos", "url": "/app/ejecucion/regContrato.mined", "expanded": false, "disabled": false}], "expanded": true, "disabled": false}, {"label": "Control", "routerLink": ['/grupos'], "expanded": false, "disabled": false}, {"label": "Seguimiento", "routerLink": ['/aplicaciones'], "expanded": false, "disabled": false}], "expanded": true, "disabled": false}];
    }

    valudarUSuario() {
        //this.usuarioService.post().subscribe(result => {console.log(result)});
    }

}
