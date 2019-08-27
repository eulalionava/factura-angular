import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers:[HomeService]
})
export class HomeComponent implements OnInit {
  aseguradoras = [];
  facturas = [];
  usuario = [];
  opciones = [];
  cont = 0;
  importe =0;
  indice:number;

  constructor(private _service:HomeService) {
    this.usuario = JSON.parse(localStorage.getItem('sesion'));
  }

  ngOnInit() {
    this.Facturas();
  }

  seleccionado(aseg,event){
    if(event.target.checked){
      this.cont = this.cont + 1;
      //buscar el id en el array
      if(! this.opciones.includes(event.target.value) ){
        //Guarda todas la claves de factura
        this.opciones.push(event.target.value);
        console.log(this.opciones);
        //LLama el servicio
        this._service.buscarFactura(event.target.value).subscribe(
          response=>{
            //Suma el importe
            this.importe += response['data'][0].Doc_importe;
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
          this.importe -= response['data'][0].Doc_importe;
        }
      )
      console.log(this.opciones);
    }
  }

  Facturas(){
    this._service.getfacturas(this.usuario[0]['Pro_clave']).subscribe(
      response=>{
        this.facturas = response['data'];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }


  verifica(){
    console.log(this.opciones);
  }




}
