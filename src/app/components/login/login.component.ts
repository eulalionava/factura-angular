import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  autorizar:boolean;
  error:boolean;
  public errorAuto:boolean=false;
  cargando = false;

  public  form = {
    usuario:null,
    password:null
  };
  public auto = {
    autorizacion:null
  }

  constructor(
    private _service:UserService,
    private _router:Router
  ) {
    //variable para activar los formularios
    this.autorizar=false;
    this.error=false;
  }

  ngOnInit() {
  }

  onSubmit(form){
    this.cargando = true;
    this._service.login(this.form).subscribe(
      response=>{
        console.log(response);
        //correcto
        if(response['code'] == 200){
          //verifica el tipo de sesion
          if(response['tipo'] == 'prove'){
            localStorage.setItem('sesion',JSON.stringify(response['result']));
            this._router.navigate(['home']);
          }else{
            localStorage.setItem('admin',JSON.stringify(response['result']));
            this._router.navigate(['administrador']);
          }
        }else{
          this.error = true;
          this.cargando = false;
          //Limpiamos el formulario
          form.reset();
        }
      },
      error=>{
        this.cargando = false;
        console.log(<any>error);
      }
    )
  }

  //Evento que valida el logeo por auntorizacion mv
  ingresar(){
    this._service.autorizacion(this.auto.autorizacion).subscribe(
      response=>{
        console.log(response);
        if(response['status']=='success'){
          localStorage.setItem('autorizacion',JSON.stringify(response['data']));
          this._router.navigate(['autorizacion']);
        }else{
          this.errorAuto = true;
        }
      },
      error=>{
        swal.fire('AA###_#','Estructura de acceso','info');
        console.log(<any>error);
      }
    )

  }

  verAutorizacion(){
    this.autorizar = true;
  }

  verProvedor(){
    this.autorizar = false;
  }

}
