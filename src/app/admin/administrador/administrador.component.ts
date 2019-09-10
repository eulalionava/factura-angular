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

  constructor(
    private _router:Router,
    private _service:AdminService
  ){ }

  ngOnInit() {
    this.listado();
  }

  listado(){
    this._service.listado().subscribe(
      response=>{
        console.log(response);
        this.listas= response;
      },
      error=>{
        console.log(<any>error);
      }

    )
  }

}
