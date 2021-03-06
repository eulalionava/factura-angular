import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class AdminService{
  public url_correo = "http://appfacturando.orthofam.com.mx/app/enviarCorreo.php";
  public url:string;

  constructor(
    private _http:HttpClient
  ){
    this.url = GLOBAL.url;
  }

  ngOnInit(){

  }

  porStatus(id){
    let json = JSON.stringify({id:id});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'admin/detalle', params,{headers: headers});
  }

  //Servicio que obtiene un listado de todos los tramites en general
  listado(){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url +'admin/listado',{headers:headers});
  }

  estatus(){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url +'admin/estatus',{headers:headers});
  }

  //servicio que obtiene la factura
  getFactura(foliofiscal){
    let json = JSON.stringify({foliofiscal:foliofiscal});
    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'admin/detalle-factura', params,{headers: headers});
  }

  //Servicio para cancelar una factura y sus prefacturas
  deleteFactura(usuario,motivo,foliofiscal){
    let json = JSON.stringify({
      usuario     :usuario,
      motivo      :motivo,
      foliofiscal :foliofiscal
    });

    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'admin/cancelar-factura', params,{headers: headers});
  }

  //SERVICIO PARA DAR VISTO BUENO.
  vistobueno(tramite,datos){
    let json = JSON.stringify({tramite:tramite,datos:datos});

    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'admin/vistoBueno', params,{headers: headers});
  }

  //SERVICIO QUE REALIZA UNA BUSQUEDA EN GENERAL
  busquedaGeneral(buscar){
    let json = JSON.stringify({filtro:buscar});

    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'admin/busquedageneral',params,{headers:headers});
  }

  //SERVICIO DE BUSQUEDA POR ESTATUS
  generalStatus(valor,status){
    let json = JSON.stringify({filtro:valor,status:status});

    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'admin/generalStatus',params,{headers:headers});

  }

  //SERVICIO DE BUSQUEDA POR FECHA
  generalFecha(valor,status){
    let json = JSON.stringify({filtro:valor,status:status});

    let params = 'json='+json;
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'admin/generalFecha',params,{headers:headers});
  }

  //ENVIO DE CORREO
  sendEmail(tramite,num){
    const datos = JSON.parse(localStorage.getItem('admin'));
    const completo = datos[0]['Nombre']+" "+datos[0]['ApellidoP']+" "+datos[0]['ApellidoM'];
    const formdata = new FormData();
    formdata.append('tramite',tramite);
    formdata.append("numero",num);
    formdata.append("nombrecompleto",completo);

    return this._http.post(this.url_correo,formdata);
  }

}
