import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargandoService } from '../../services/cargando.service';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  providers:[CargandoService]
})
export class CargandoComponent implements OnInit {
  public errorXml:boolean;
  public errorPdf:boolean;
  public finaliza:boolean;
  public xml:any;
  public pdf:any;
  claves = [];
  usuario = [];
  prefacturas = [];
  totalPre = 0;

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
    this.finaliza = false;
   }

  ngOnInit() {
    this.claves = JSON.parse(localStorage.getItem('claves'));
    this.usuario = JSON.parse(localStorage.getItem('sesion'));
    this.totalPre = this.claves.length;
    this.verprefacturas();
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
      this._service.validadDoc(this.files).subscribe(
        response=>{
          console.log(response);
          if(response['status']=='success'){
            localStorage.setItem('validacion',JSON.stringify(response['data']));
          }else{
            alert(response['msj']);
          }
        },
        error=>{
          console.log(<any>error);
        }
      )
    }else{
      alert("Debes seleccionar los archivos");
    }
  }

  //Evento que finaliza y guarda el tramite
  finalizar(){
    if(localStorage.getItem('validacion')){
      let datos:any = JSON.parse(localStorage.getItem('validacion'));
      this._service.insertramite(datos).subscribe(
        response=>{
          console.log(response);
        },
        error=>{
          console.log(<any>error);
        }
      )
    }
  }

  //datos de prefacturas
  verprefacturas(){
    this._service.getPrefacturaSeleccionadas(this.claves).subscribe(
      response=>{
        this.prefacturas = response['data'];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
