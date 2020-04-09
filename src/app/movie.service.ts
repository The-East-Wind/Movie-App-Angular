import { Movie } from './Movie';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = 'http://localhost:8080/movies';
  // tslint:disable-next-line: variable-name
  constructor(private _httpClient: HttpClient) { }
  getMoviesByGenre(genre: string): Observable<Movie> {
    const getUrl = `${this.url}/${genre}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.get<Movie>(getUrl);
  }
  addNewMovie(newMovie: Movie): Observable<Movie> {
    const postUrl = `${this.url}/new`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.post<Movie>(postUrl, newMovie, httpOptions);
  }
}
