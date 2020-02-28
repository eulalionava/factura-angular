import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html',
  providers:[TramiteService]
})
export class TramiteComponent implements OnInit {
  public tramites:any=[];
  public cargando:boolean;
  //Numero de paginas
  pageNum:number=1;

  public busca = { tramite : '' }

  constructor(
    private _router:Router,
    private _serviceTramite:TramiteService
  ){
    this.cargando = true;
  }

  ngOnInit() {
    this.vertramites();
  }
  //Obtiene todos los tramites realizados
  vertramites(){
    let datos:any = JSON.parse(localStorage.getItem('sesion'));
    this._serviceTramite.getTramites(datos[0]['PUUsu_login']).subscribe(
      response=>{
        this.cargando = false;
        this.tramites = response
        console.log(this.tramites);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  buscaTramite(cadena){
    this._serviceTramite.buscarTramites(cadena).subscribe(
      response=>{
        this.tramites = response;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }


}
