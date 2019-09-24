import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import swal from 'sweetalert2';

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
    if(! localStorage.getItem('admin')){
      this._router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.listado();
  }

  listado(){
    this._service.listado().subscribe(
      response=>{
        console.log(response);
        this.cargando = false;
        this.listas= response;
      },
      error=>{
        console.log(<any>error);
      }

    )
  }

  cancelar(folio_fiscal){
    if(confirm("Esta seguro cancelar esta factura ???")){
      this.cargando = true;
      this._service.deleteFactura(folio_fiscal).subscribe(
        response=>{
          this.cargando = false;
          if(response['status']=='success'){
            swal.fire('correcto',response['msj'],'success');
            this._router.navigate(['/administrador']);
          }else{
            swal.fire('Fallo',response['msj'],'error');
          }
        },
        error=>{
          this.cargando = false;
          console.log(<any>error);
        }
      )

    }
  }

}
