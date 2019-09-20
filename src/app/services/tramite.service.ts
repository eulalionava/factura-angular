import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class TramiteService{
  public url:string;
  // public url_servidor = "http://localhost:8080/facturaAppi/app/cargarArchivo.php";
  public url_servidor = "http://appfacturando.orthofam.com.mx/app/cargarArchivo.php";

  constructor(
    private _router:Router,
    private _http:HttpClient
  ){
    this.url = GLOBAL.url;
  }

  //Servicio que obtiene todos los tramites realizados
  getTramites(clavePro){
    let json = JSON.stringify({provedor:clavePro});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'tramites/tramites', params,{headers: headers});
  }
  //Servicio que muestra el detalle de un tramite
  detalleTramite(folio){
    let json = JSON.stringify({folio:folio});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'tramites/detalle', params,{headers: headers});
  }

  //Servicio que obtiene las prefacturas que van ligadas con el tramite
  getPrefacturas(folio){
    let json = JSON.stringify({folio:folio});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'tramites/prefacturas', params,{headers: headers});

  }

  getArchivo(clave){
    let json = JSON.stringify({clave:clave});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'tramites/archivo', params,{headers: headers});
  }

}
