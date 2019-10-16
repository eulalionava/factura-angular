import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers:[HomeService]
})
export class HomeComponent implements OnInit {
  aseguradoras  = [];
  provedores    = [];
  facturas      = [];
  usuario       = [];
  opciones      = [];
  cont          = 0;
  importe: number=0;
  indice:number;
  porempresa  = '';
  busqueda    = '';
  cantidad    = 10;
  cargando = true;
  //Numero de paginas
  pageNum:number=1;

  constructor(
    private _service:HomeService,
    private _router:Router
  ){
    this.usuario = JSON.parse(localStorage.getItem('sesion'));

    //Verifica si existe la sesion
    if(! localStorage.getItem('sesion')){
      this._router.navigate(['login']);
    }

  }

  ngOnInit() {
    this.proveedores();
    this.Facturas();
  }


  seleccionado(aseg,event){
    if(event.target.checked){
      this.cont = this.cont + 1;
      //buscar el id en el array
      if(! this.opciones.includes(event.target.value) ){
        //Guarda todas la claves de factura
        this.opciones.push(event.target.value);
        //LLama el servicio
        this._service.buscarFactura(event.target.value).subscribe(
          response=>{
            //Suma el importe
            this.importe = this.importe + parseFloat(response['data'][0].Doc_importe);
          }
        )
      }
    }else{
      this.cont = this.cont - 1;
      //Numero de posicion
      this.indice  = this.opciones.indexOf(event.target.value);
      this.opciones.splice(this.indice,1);
      //LLama el servicio
      this._service.buscarFactura(event.target.value).subscribe(
        response=>{
          //Resta el importe
          console.log(this.importe);
          console.log(response['data'][0].Doc_importe);
          this.importe -= response['data'][0].Doc_importe;

        }
      )
    }
    localStorage.setItem('claves',JSON.stringify(this.opciones));
  }

  //Obtener la facturas
  Facturas(){
    this._service.getfacturas(this.cveProvedores()).subscribe(
      response=>{
        this.facturas = response['data'];
        this.cargando= false;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //Obtener los proveedores
  proveedores(){
    this._service.getEmpresas().subscribe(
      response=>{
        this.provedores = response['data'];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //SIGUIENTE PASO
  verifica(){
    if(this.cont != 0){
      this._router.navigate(['cargar']);
    }else{
      swal.fire('Debes seleccionar tus prefacturas','','info');
    }
  }
  //SELECCIONAR TODOS LOS CHECK
  selectAll(event){
    if(event.target.checked){
      let checkboxes=document.getElementsByTagName('input');
      for( let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].type == 'checkbox'){
          if(i > 1){
            //Verifica si hay chequeados
            if(!checkboxes[i].checked){
              checkboxes[i].checked = true;
              this.cont = this.cont + 1;
            }
            //buscar el id en el array
            if(! this.opciones.includes(checkboxes[i].value) ){
              //Guarda todas la claves de factura
              this.opciones.push(checkboxes[i].value);
              //LLama el servicio
              this._service.buscarFactura(checkboxes[i].value).subscribe(
                response=>{
                  //Suma el importe
                  this.importe = this.importe + parseFloat(response['data'][0].Doc_importe);
                }
              )
            }
          }
        }
      }
    }else{
      let checkboxes=document.getElementsByTagName('input');
      //console.log(checkboxes);
      for( let i = 0; i < checkboxes.length; i++){
        //solo botones de tipo check
        if(checkboxes[i].type == 'checkbox'){
          checkboxes[i].checked = false;
          this.cont = 0;
          if( i > 1){
            //buscar el id en el array
            if(this.opciones.includes(checkboxes[i].value) ){
             //Numero de posicion
              this.indice  = this.opciones.indexOf(checkboxes[i].value);
              this.opciones.splice(this.indice,1);
              this.importe = 0;
            }
          }
        }
      }
    }
    localStorage.setItem('claves',JSON.stringify(this.opciones));
  }

  //CLAVES DE PROVEEDORES
  cveProvedores(){
    let prove='';
    for(let i = 0; i < this.usuario.length; i++){
      if(i == this.usuario.length-1){
        prove = prove + this.usuario[i]['Pro_clave'];
      }else{
        prove = prove + this.usuario[i]['Pro_clave']+',';
      }
    }
    return prove;
  }



}
