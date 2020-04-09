import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {path: 'new', component: NewMovieComponent },
  {path: 'search', component: SearchComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
