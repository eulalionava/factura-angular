import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class HomeService{
  public url:string;

  constructor(
    private _router:Router,
    private _http:HttpClient
  ){
    this.url = GLOBAL.url;
  }

  //Servicio de logeo
  getfacturas(pro_clave){
    let json = JSON.stringify({clave:pro_clave});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'home/facturas', params,{headers: headers});

  }

  //Servicio que obtiene una factura especifica
  buscarFactura(clave){
    let json = JSON.stringify({clave:clave});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'home/buscarfactura', params,{headers: headers});
  }

  //Servicio que obtiene todos los proveedores (empresa)
  getEmpresas(){
    let headers = new  HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url+'home/proveedores',{headers: headers});
  }
}
