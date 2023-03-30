import { ConfirmationDialogComponent } from './../../componets/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../model/cliente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes$: Observable<Cliente[]> | null = null;

  // courcesService: CourcesService;

  constructor(
    private clientesService: ClientesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar

    )  {
    // this.courses = [];
    // this.courcesService = new CourcesService()
      this.refresh();

  }

   refresh(){
    this.clientes$ = this.clientesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        return of([])
      } )
    );

   }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientes$ = this.clientesService.pesquisarProNome(filterValue);
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

  onAdd(){

  this.router.navigate(['new'], {relativeTo: this.route});

  }

  onEdit(cliente: Cliente){
    // não conseguimos passar objetos e sim apenas uma informação
  this.router.navigate(['edit', cliente._id], {relativeTo: this.route});

  }

  onRemove(cliente: Cliente){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover este cliente ?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {

      if(result){
        this.clientesService.remove(cliente._id).subscribe(
          () =>{
            this.refresh();
            this.snackBar.open("Sucesso ao remover o cliente !", "X", {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError("Erro ao tentar remover Cliente !")
        );

      }

    });

  }

}
