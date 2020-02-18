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
  public tramites:any;
  public estatus=[];
  public totales=[];

  public buscar = { fechaInicio:'', fechaFin:'',folio:'' }

  constructor(
    private _router:Router,
    private _serviceConsulta:ConsultaService

  ) { }

  ngOnInit() {

    this.getStatus();

  }

  //BUSCA UN ESTATUS ESPECIFICO
  detalle(id){
    this._serviceConsulta.porStatus(id).subscribe(
      response=>{
        this.tramites = response;
        console.log(this.tramites);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //OBTIENE TODOS LOS ESTATUS DE TRAMITE
  getStatus(){
    this._serviceConsulta.estatus().subscribe(
      response=>{
        console.log(response);
        this.estatus = response['estatus'];
        this.totales = response['totales'];
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
