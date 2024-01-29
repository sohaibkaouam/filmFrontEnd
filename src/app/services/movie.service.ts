import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MovieListComponent} from "../movie-list/movie-list.component";
import {Movie} from "../domain/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://localhost:8080/api/films';

  constructor(private http: HttpClient) { }

  searchMovies(primaryTitle: string, originalTitle: string, startYear: number): Observable<any> {
    // Construire les HttpParams en fonction des paramètres fournis
    let params = new HttpParams();

    if (primaryTitle) {
      params = params.set('primaryTitle', primaryTitle);
    }

    if (originalTitle) {
      params = params.set('originalTitle', originalTitle);
    }

    if (startYear) {
      params = params.set('startYear', startYear.toString());
    }

    // Effectuer la requête HTTP
    return this.http.get<Movie[]>('http://localhost:8080/api/films', { params :params });
  }


  getListMovies(pageIndex :number,pageSize :number){
    return this.http.get<Movie[]>(`${this.apiUrl}/listFilms?pageIndex=`+pageIndex+`&pageSize=`+pageSize);
  }

  addMovie(originalTitle :string,primaryTitle:string,startYear:string){
    return this.http.post<[]>(this.apiUrl+'/addNewFilm', {originalTitle,primaryTitle,startYear},{observe:'response'})
  }

  searchMovie(originalTitle :string,primaryTitle:string,startYear:string){
    return this.http.get<Movie[]>(`${this.apiUrl}/search?primaryTitle=`+primaryTitle+`&originalTitle=`+originalTitle+`&startYear=`+startYear);
  }

}
