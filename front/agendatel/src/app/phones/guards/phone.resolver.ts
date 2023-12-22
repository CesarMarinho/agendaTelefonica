import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Phone } from '../model/phone';
import { PhonesService } from '../services/phones.service';

@Injectable({
  providedIn: 'root'
})

export class PhoneResolver implements Resolve<Phone> {

  constructor(private service: PhonesService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Phone> {
    if(route.params && route.params['id']){
      return this.service.loadById(route.params['id']);
    }
    return of({_id: 0, name: '', nphone: '', mobile: '', email: '', isFavorite: false, isActive: false });
  }

}
