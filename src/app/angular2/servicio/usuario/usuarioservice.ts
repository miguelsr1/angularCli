import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UsuarioService {
    private urlAddAplicacion: string;

    constructor(private http: Http) {
        this.urlAddAplicacion = 'http://192.168.22.133:8080/serviciosMined/';
    }

    createAuthorizationHeader(headers: Headers) {
        headers.append('valor', 'Basic');
    }

    post() {
        let headers = new Headers({ 'Content-Type': 'application' });
        this.createAuthorizationHeader(headers);
        let opt = new RequestOptions({ headers: headers });
        console.log('headers '+headers);
        console.log('opt '+opt);
        return this.http.get(this.urlAddAplicacion + 'validartUsuario', opt);
    }
}