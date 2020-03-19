import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { EstatusService } from '../../services/estatus.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-estatus',
  templateUrl: './estatus.component.html',
  styleUrls:['./estatus.component.css'],
  providers:[AdminService,EstatusService]
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
    private _serviceAdmin:AdminService,
    private _serviceEstatus:EstatusService
  ){
    this.cargando = true;
  }

  public seleccionar = {
    fecha:''
  }

  ngOnInit() {
    this.estatus();
    //Datos del usuario
    this.datos = JSON.parse(localStorage.getItem('admin'));
  }

  detalle(id){
    this.statusID = id;
    this._serviceEstatus.porStatus(id).subscribe(
      response=>{
        this.tramites = response;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  estatus(){
    this._serviceEstatus.estatus().subscribe(
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

  //Funcion que se encargar de dar el visto bueno.
  vobo(idTramite){
    this._serviceAdmin.vistobueno(idTramite,this.datos).subscribe(
      response=>{
        if(response['status']=='success'){
          //ENVIO DE CORREO
          this._serviceAdmin.sendEmail(idTramite,2).subscribe(
            response =>{
              console.log("Tramite enviado a pagos con VOBO ");
            }
          )
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
    //REALIZA LA BUSQUEDA POR FOLIO FISCAL
    this._serviceAdmin.generalStatus(buscar,status).subscribe(
      response=>{
        this.tramites = response;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  busquedaPorFecha(buscar){
    let status = this.statusID;
    //REALIZA LA BUSQUEDA POR FECHA
    this._serviceAdmin.generalFecha(buscar,status).subscribe(
      response=>{
        this.tramites = response;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
  //LIMPIA LAS CAJAS DE TEXTO
  limpiarCajas(){
    this.seleccionar.fecha = '';
    this.busquedaPorFecha('');
  }

}
