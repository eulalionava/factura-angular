import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[UserService]
})
export class HeaderComponent implements OnInit{
  public tipoAcceso:string;

  constructor(
    private _router:Router,
    private _service:UserService
  ){
    this.tipoAcceso = '';
  }

  ngOnInit() {

  }


  //Cerrar session
  logout(){
    localStorage.clear();
    this._router.navigate(['login']);
  }


}
