import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class AutorizaService{
  public url:string;
  // public url_servidor = "http://localhost:8080/facturaAppi/app/cargarArchivo.php";
  public url_servidor = "http://appfacturando.orthofam.com.mx/app/cargarArchivo.php";

  constructor(
    private _http:HttpClient
  ){
    this.url = GLOBAL.url;
  }

  ngOnInit(){

  }
  //Servicio que obtiene las facturas por autorizacion
  facXautoriza(autorizacion,clave){
    let json = JSON.stringify({autoriza:autorizacion,clave:clave});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'autorizaciones/facXauto', params,{headers: headers});
  }

  //Servicio que guarda y obtiene informacion de los archivos
  cargarArchivo(archivo:File){
    const formData = new FormData();
    formData.append('archivoPropio', archivo, archivo.name);
    return this._http.post(this.url_servidor, formData);
  }

  //Servicio que valida documentos por parte de autorizaciones
  validaDoc(docs){
    let json = JSON.stringify({info:docs});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'autorizaciones/validar',params,{headers: headers});
  }

  //Servicio que ingresa un tramite
  insertTramite(datos){
    //Datos de usuario por autorizacion
    let usuario:any = JSON.parse(localStorage.getItem('autorizacion'));
    //Parametros
    let json = JSON.stringify({
      datos:datos,
      autoriza:usuario[0]['AUM_clave'],
      clave:usuario[0]['MOA_claveint']
    });

    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'autorizaciones/insertar',params,{headers: headers});

  }

  //Servicio que obtiene tramites por autorizacion
  tramites(){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url +'autorizaciones/tramites',{headers:headers});
  }


}
