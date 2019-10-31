import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';

@Component({
  selector: 'app-detalle-admin',
  templateUrl: './detalle-admin.component.html',
  providers:[AdminService]
})
export class DetalleAdminComponent implements OnInit {
  public facturas:any=[];
  public prefacturas:[];
  public cargando:boolean;

  constructor(
    private _route:ActivatedRoute,
    private _adminService:AdminService
  ){
  }

  ngOnInit() {
    this.verfactura();
  }


  verfactura(){
    let folioFiscal = this._route.snapshot.paramMap.get('folio');
    this.cargando =  true;
    //llama el servicio
    this._adminService.getFactura(folioFiscal).subscribe(
      response=>{
        this.cargando = false;
        this.facturas = response['factura'][0];
        this.prefacturas = response['prefactura'];
        console.log(this.prefacturas);
      },
      error=>{
        this.cargando =  false;
        console.log(<any>error);
      }
    )
  }

}
