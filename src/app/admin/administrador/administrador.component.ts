import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls:['./administrador.component.css'],
  providers:[AdminService]
})
export class AdministradorComponent implements OnInit {
  public listas:any;
  public cargando:boolean;
  public eliminar:boolean;
  pageNum:number = 1;

  form = {
    motivo:null,
    busqueda:''
  }

  constructor(
    private _router:Router,
    private _serviceAdmin:AdminService
  ){
    this.cargando = true;
  }

  ngOnInit() {
    this.listado();
  }

  listado(){
    this._serviceAdmin.listado().subscribe(
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
      this._serviceAdmin.deleteFactura(usuario,this.form.motivo,folio_fiscal).subscribe(
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

  //METODO QUE REALIZA UNA BUSQUEDA GENERAL BAJO CUALQUIER FILTRO
  buscando(busqueda){
    this._serviceAdmin.busquedaGeneral(busqueda).subscribe(
      response=>{
        this.listas = response;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
