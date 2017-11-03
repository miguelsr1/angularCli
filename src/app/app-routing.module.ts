import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EstadisticaComponent} from './angular2/componente/ejecucion/estadistica/app.estadisticas';

const appRoutes: Routes = [
    {path: 'estadisticas', component: EstadisticaComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}