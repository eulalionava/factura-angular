import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-estatus',
  templateUrl: './estatus.component.html',
  providers:[AdminService]
})
export class EstatusComponent implements OnInit {
  public tipos:any;
  public totales:any;
  public tramites:any;
  public cargando:boolean;

  constructor(
    private _router:Router,
    private _service:AdminService
  ){
    this.cargando = true;
    if(! localStorage.getItem('admin')){
      this._router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.estatus();
  }

  detalle(id){
    this._service.porStatus(id).subscribe(
      response=>{
        this.tramites = response;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  estatus(){
    this._service.estatus().subscribe(
      response=>{
        this.cargando = false;
        this.tipos = response['estatus'];
        this.totales = response['totales'];
      },
      error=>{
        console.log(<any>error);

      }
    )
  }

}
