import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from './actor';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private apiUrl = environment.baseUrl + 'actors';

constructor(private http: HttpClient) { }

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.apiUrl);
  }
}