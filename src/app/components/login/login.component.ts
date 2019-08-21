import { Component, OnInit } from '@angular/core';
import { BoundAttribute } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  autorizar:boolean;

  public  form = {
    usuario:null,
    password:null
  };
  public auto ={
    autorizacion:null
  }

  constructor() {
    //variable para activar los formularios
    this.autorizar=false;
  }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.form);
  }

  //Evento que valida el logeo por auntorizacion mv
  ingresar(){
    if(this.auto.autorizacion != null){
      alert(this.auto.autorizacion);
    }else{
      alert("Debes digitar en numero de autorizacion");
    }
  }

  verAutorizacion(){
    this.autorizar = true;
  }

  verProvedor(){
    this.autorizar = false;
  }

}
