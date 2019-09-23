import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CargandoComponent } from './components/cargando/cargando.component';
import { TramiteComponent } from './components/tramite/tramite.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { AutorizacionComponent } from './components/autorizacion/autorizacion.component';
import { LoadAutorizaComponent } from './components/load-autoriza/load-autoriza.component';
import { TramitePorAutoComponent } from './components/tramite-por-auto/tramite-por-auto.component';
import { AdministradorComponent } from './admin/administrador/administrador.component';
import { EstatusComponent } from './admin/estatus/estatus.component';
import { PasswordComponent } from './components/password/password.component';

//Rutas
const appRoutes:Routes = [
  {path:'', component:LoginComponent},
  {path:'login' , component:LoginComponent},
  {path:'home'  , component:HomeComponent},
  {path:'cargar', component:CargandoComponent},
  {path:'tramite', component:TramiteComponent},
  {path:'tramiteAutorizacion', component:TramitePorAutoComponent},
  {path:'detalle/:folio', component:DetalleComponent},
  {path:'autorizacion', component:AutorizacionComponent},
  {path:'autoriza/:clave', component:LoadAutorizaComponent},
  {path:'administrador', component:AdministradorComponent},
  {path:'estatus', component:EstatusComponent},
  {path:'password', component:PasswordComponent},

  {path:'**', component:LoginComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
