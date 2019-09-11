import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  providers:[AdminService]
})
export class AdministradorComponent implements OnInit {
  public listas:any;
  public cargando:boolean;

  constructor(
    private _router:Router,
    private _service:AdminService
  ){
    this.cargando = true;
  }

  ngOnInit() {
    this.listado();
  }

  listado(){
    this._service.listado().subscribe(
      response=>{
        this.cargando = false;
        this.listas= response;
      },
      error=>{
        console.log(<any>error);
      }

    )
  }

}
