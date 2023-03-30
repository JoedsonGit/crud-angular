import { Cliente } from './../model/cliente';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientesService } from '../services/clientes.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteResolver implements Resolve<Cliente> {

  constructor(private service: ClientesService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cliente> {
    if(route.params && route.params['id']){
      return this.service.loadById(route.params['id']);
    }
    return of({ _id:'', name:'', status:'' , tipopessoa:'', cpf_cnpj:'', rg_ie:'', datacadastro: new Date(), telefone1:'' , telefone2:'' });
  }
}
