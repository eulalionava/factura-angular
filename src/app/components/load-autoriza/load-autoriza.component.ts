import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AutorizaService } from '../../services/autoriza.service';
import { CargandoService } from '../../services/cargando.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-load-autoriza',
  templateUrl: './load-autoriza.component.html',
  providers:[AutorizaService,CargandoService]
})
export class LoadAutorizaComponent implements OnInit {
  public errorXml:boolean;
  public errorPdf:boolean;
  public valido:boolean;
  public cargando:boolean;
  public appi:string='';

  files = {
    'namexml':'',
    'namepdf':''
  }

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _service:AutorizaService,
    private _cargandoService:CargandoService
  ) {
    this.valido =  false;
   }

  ngOnInit() {
    this.funcionamientoAPPI();
  }
  //VALIDA EL FUNCIONAMIENTO DE LA APPI
  funcionamientoAPPI(){
    this._cargandoService.getAppi().subscribe(
      response=>{
        if(response['status'] == 'success'){
          this.appi = 'success';
        }else{
          this.appi = 'error';
          this._cargandoService.sendEmail(1).subscribe(
            response=>{}
          )
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //EVENTO QUE VALIDA LA INFORMACION DE LA FACTURA
  validar(){
    if(this.files.namepdf != '' && this.files.namexml != '' ){
      this.cargando = true;
      if(this.appi == 'success'){
        //Valida la factura con la appi
        this._service.validaDoc(this.files).subscribe(
          response=>{
            console.log(response);
            this.cargando = false;
            if(response['status']=='success'){
              //tramite valido
              this.valido =  true;
              //Variable de sesion que almacena los datos del xml
              localStorage.setItem('datos',JSON.stringify(response['data']));
              swal.fire('Exito',response['msj'],'success');
            }else{
              swal.fire('Upps!',response['msj'],'error');
            }
          },
          error=>{
            this.cargando = false;
            swal.fire('Error','Upps, algo salio mal !!','error');
            console.log(<any>error);
          }
        )
      }else{
        //valida la factura sin la appi
        this.cargando = true;
        this._service.validadSinAppi(this.files).subscribe(
          response=>{
            console.log(response);
            this.cargando = false;
            if(response['status']=="success"){
              this.valido = true;
              //Variable de sesion que almacena los datos del xml
              localStorage.setItem('datos',JSON.stringify(response['data']));
              swal.fire('Exito',response['msj'],'success');
            }else{
              swal.fire('Error',response['msj'],'error');
            }
          },
          error=>{
            this.cargando = false;
            console.log(<any>error);
          }
        )
      }
    }else{
      swal.fire('Aviso','debes seleccionar tus archivos','error');
    }
  }

  finaliza(){
    //Obtenemos los datos
    let datos:any = JSON.parse( localStorage.getItem('datos'));
    let anio = datos['Fecha'].split("-");
    let rfc  = datos['E_RFC'];

    this._cargandoService.crearDirectorios(anio[0],anio[1],rfc,this.files.namepdf,this.files.namexml,datos['FolioFiscal']).subscribe(
      response=>{
        console.log(response);
        this._service.insertTramite(datos,this.appi).subscribe(
          response=>{
            console.log(response);
            if(response['status']='success'){
              swal.fire('Exito',response['msj'],'success');
              this._router.navigate(['autorizacion']);
            }else{
              this.cargando =  false;
              swal.fire('Error',response['msj'],'error');
            }
          },
          error=>{
            this.cargando =  false;
            console.log(error);
          }
        )
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
