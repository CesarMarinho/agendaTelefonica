import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http'

import { Phone } from './../model/phone';
import { catchError, delay, take, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhonesService {

  private readonly API = 'api/phones';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Phone[]>(this.API)
    .pipe(
      take(1),
      delay(1000) //apenas para demonstrar o spinning
      //tap(phones => console.log(phones))
    );
  }

  loadById(id: string) {
    return this.httpClient.get<Phone>(`${this.API}/${id}`);
  }

  save(record: Partial<Phone>) {

    if(record._id){
      return this.update(record);
    }

    return this.create(record);
  }

  private create(record: Partial<Phone>) {
    return this.httpClient.post<Phone>(this.API, record);

  }

  private update(record: Partial<Phone>) {
    return this.httpClient.put<Phone>(`${this.API}/${record._id}`, record);
  }

  favorite(id: number){
    return this.httpClient.put<Phone>(`${this.API}/favorite/${id}`, '');
  }

  remove(id: number) {
    return this.httpClient.delete<Phone>(`${this.API}/${id}`);
  }

}
