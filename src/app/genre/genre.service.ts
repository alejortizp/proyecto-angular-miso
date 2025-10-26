import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from './genre';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiUrl = environment.baseUrl + 'genres';

constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }
}