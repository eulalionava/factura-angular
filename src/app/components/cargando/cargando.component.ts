import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargandoService } from '../../services/cargando.service';
import swal from 'sweetalert2'
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  providers:[CargandoService]
})
export class CargandoComponent implements OnInit {
  public errorXml:boolean;
  public errorPdf:boolean;
  public validado:boolean;
  public cargando:boolean;
  public quitar:boolean;
  public seleccionadas = [];
  public xml:any;
  public pdf:any;
  claves      = [];
  usuario     = [];
  prefacturas = [];
  totalPre    = 0;
  total       = 0;

  public prueba;

  files = {
    'namexml':'',
    'rutaxml':'',
    'namepdf':'',
    'rutapdf':'',
    'rfc'    :''
  }

  constructor(
    private _service:CargandoService,
    private _router:Router
  ) {
    this.errorXml = false;
    this.errorPdf = false;
    this.validado = false;
    this.quitar   = false;
   }

  ngOnInit() {
    this.claves = JSON.parse(localStorage.getItem('claves'));
    this.usuario = JSON.parse(localStorage.getItem('sesion'));
    this.totalPre = this.claves.length;
    this.verprefacturas();

    if(! localStorage.getItem('sesion')){
      this._router.navigate(['login']);
    }
  }

  regresar(){
    if(confirm("Si regresa,perdera sus prefacturas seleccionada !!")){
      this._router.navigate(['home']);
    }
  }
  //carga el archivo y obtener la informacion del archivo
  cargarxml(files:any){
    //verifica que sea un archivo xml
    if(files[0].type == 'text/xml'){
      this.errorXml = false;
        this._service.cargarArchivo(files[0]).subscribe(
          response=>{
            //Asignamos informacion
            this.files.rfc     = this.usuario[0]['Pro_rfc'];
            this.files.namexml = response['data']['nombre'];
            this.files.rutaxml = response['data']['ruta'];
          },
          error=>{
            console.log(<any>error);
          }
        )
    }else{
      this.errorXml = true;
    }
  }

  cargarpdf(files:any){
    //verifica que sea un archivo pdf
    if(files[0].type == 'application/pdf'){
      this.errorPdf = false;
        this._service.cargarArchivo(files[0]).subscribe(
          response=>{
            //Asignamos informacion
            this.files.namepdf = response['data']['nombre'];
            this.files.rutapdf = response['data']['ruta'];
          },
          error=>{
            console.log(<any>error);
          }
        )
    }else{
      this.errorPdf = true;
    }

  }

  //Validar los documentos
  validar(){
    if(this.files.namexml != '' && this.files.namepdf != ''){
      this.cargando = true;
      this._service.validadDoc(this.files).subscribe(
        response=>{
          this.cargando = false;
          if(response['status']=='success'){
            this.validado = true;
            localStorage.setItem('validacion',JSON.stringify(response['data']));
            swal.fire('',response['msj'],'success');
          }else{
            this.cargando = false;
            swal.fire('Error',response['msj'],'error');
          }
        },
        error=>{
          this.cargando = false;
          swal.fire('Error','Upps, algo salio mal !!','error');
          console.log(<any>error);
        }
      )
    }else{
      swal.fire('','Debes seleccionar tus archivos','warning');
    }
  }

  //Evento que finaliza y guarda el tramite
  finalizar(){
    if(localStorage.getItem('validacion')){
      this.cargando = true;
      //obtiene la variable de sesion
      let datos:any = JSON.parse(localStorage.getItem('validacion'));
      //llama el servicio
      this._service.insertramite(datos,this.total,this.usuario[0].Pro_clave).subscribe(
        response=>{
          this.cargando = false;
          // peticion correcta
          if(response['status']=='success'){
            swal.fire('',response['msj'],'success');
            this._router.navigate(['home']);
          }else{
            swal.fire('Error','El tramite no se pudo realizar','error');
          }
        },
        error=>{
          this.cargando = false;
          console.log(<any>error);
        }
      )
    }
  }
  //OPCIONES SELECCIONADAS
  seleccion(event){
    if(event.target.checked){
      this.quitar = true;
      //Buscar y agrega
      if( ! this.seleccionadas.includes(event.target.value) ){
        this.seleccionadas.push(event.target.value);
      }

    }else{
      //Numero de posicion
      let indice  = this.seleccionadas.indexOf(event.target.value);
      //elimina del array
      this.seleccionadas.splice(indice,1);
      //Ninguna seleccionada
      if(this.seleccionadas.length == 0){
        this.quitar = false;
      }

    }

  }

  //ELIMINA PREFACTURAS SELECCIONADAS
  eliminar(){
      for(let i=0; i < this.seleccionadas.length; i++){
        //Numero de posicion
        let indice  = this.claves.indexOf(this.seleccionadas[i]);
        //elimina el elemento del array
        this.claves.splice(indice,1);
      }
      //Llamamos la funcion
      this.deletePrefacturas();

      this.quitar = false;
      //vaciamos el array
      this.seleccionadas = [];
  }

  //BORRAR PREFACTURAS YA SELECCIONADAS
  deletePrefacturas(){
    this._service.getPrefacturaSeleccionadas(this.seleccionadas).subscribe(
      response=>{
        // recorremos las seleccionadas
        for(let i=0; i < response['data'].length; i++){
            this.totalPre -=1;
          //contador
          this.total -= response['data'][i][0]['Doc_importe']
        }

        //Actualizamos nuevamente el listado de prefacturas
        this._service.getPrefacturaSeleccionadas(this.claves).subscribe(
          response=>{
            this.prefacturas = response['data'];
          }
        )

      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //DATOS DE PREFACTURAS
  verprefacturas(){
    this._service.getPrefacturaSeleccionadas(this.claves).subscribe(
      response=>{
        this.prefacturas = response['data'];
        //recorremos los datos
        for(let i=0; i < response['data'].length; i++){
          //contador
          this.total += parseInt(response['data'][i][0]['Doc_importe']);
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
