import { HttpErrorResponse } from '@angular/common/http';
import { Cliente } from './../../model/cliente';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { Component, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  // delcara e inicialisa o form ao mesmo tempo
  form = this.formBuilder.group({
    _id:            [''],
    name:           [''],
    status:         [''],
    tipopessoa:     [''],
    cpf_cnpj:       ['' , [Validators.required,
                         // Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/),
                         Validators.minLength(11),
                         Validators.maxLength(14)]],
    rg_ie:          [''],
    // datacadastro:   [new Date()],
    telefone1:      [''],
    telefone2:      [''],
    datanascimento: ['']
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ClientesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
    ) {

    //  this.form

   }


  ngOnInit(): void {
    const cliente: Cliente = this.route.snapshot.data['cliente']
    this.form.setValue({
      _id:            cliente._id,
      name:           cliente.name,
      status:         cliente.status,
      tipopessoa:     cliente.tipopessoa,
      cpf_cnpj:       cliente.cpf_cnpj,
      rg_ie:          cliente.rg_ie,
     // datacadastro:   cliente.datacadastro,
      telefone1:      cliente.telefone1,
      telefone2:      cliente.telefone2,
      datanascimento: cliente.datanascimento,
    });

  }

  onSubmit(){

  this.service.save(this.form.value).subscribe(
    result => this.onSuccess(),
     (erro: HttpErrorResponse)   => {
      // console.log(res.error.detail);
      this.onError(erro.error.detail);
  });

  }

  private onError(mensagem: string){
    this.snackBar.open(mensagem, "", {duration: 5000});
  }

  onCancel(){
      this.location.back();
   }

  private onSuccess(){
    this.snackBar.open("Sucesso ao Salvar o cliente !", "", {duration: 5000});
    this.onCancel();
  }

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return 'Campo obrigatório';
    }

    if(field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 11;
      return `Tamanho mínimo precisa ser de ${ requiredLength } caracteres para CPF e 14 para CNPJ.`;
    }

    if(field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 14;
      return `Tamanho máximo excedido de ${ requiredLength } caracteres para CPF e 14 para CNPJ.`;
    }

    return 'Campo Inválido';
  }

  get editando(){
    return Boolean(this.form.value._id);
  }

  get tipoPessoa() {
   return String(this.form.value.tipopessoa);
  }

}
