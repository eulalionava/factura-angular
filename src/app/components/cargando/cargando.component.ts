import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargandoService } from '../../services/cargando.service';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  providers:[CargandoService]
})
export class CargandoComponent implements OnInit {
  claves = [];
  prefacturas = [];
  totalPre = 0;

  constructor(
    private _service:CargandoService,
    private _router:Router
  ) { }

  ngOnInit() {
    this.claves = JSON.parse(localStorage.getItem('claves'));
    this.totalPre = this.claves.length;
    this.verprefacturas();
  }

  //datos de prefacturas
  verprefacturas(){
    this._service.getPrefacturaSeleccionadas(this.claves).subscribe(
      response=>{
        this.prefacturas = response['data'];
        console.log(this.prefacturas);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
