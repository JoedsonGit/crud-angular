import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';
import { Cliente } from '../model/cliente';
// parei aqui https://www.youtube.com/watch?v=gi0ZJ8-r6IM&list=PLGxZ4Rq3BOBpwaVgAPxTxhdX_TfSVlTcY&index=11
@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  // private readonly API = '/assets/cources.json';
  // private readonly API = 'http://localhost:8080/api/courses';
  // localhost:8080/clientes
  // private readonly API = '/api/courses';
  private readonly API = '/api/clientes';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Cliente[]>(this.API)
    .pipe(
      first(),
      // delay(5000),
      tap(cliente => console.log(cliente))
      );

  }

  pesquisarProNome(nome: string) {

    if(nome.trim() == ''){
      return this.list();
    }
    return this.httpClient.get<Cliente[]>(`${this.API}/filtrar/${nome}`);
  }


  loadById(id: string){
   return this.httpClient.get<Cliente>(`${this.API}/${id}`);
  }

    save(record: Partial<Cliente>){

        if(record.status == 'Ativa'){
          record.status = '1';
        }

        if(record.status == 'Inativar'){
          record.status = '0';
        }

        if(record._id){
          return this.update(record);
        }

      return this.create(record);
    }

    private create(record: Partial<Cliente>){
      return this.httpClient.post<Cliente>(this.API,record).pipe(first());
    }

    private update(record: Partial<Cliente>){
      return this.httpClient.put<Cliente>(`${this.API}/${record._id}`,record).pipe(first());

    }

    remove(id: string){
      return this.httpClient.delete(`${this.API}/${id}`  ).pipe(first());

    }




}
