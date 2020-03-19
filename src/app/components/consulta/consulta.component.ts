import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ConsultaService } from '../../services/consulta.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  providers:[ConsultaService]
})
export class ConsultaComponent implements OnInit {
  public cargando:boolean;
  public upload:boolean;
  public tramites:any;
  public estatus=[];
  public totales=[];
  public usuario:any;

  public buscar = { fechaInicio:'', fechaFin:'',folio:'' }

  constructor(
    private _router:Router,
    private _serviceConsulta:ConsultaService

  ){
    this.usuario = JSON.parse(localStorage.getItem('sesion'));
  }

  ngOnInit() {
    this.cargando = false;
    this.upload = false;
    this.getStatus();
  }

  //BUSCA UN ESTATUS ESPECIFICO
  detalle(id){
    this.upload =  true;
    const user = this.usuario[0]['PUUsu_login'];
    this._serviceConsulta.porStatus(id,user).subscribe(
      response=>{
        this.tramites = response;
        this.upload = false;
        console.log(this.tramites);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //OBTIENE TODOS LOS ESTATUS DE TRAMITE
  getStatus(){
    this.cargando = true;
    this._serviceConsulta.estatus(this.usuario[0]['PUUsu_login']).subscribe(
      response=>{
        console.log(response);
        this.estatus = response['estatus'];
        this.totales = response['totales'];
        this.cargando= false;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //FILTRO DE BUSQUEDA
  busqueda(){
    this._serviceConsulta.busquedaGeneral(this.buscar).subscribe(
      response=>{
        this.tramites = response;
        this.buscar.fechaInicio = '';
        this.buscar.fechaFin    = '';
        this.buscar.folio       = '';
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
}
