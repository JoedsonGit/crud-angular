import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {

  clientes$: Observable<Cliente[]> | null = null;

  @Input() clientes: Cliente[] = [];
  @Output() add     = new EventEmitter(false);
  @Output() eidt    = new EventEmitter(false);
  @Output() remove  = new EventEmitter(false);

  readonly  displayedColumns = ['_id','name', 'tipopessoa','status', 'cpf_cnpj', 'rg_ie', 'datacadastro', 'telefone1', 'telefone2', 'actions'];

  constructor(
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(cliente: Cliente){
      this.eidt.emit(cliente);
  }

  onDelete(cliente: Cliente){
      this.remove.emit(cliente);
  }

}
