import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director } from './director';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  private apiUrl = environment.baseUrl + 'directors';

constructor(private http: HttpClient) { }

  getDirectors(): Observable<Director[]> {
    return this.http.get<Director[]>(this.apiUrl);
  }
}