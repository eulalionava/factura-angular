import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ConsultaService } from '../../services/consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  providers:[ConsultaService]
})
export class ConsultaComponent implements OnInit {
  public tramites:any;
  public estatus=[];
  public totales=[];
  public model:any;

  public buscar = { fecha:'', folio:'' }

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
    console.log(this.buscar);
  }
}
