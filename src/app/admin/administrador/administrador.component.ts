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
  public eliminar:boolean;
  pageNum:number = 1;

  form = {
    motivo:null
  }

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

  //CANCELA EL TRAMITE
  cancelar(folio_fiscal){
      this.cargando = true;
      let usuario:any = JSON.parse(localStorage.getItem('admin'));

      // LLAama el servicio,pasando el folio fiscal de la factura
      this._service.deleteFactura(usuario,this.form.motivo,folio_fiscal).subscribe(
        response=>{
          this.form.motivo = null;
          this.cargando = false;
          if(response['status'] == 'success'){
            swal.fire('Cancelado',response['msj'],'success');
            location.reload();
          }else{
            swal.fire('Fallo',response['msj'],'error');
          }
        },
        error=>{
          this.eliminar = false;
          console.log(<any>error);
        }
      )
  }

}
