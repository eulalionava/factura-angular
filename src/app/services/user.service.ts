import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
  public url:string;
  public nombre;

  constructor(
    private _router:Router,
    private _http:HttpClient
  ){
    this.url = GLOBAL.url;
  }
  //Servicio que solo verifica si existe la variable de sesion
  Auth(){
    //COMPRUEBA SI EXISTE UNA VARIABLE DE SESION
    if( sessionStorage.getItem('sesion') || localStorage.getItem('sesion')){
      return true;
    }else if(sessionStorage.getItem('autorizacion')|| localStorage.getItem('autorizacion')){
      return true;
    }else if(sessionStorage.getItem('admin')|| localStorage.getItem('admin')){
      return true;
    }else{
      return false;
    }
  }

  //Servicio que trae el tipo de sesion iniciada
  authTipo(){
    //COMPRUEBA SI EXISTE UNA VARIABLE DE SESION
    if( sessionStorage.getItem('sesion') || localStorage.getItem('sesion')){
      //Por proveedor
      return 1;
    }else if(sessionStorage.getItem('autorizacion')|| localStorage.getItem('autorizacion')){
      //Por autorizacion
      return 2;
    }else if(sessionStorage.getItem('admin')|| localStorage.getItem('admin')){
      return 3;
    }else{
      return 0;
    }
  }

  //SERVICIO QUE OBTIENE LOS DATOS DE LA SESION
  authDatos(){
    //COMPRUEBA SI EXISTE UNA VARIABLE DE SESION
    if( sessionStorage.getItem('sesion') || localStorage.getItem('sesion')){
      //Por proveedor
      let datos = JSON.parse(localStorage.getItem('sesion'));
      const unidad = this.getUnidad(datos[0]['PUUni_clave']).subscribe(
        response=>{
          this.nombre = response['data'][0]['UNI_nomCorto'];
        }
      );

      return this.nombre;

    }else if(sessionStorage.getItem('autorizacion')|| localStorage.getItem('autorizacion')){
      //Por autorizacion
      let datos =JSON.parse(localStorage.getItem('autorizacion'));
      return "Por Autorización";

    }else{
      let datos =JSON.parse(localStorage.getItem('admin'));
      return datos[0]['Nombre']+" "+datos[0]['ApellidoP']+" "+datos[0]['ApellidoM'];
    }
  }

  getUnidad(idunidad){
    let json = JSON.stringify({clave:idunidad});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'usuario/unidad', params,{headers: headers});
  }

  //Servicio de logeo
  login(user){
    let json = JSON.stringify(user);
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'usuario/login', params,{headers: headers});
  }

  getAsegu(){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url+'home/aseguradoras',{headers: headers}).pipe(res=>res);
  }

  //Servicio de logeo por autorizacion
  autorizacion(user){
    let json = JSON.stringify(user);
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'usuario/autorizacion', params,{headers: headers});
  }

  //CAMBIARR CONTRASEÑA
  changePassword(form,datos){
    let json = JSON.stringify({form:form,datos:datos});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'usuario/cambiar', params,{headers: headers});
  }
}
