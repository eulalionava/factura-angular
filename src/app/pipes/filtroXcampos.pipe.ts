import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtraCampos'
})

export class FiltroXcampos implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultado = [];
    //Recorre el valor que le esta pasando
    for(const post of value){
      //verifica si encuentra el valor
      if(post.REG_folio.indexOf(arg) > -1){
        resultado.push(post);
      }
      else if(post.ASE_nomCorto.indexOf(arg) > -1){
        resultado.push(post);
      }
      else if(post.ASE_razonSocial.indexOf(arg) > -1){
        resultado.push(post);
      }
      else if(post.REG_nombrecompleto.indexOf(arg) > -1){
        resultado.push(post);
      }
      else if(post.Doc_fecreg.indexOf(arg) > -1){
        resultado.push(post);
      }
    }
    return resultado;
  }

}
