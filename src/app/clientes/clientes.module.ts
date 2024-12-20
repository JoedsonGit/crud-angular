import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './conteiners/clientes/clientes.component';
import { ClienteFormComponent } from './conteiners/cliente-form/cliente-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesListComponent } from './componets/clientes-list/clientes-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
  declarations: [
    ClientesComponent,
    ClienteFormComponent,
    ClientesListComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule,
    MatTabsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,



  ]
})
export class ClientesModule {

}
