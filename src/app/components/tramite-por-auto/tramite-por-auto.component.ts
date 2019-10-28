import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AutorizaService } from '../../services/autoriza.service';

@Component({
  selector: 'app-tramite-por-auto',
  templateUrl: './tramite-por-auto.component.html',
  providers:[AutorizaService]
})
export class TramitePorAutoComponent implements OnInit {
  public tramites:any=[];

  constructor(
    private _router:Router,
    private _service:AutorizaService
  ){ }

  ngOnInit() {

    this.tramite();
  }

  tramite(){
    this._service.tramites().subscribe(
      response=>{
        if(response['status']=='success'){
          this.tramites = response['data'];
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
