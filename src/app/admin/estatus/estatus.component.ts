import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-estatus',
  templateUrl: './estatus.component.html',
  styleUrls:['./estatus.component.css'],
  providers:[AdminService]
})
export class EstatusComponent implements OnInit {
  public tipos:any;
  public totales:any;
  public tramites:any;
  public cargando:boolean;
  public datos:any;
  public statusID;
  pageNum:number = 1;

  constructor(
    private _router:Router,
    private _serviceAdmin:AdminService
  ){
    this.cargando = true;
  }

  public seleccionar = {
    filtro:''
  }

  ngOnInit() {
    this.estatus();
    //Datos del usuario
    this.datos = JSON.parse(localStorage.getItem('admin'));
  }

  detalle(id){
    this.statusID = id;
    this._serviceAdmin.porStatus(id).subscribe(
      response=>{
        console.log(response);
        this.tramites = response;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  estatus(){
    this._serviceAdmin.estatus().subscribe(
      response=>{
        console.log(response);
        this.cargando = false;
        this.tipos = response['estatus'];
        this.totales = response['totales'];
      },
      error=>{
        console.log(<any>error);

      }
    )
  }

  //Funcion que se encargar de dar el visto bueno.
  vobo(idTramite){

    this._serviceAdmin.vistobueno(idTramite,this.datos).subscribe(
      response=>{
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

  //METODO DE BUSQUEDA GENERAL POR ESTATUS
  busquedaGenStatus(buscar){
    let status = this.statusID;

    if(parseInt(this.seleccionar.filtro) == 1){
      //REALIZA LA BUSQUEDA POR FOLIO FISCAL
      this._serviceAdmin.generalStatus(buscar,status).subscribe(
        response=>{
          this.tramites = response;
        },
        error=>{
          console.log(<any>error);
        }
      )
    }else{
      //REALIZA LA BUSQUEDA POR FECHA
      this._serviceAdmin.generalFecha(buscar,status).subscribe(
        response=>{
          this.tramites = response;
          this.seleccionar.filtro = '';
        },
        error=>{
          console.log(<any>error);
        }
      )
    }

  }

}
