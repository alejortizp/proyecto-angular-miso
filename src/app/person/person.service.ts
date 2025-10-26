import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = environment.baseUrl + 'directors';

constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    console.log(this.apiUrl);
    return this.http.get<Person[]>(this.apiUrl);
  }
}
