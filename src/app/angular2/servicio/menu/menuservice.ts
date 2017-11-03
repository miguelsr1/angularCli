import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MenuItem } from 'primeng/primeng';

@Injectable()
export class MenuService {

    private urlAddAplicacion: string;
    private lstMenu: MenuItem[];

    constructor(private http: Http) {
        this.urlAddAplicacion = 'http://192.168.22.133:8080/serviciosMined/';
    }

    getMenuMedium(): MenuItem[] {

        this.http.get(this.urlAddAplicacion + 'findMenuStr/6/66')
            .toPromise()
            .then(res => res.text())
            .then(data => {
                //console.log('ok');
                data = data.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
                console.log(data);
                this.lstMenu = JSON.parse(data);
                return data;
            });
        return this.lstMenu;
    }
}
