import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  providers:[TramiteService]
})
export class DetalleComponent implements OnInit {
  public prefacturas:any = [];
  public tramite:any = [];
  public url:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _service:TramiteService
    ){

   }

  ngOnInit() {
    this.verdetalle();
    this.verprefacturas();
  }

  archivo(clave){
    this._service.getArchivo(clave).subscribe(
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
    this._service.detalleTramite(folio).subscribe(
      response=>{
        console.log(response);
        this.tramite = response[0];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  verprefacturas(){
    let folio = this._route.snapshot.paramMap.get('folio');
    this._service.getPrefacturas(folio).subscribe(
      response=>{
        this.prefacturas=response;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
