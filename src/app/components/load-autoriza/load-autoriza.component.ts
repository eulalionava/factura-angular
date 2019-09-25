import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AutorizaService } from '../../services/autoriza.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-load-autoriza',
  templateUrl: './load-autoriza.component.html',
  providers:[AutorizaService]
})
export class LoadAutorizaComponent implements OnInit {
  public errorXml:boolean;
  public errorPdf:boolean;
  public valido:boolean;
  public cargando:boolean;

  files = {
    'namexml':'',
    'namepdf':''
  }

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _service:AutorizaService
  ) {
    this.valido =  false;
   }

  ngOnInit() {

  }

  //evento que valida la informacion
  validar(){
    if(this.files.namepdf != '' && this.files.namexml != '' ){
      this.cargando = true;
      this._service.validaDoc(this.files).subscribe(
        response=>{
          this.cargando = false;
          if(response['status']=='success'){
            //tramite valido
            this.valido =  true;
            //Variable de sesion que almacena los datos del xml
            localStorage.setItem('datos',JSON.stringify(response['data']));
          }else{
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
      swal.fire('Aviso','debes seleccionar tus archivos','error');
    }
  }

  finaliza(){
    let datos:any =JSON.parse( localStorage.getItem('datos'));
    this._service.insertTramite(datos).subscribe(
      response=>{
        console.log(response);
        if(response['status']='success'){
          alert("Tramite realizado correctamente");
          this._router.navigate(['autorizacion']);
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
  //Evento que regresa
  regresar(){
    if(confirm("Esta seguro de regresar?")){
      this._router.navigate(['autorizacion']);
    }
  }

  //carga y obtiene informacion del archivo
  cargarxml(files:any){
    //verifica que sea un archivo xml
    if(files[0].type == 'text/xml'){
      this.errorXml = false;
        //llama el servicio
        this._service.cargarArchivo(files[0]).subscribe(
          response=>{
            //Asignamos informacion
            this.files.namexml = response['data']['nombre'];
          },
          error=>{
            console.log(<any>error);
          }
        )
    }else{
      this.errorXml = true;
    }
  }
//carga y obtiene informacion del archivo
  cargarpdf(files:any){
    //verifica que sea un archivo pdf
    if(files[0].type == 'application/pdf'){
      this.errorPdf = false;
        this._service.cargarArchivo(files[0]).subscribe(
          response=>{
            //Asignamos informacion
            this.files.namepdf = response['data']['nombre'];
          },
          error=>{
            console.log(<any>error);
          }
        )
    }else{
      this.errorPdf = true;
    }

  }

}
