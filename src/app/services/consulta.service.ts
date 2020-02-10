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
  porStatus(id){
    let json = JSON.stringify({id:id});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'admin/detalle', params,{headers: headers});
  }

  //SERVICIO QUE OBTIENE TODOS LOS ESTAUS
  estatus(){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url +'admin/estatus',{headers:headers});
  }

  //SERVICIO QUE BUSCA POR FOLIO FISCAL

  busquedaGeneral(foliofiscal){
    let json = JSON.stringify({folio:foliofiscal});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-type','application/x-www-form-urlencoded');
    return this._http.post(this.url + 'admin/busqueda',params,{headers:headers});

  }




}
