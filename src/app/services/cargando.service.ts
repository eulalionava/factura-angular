import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class CargandoService{
  public url:string;
  // public url_servidor = "http://localhost:8080/facturaAppi/app/cargarArchivo.php";
  public url_servidor = "http://appfacturando.orthofam.com.mx/app/cargarArchivo.php";
  public directorio = "http://appfacturando.orthofam.com.mx/app/appendFile.php";
  public url_correo = "http://appfacturando.orthofam.com.mx/app/enviarCorreo.php";

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

  //Servicio que crea las carpetas y mueve los archivos y elimina
  crearDirectorios(anio,mes,rfc,pdf,xml,foliofiscal){
    const formData = new FormData();
    formData.append('anio', anio);
    formData.append('mes' , mes);
    formData.append('rfc' , rfc);
    formData.append('pdf' , pdf);
    formData.append('xml' , xml);
    formData.append('foliofiscal' , foliofiscal);
    return this._http.post(this.directorio, formData);
  }

  //Servicio que valida los documentos
  validadDoc(docs,importeTotal,misma,compania){
    let claves = JSON.parse(localStorage.getItem('claves'));
    let json = JSON.stringify({
      info:docs,
      importe:importeTotal,
      claves:claves,
      mismaComp:misma,
      compania:compania
    });

    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'cargando/validar',params,{headers: headers});
  }

  //Servicio que valida con la appi inactiva
  validadSinAppi(docs,importeTotal,misma,compania){
    let json = JSON.stringify({
      info:docs,
      importe:importeTotal,
      mismaComp:misma,
      compania:compania
    });

    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'cargando/appinactivo',params,{headers: headers});
  }

  //Servicio que inserta el tramite
  insertramite(tramite,total,pro_clave,usuario,appi){
    let claves = JSON.parse(localStorage.getItem('claves'));
    let json = JSON.stringify({
      datos   : tramite,
      claves  : claves,
      total   : total,
      pro_cve : pro_clave,
      usuario : usuario,
      appi    : appi
    });

    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'cargando/tramite',params,{headers: headers});
  }
  //Verifica si no hay fallos en la appi
  getAppi(){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url+'cargando/appi',{headers: headers});
  }

  //Enviar correo en caso del fallo de la appi
  sendEmail(){
    return this._http.get(this.url_correo);
  }

  //VALIDA QUE PERTENESCAN A LA MIS COMPANIA
  mismaCompania(){
    let claves = JSON.parse(localStorage.getItem('claves'));
    let json = JSON.stringify({claves:claves});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'cargando/mismaCompania',params,{headers: headers});
  }


}
