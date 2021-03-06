import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class ConsultaService{
  public url:string;

  constructor(
    private _http:HttpClient
  ){
    this.url = GLOBAL.url;
  }

  ngOnInit(){

  }

  //SERVICIO QUE BUSCA POR ESTATUS
  porStatus(id,usuario){
    let json = JSON.stringify({id:id,user:usuario});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'admin/detalle', params,{headers: headers});
  }

  //SERVICIO QUE OBTIENE TODOS LOS ESTAUS
  estatus(usuario){
    let json = JSON.stringify({user:usuario});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url +'admin/estatus',params,{headers:headers});

  }

  //SERVICIO QUE BUSCA POR FOLIO FISCAL
  busquedaGeneral(datos){
    let json = JSON.stringify({datos:datos});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-type','application/x-www-form-urlencoded');
    return this._http.post(this.url + 'admin/busqueda',params,{headers:headers});

  }




}
