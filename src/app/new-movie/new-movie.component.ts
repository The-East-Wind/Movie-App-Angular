import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  success: boolean;
  message: string;
  genres: string[] = ['Crime', 'Drama', 'Action', 'Biography', 'Thriller'];
  addMovieForm = new FormGroup({
    movieName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9:,.\s-]{2,30}$/)]),
    rating: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]$/)]),
    genre: new FormControl('', Validators.required)
  });
  // tslint:disable-next-line: variable-name
  constructor(private _movieService: MovieService) { }

  ngOnInit(): void {
  }
  addNewMovie() {
    if (this.addMovieForm.valid) {
      this._movieService.addNewMovie(this.addMovieForm.value).pipe(catchError((error: HttpErrorResponse) => {
        console.log(error.status, error.error);
        this.success = false;
        this.message = 'Uh-oh! An error occured. Please try again later.';
        return throwError('Error adding movie');
      })).subscribe((data: any) => {
        console.log(data);
        this.message = 'Movie added successfully!';
        this.success = true;
      });
    }
  }
}
