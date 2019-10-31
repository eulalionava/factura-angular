import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import swal from 'sweetalert2';

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
  pageNum:number=1;

  constructor(
    private _router:Router,
    private _service:AdminService
  ){
    this.cargando = true;
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

  vobo(foliofiscal){
    this._service.vistobueno(foliofiscal).subscribe(
      response=>{
        console.log(response);
        if(response['status']=='success'){
          swal.fire('Exito',response['msj'],'success');
          this._router.navigate(['/administrador']);
        }else{
          swal.fire('Fallo',response['msj'],'error');
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
