import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './estructura/header/header.component';
import { BodyComponent } from './estructura/body/body.component';
import { HomeComponent } from './components/home/home.component';

//Pipes
import { FiltroXempresa } from './pipes/filtroXempresa.pipe';
import { FiltroXcampos } from './pipes/filtroXcampos.pipe';
import { CargandoComponent } from './components/cargando/cargando.component';
import { TramiteComponent } from './components/tramite/tramite.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { AutorizacionComponent } from './components/autorizacion/autorizacion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    BodyComponent,
    HomeComponent,
    FiltroXempresa,
    FiltroXcampos,
    CargandoComponent,
    TramiteComponent,
    DetalleComponent,
    AutorizacionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
