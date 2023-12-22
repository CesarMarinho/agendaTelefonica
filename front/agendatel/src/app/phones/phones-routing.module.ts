import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhonesComponent } from './container/phones/phones.component';
import { PhoneFormComponent } from './container/phone-form/phone-form.component';
import { PhoneResolver } from './guards/phone.resolver';

const routes: Routes = [
  { path: '', component: PhonesComponent },
  { path: 'new', component: PhoneFormComponent, resolve: {phone: PhoneResolver} },
  { path: 'edit/:id', component: PhoneFormComponent, resolve: {phone: PhoneResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhonesRoutingModule { }
