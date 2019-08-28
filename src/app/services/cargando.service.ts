import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class CargandoService{
  public url:string;

  constructor(
    private _router:Router,
    private _http:HttpClient
  ){
    this.url = GLOBAL.url;
  }

  //Servicio para obtener los datos de las prefacturas seleccionadas
  getPrefacturaSeleccionadas(prefacturas){
    let json = JSON.stringify({claves:prefacturas});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'cargando/seleccionadas', params,{headers: headers});
  }

}
