import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {EntidadEducativa} from '../../modelo/entidadeducativa/entidadeducativa';
import {EstadisticaCenso} from '../../modelo/estadisticacenso/EstadisticaCenso';
import {OrganizacionEducativa} from '../../modelo/organizacioneducativa/OrganizacionEducativa';

@Injectable()
export class EntidadService {
    private urlAddAplicacion = 'http://localhost:8080/serviciosMined/';

    constructor(private http: HttpClient) {

    }

    /*getEntidadesMedium() {
        return this.http.get(this.urlAddAplicacion + 'findAllEntidades')
            .toPromise()
            .then(res => <EntidadEducativa[]> res.json().lstEntidades)
            .then(data => {return data;});
    }*/

    getEntidadesMedium() {
        return this.http.get<any>(this.urlAddAplicacion + 'findAllEntidades')
            .toPromise()
            .then(res => <EntidadEducativa[]> res.lstEntidades)
            .then(lstEntidades => {return lstEntidades;});
    }

    /*getAll(): Observable<EntidadEducativa[]> {
        return this.http
            .get(this.urlAddAplicacion + 'findAllEntidades')
            .map(mapPersons);
    }*/


    getOrganizacionCeMedium(codigoEntidad: string) {
        return this.http.get<any>(this.urlAddAplicacion + 'getPresidenteCe/' + codigoEntidad)
            .toPromise()
            .then(res => <OrganizacionEducativa> res.presidenteCe)
            .then(presidenteCe => {return presidenteCe;});
    }

    getEstadisticaCensoMedium(codigoEntidad: string, idProcesoAdq: number) {
        return this.http.get<any>(this.urlAddAplicacion + 'findEstadisticaCenso/' + codigoEntidad + '/' + idProcesoAdq)
            .toPromise()
            .then(res => <EstadisticaCenso[]> res.lstEstadisticaCenso)
            .then(lstEstadisticaCenso => {return lstEstadisticaCenso});
    }

    addEstadistica(est: EstadisticaCenso) {
        return this.http.post(this.urlAddAplicacion + 'addEstadistica', JSON.stringify(est)).subscribe();
    }

    addAllEstadistica(lstApp: EstadisticaCenso[]) {
        //let headers = new Headers();
        return this.http.post(this.urlAddAplicacion + 'addAllEstadisticas', JSON.stringify(lstApp));//.subscribe();
    }

    updEstadistica(est: EstadisticaCenso) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");

        return this.http
            .put(this.urlAddAplicacion + 'updEstadistica', JSON.stringify(est), {headers})
            .subscribe();
    }
}