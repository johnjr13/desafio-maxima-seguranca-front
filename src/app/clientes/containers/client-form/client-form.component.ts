import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClientsService } from '../../services/clients.service';
import { Client } from '../../model/client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required,
    Validators.minLength(5),
    Validators.maxLength(100)]],
    cpf:['', [Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11)
    ]],
    idade: ['', [Validators.required,
    Validators.minLength(1),
    Validators.maxLength(2)]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ClientsService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(){
    const client: Client = this.route.snapshot.data['client'];
    //this.form.setValue({ _id: client._id, name: client.name,    category: client.category   })
    this.form.patchValue(client);
  }



  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Cliente cadastrado com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao cadastrar.', '', { duration: 5000 });
  }

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return 'campo obrigatório';
    }

    if(field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if(field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo Inválido';
  }
}
