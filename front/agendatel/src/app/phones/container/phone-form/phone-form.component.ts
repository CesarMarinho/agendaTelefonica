import { Location } from '@angular/common';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';

import { Phone } from '../../model/phone';
import { PhonesService } from '../../services/phones.service';


@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss']
})
export class PhoneFormComponent implements OnInit {

  form = this.formbuilder.group({
    _id: 0,
    name: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)]],
    mobile: ['', Validators.minLength(8)],
    nphone: ['', Validators.minLength(8)],
    email: ['', Validators.email]
  });

  constructor(private formbuilder: NonNullableFormBuilder,
    private service: PhonesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute  ) {
   }

  ngOnInit(): void {
    const phone: Phone = this.route.snapshot.data['phone'];
    this.form.setValue({
      _id: phone._id,
      name: phone.name,
      nphone: phone.nphone,
      mobile: phone.mobile,
      email: phone.email
    })
  }

  onSubmit(){
    console.log(this.form);
   this.service.save(this.form.value)
   .subscribe(result => this.onSucces(), error => this.handleError(error) );

  }

  onCancel(){
    this.location.back();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.onError('Erro ao salvar contato');
    } else if(error.status === HttpStatusCode.Conflict){
      this.onError('Celular já cadastrado. Informe outro número');
    }
    return throwError(() => new Error('Algo errado aconteceu. Tente novamente mais tarde.'));
  }

  private onSucces() {
    this.snackBar.open('Salvo com sucesso!', '', {duration: 3000});
    this.onCancel();
  }

  private onError(message: string) {
    this.snackBar.open(message, '', {duration: 3000});
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return 'Campo obrigatório';
    }

    if(field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 2;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if(field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 50;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    if(field?.hasError('email')){
      return `Email inválido`;
    }

    return 'Campo inválido';
  }

}
