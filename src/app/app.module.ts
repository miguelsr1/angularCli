import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {AppComponent} from './app.component';
import {EstadisticaComponent} from './angular2/componente/ejecucion/estadistica/app.estadisticas';
import {AutoCompleteModule, GalleriaModule, PanelModule, PanelMenuModule, MenuModule, MenubarModule, InputTextModule, PasswordModule, DataTableModule, ButtonModule, DialogModule, DropdownModule, CalendarModule, CheckboxModule, GrowlModule} from 'primeng/primeng';
import {AppRoutingModule} from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import {RouterModule, Routes} from '@angular/router';


@NgModule({
    declarations: [
        AppComponent, EstadisticaComponent
    ],
    imports: [
        BrowserModule,AppRoutingModule,BrowserAnimationsModule,
        AutoCompleteModule, GalleriaModule, MenuModule, BrowserModule, PanelMenuModule, FormsModule, HttpModule, PanelModule, MenubarModule, InputTextModule, PasswordModule, DataTableModule, ButtonModule, DialogModule, DropdownModule, CalendarModule, GrowlModule, CheckboxModule
    ],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}],
    bootstrap: [AppComponent]
})
export class AppModule {}
