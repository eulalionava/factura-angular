import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  providers:[UserService]
})
export class PasswordComponent implements OnInit {

  public form = {
    actual:null,
    nueva:null,
    confirmar:null
  }

  constructor(
    private _router:Router,
    private _userService:UserService
  ){
    console.log(JSON.parse(localStorage.getItem('sesion')));
   }

  ngOnInit() {
  }

  onSubmit(formulario){
    let datos = JSON.parse(localStorage.getItem('sesion'));
    this._userService.changePassword(this.form,datos).subscribe(
      response=>{
        if(response['status']=='success'){
          swal.fire('',response['msj'],'success');
          this._router.navigate(['home']);
        }else{
          swal.fire('Error',response['msj'],'error');
          formulario.reset();
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
