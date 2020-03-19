import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class EstatusService{
  public url:string;

  constructor(
    private _http:HttpClient
  ){
    this.url = GLOBAL.url;
  }

  ngOnInit(){

  }

  //SERVICIO QUE BUSCA POR ESTATUS
  porStatus(id){
    let json = JSON.stringify({id:id});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'status/detalle', params,{headers: headers});
  }

  //SERVICIO QUE OBTIENE TODOS LOS ESTAUS
  estatus(){

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url +'status/estatus',{headers:headers});

  }




}
