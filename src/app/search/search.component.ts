import { Movie } from './../Movie';
import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  genres: string[] = ['Crime', 'Drama', 'Action', 'Biography', 'Thriller'];
  searchFilter = new FormControl('', Validators.required);
  isDataLoaded = false;
  movies: Movie[];
  // columnHeader: string[] = ['movieName', 'rating', 'genre'];
  // tslint:disable-next-line: variable-name
  constructor(private _movieService: MovieService) { }

  ngOnInit(): void {
  }
  applySearchFilter() {
    if (this.searchFilter.valid) {
      this.isDataLoaded = false;
      this._movieService.getMoviesByGenre(this.searchFilter.value).pipe(retry(1), catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        console.log(error.error);
        return throwError('Error fetching data from serve');
      })).subscribe((data: any) => {
        this.movies = data;
      });
    }
  }
}
