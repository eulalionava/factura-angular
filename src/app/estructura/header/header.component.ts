import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _router:Router
  ){ }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('sesion');
    this._router.navigate(['login']);
  }

}
