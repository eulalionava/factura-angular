import { Component, OnInit } from '@angular/core';
import { AutorizaService } from '../../services/autoriza.service';

@Component({
  selector: 'app-autorizacion',
  templateUrl: './autorizacion.component.html',
  providers:[AutorizaService]
})
export class AutorizacionComponent implements OnInit {
  public facturas:any=[];
  public movimientos:any=[];

  constructor(
    private _service:AutorizaService
  ) {
   }

  ngOnInit() {
    this.facturasXprovedor();
  }


  facturasXprovedor(){
    let factura = JSON.parse(localStorage.getItem('autorizacion'));
    this._service.facXautoriza(factura[0]['AUM_clave'],factura[0]['MOA_claveint']).subscribe(
      response=>{
        console.log(response);
        this.facturas = response['autoriza'];
        this.movimientos = response['movimiento'];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }



}
