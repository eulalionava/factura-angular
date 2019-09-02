import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class CargandoService{
  public url:string;
  public url_servidor = "http://localhost:8080/facturaAppi/app/cargarArchivo.php";

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
  //Servicio que guarda y obtiene informacion de los archivos
  cargarArchivo(archivo:File){
    const formData = new FormData();
    formData.append('archivoPropio', archivo, archivo.name);
    return this._http.post(this.url_servidor, formData);
  }

  //Servicio que valida los documentos
  validadDoc(docs){
    let json = JSON.stringify({info:docs});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'cargando/validar',params,{headers: headers});
  }

  //Servicio que inserta el tramite
  insertramite(tramite){
    let claves = JSON.parse(localStorage.getItem('claves'));
    let json = JSON.stringify({datos:tramite,claves:claves});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'cargando/tramite',params,{headers: headers});
  }

}
