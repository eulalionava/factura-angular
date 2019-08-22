import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  autorizar:boolean;
  error:boolean;

  public  form = {
    usuario:null,
    password:null
  };
  public auto ={
    autorizacion:null
  }

  constructor(
    private _service:UserService
  ) {
    //variable para activar los formularios
    this.autorizar=false;
    this.error=false;
  }

  ngOnInit() {
  }

  onSubmit(){
    this._service.login(this.form).subscribe(
      response=>{
        if(response['code'] == 200){
          localStorage.setItem('sesion',JSON.stringify(response['result']));
        }else{
          this.error = true;
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
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
