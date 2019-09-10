import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[UserService]
})
export class HeaderComponent implements OnInit {

  constructor(
    private _router:Router,
    private _service:UserService
  ){ }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('sesion');
    localStorage.removeItem('autorizacion');
    localStorage.removeItem('admin');
    this._router.navigate(['login']);
  }

}
