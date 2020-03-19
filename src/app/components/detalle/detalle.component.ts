import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls:['./detalle.component.css'],
  providers:[TramiteService]
})
export class DetalleComponent implements OnInit {
  public prefacturas:any = [];
  public tramite:any = [];
  public url:string;
  public nombre;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _serviceTramite:TramiteService
    ){
      let usuario = JSON.parse(localStorage.getItem('sesion'));
      this.nombre = usuario[0]['PUUsu_nombre']+" "+usuario[0]['PUUsu_apaterno']+" "+usuario[0]['PUUsu_amaterno'];

   }

  ngOnInit() {
    this.verdetalle();
    this.verprefacturas();
  }

  archivo(clave){
    this._serviceTramite.getArchivo(clave).subscribe(
      response=>{
        this.url ="http://pmzima.net/PU"+response;
        window.open(this.url);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  verdetalle(){
    let folio = this._route.snapshot.paramMap.get('folio');
    this._serviceTramite.detalleTramite(folio).subscribe(
      response=>{
        console.log(response);
        this.tramite = response[0];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //Lista las prefacturas
  verprefacturas(){
    let folio = this._route.snapshot.paramMap.get('folio');
    this._serviceTramite.getPrefacturas(folio).subscribe(
      response=>{
        this.prefacturas=response;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
