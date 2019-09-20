import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizaService } from '../../services/autoriza.service';

@Component({
  selector: 'app-autorizacion',
  templateUrl: './autorizacion.component.html',
  providers:[AutorizaService]
})
export class AutorizacionComponent implements OnInit {
  public facturas:any=[];
  public movimientos:any=[];
  public cargando:boolean;

  constructor(
    private _router:Router,
    private _service:AutorizaService
  ) {
    this.cargando = true;
    if(!localStorage.getItem('autorizacion')){
      this._router.navigate(['login']);
    }
   }

  ngOnInit() {
    this.facturasXprovedor();
  }


  facturasXprovedor(){
    let factura = JSON.parse(localStorage.getItem('autorizacion'));
    this._service.facXautoriza(factura[0]['AUM_clave'],factura[0]['MOA_claveint']).subscribe(
      response=>{
        this.cargando = false;
        this.facturas = response['autoriza'];
        this.movimientos = response['movimiento'];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }



}
