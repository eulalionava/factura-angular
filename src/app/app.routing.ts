import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';

//Rutas
const appRoutes:Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'**', component:LoginComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
