import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from './../shared/shared.module';
import { PhonesRoutingModule } from './phones-routing.module';
import { PhonesComponent } from './container/phones/phones.component';
import { PhoneFormComponent } from './container/phone-form/phone-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PhonesListComponent } from './component/phones-list/phones-list.component';

@NgModule({
  declarations: [
    PhonesComponent,
    PhoneFormComponent,
    PhonesListComponent
  ],
  imports: [
    CommonModule,
    PhonesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PhonesModule { }
