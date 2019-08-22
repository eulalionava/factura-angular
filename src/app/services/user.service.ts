import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
  public url:string;

  constructor(
    private _router:Router,
    private _http:HttpClient
  ){
    this.url = GLOBAL.url;
  }

  Auth(){
    //COMPRUEBA SI EXISTE UNA VARIABLE DE SESION
    if(sessionStorage.getItem('sesion') || localStorage.getItem('sesion')){
      return true;
    }else{
      return false;
    }
  }

  //Servicio de logeo
  login(user){
    let json = JSON.stringify(user);
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'usuario/login', params,{headers: headers});
  }
}
