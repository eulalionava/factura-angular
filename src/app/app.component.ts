import { Component, OnInit,DoCheck } from '@angular/core';
import { Router,Route } from '@angular/router';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[HomeService]
})
export class AppComponent implements OnInit {
  title = 'factura';
  public actividad;

  constructor(
    private _router:Router,
    private _homeService:HomeService
  ){

  }

  ngOnInit() {

  }

}


