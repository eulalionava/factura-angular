import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtraEmpresa'
})

export class FiltroXempresa implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultado = [];
    //Recorre el valor que le esta pasando
    for(const post of value){
      //verifica si encuentra el valor
      if(post.ASE_nomCorto.indexOf(arg) > -1 ){
        //Lo agrega
        resultado.push(post);
      }
    }
    return resultado;
  }

}
