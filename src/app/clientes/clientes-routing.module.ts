import { ClienteResolver } from './guards/cliente.resolver';
import { ClienteFormComponent } from './conteiners/cliente-form/cliente-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientesComponent } from './conteiners/clientes/clientes.component';

const routes: Routes = [

{ path: '', component: ClientesComponent },
{ path: 'new', component: ClienteFormComponent, resolve:{cliente: ClienteResolver}  },
{ path: 'edit/:id', component: ClienteFormComponent, resolve:{cliente: ClienteResolver} }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
