import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserGuard } from './services/user.guard';

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
import { DetalleAdminComponent } from './admin/detalle-admin/detalle-admin.component';
import { ConsultaComponent } from './components/consulta/consulta.component';

//Rutas
const appRoutes:Routes = [
  {path:'', component:LoginComponent},
  {path:'login' , component:LoginComponent},
  {path:'home'  , component:HomeComponent,canActivate:[UserGuard]},
  {path:'cargar', component:CargandoComponent,canActivate:[UserGuard]},
  {path:'tramite', component:TramiteComponent,canActivate:[UserGuard]},
  {path:'tramiteAutorizacion', component:TramitePorAutoComponent,canActivate:[UserGuard]},
  {path:'detalle/:folio', component:DetalleComponent,canActivate:[UserGuard]},
  {path:'autorizacion', component:AutorizacionComponent,canActivate:[UserGuard]},
  {path:'autoriza/:clave', component:LoadAutorizaComponent,canActivate:[UserGuard]},
  {path:'administrador', component:AdministradorComponent,canActivate:[UserGuard]},
  {path:'estatus', component:EstatusComponent,canActivate:[UserGuard]},
  {path:'password', component:PasswordComponent,canActivate:[UserGuard]},
  {path:'detalle-admin/:folio', component:DetalleAdminComponent,canActivate:[UserGuard]},
  {path:'consulta', component:ConsultaComponent,canActivate:[UserGuard]},

  {path:'**', component:LoginComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true});
