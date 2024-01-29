import {Component, OnInit, ViewChild} from '@angular/core';
import { MovieService } from '../services/movie.service';
import {ConfirmationService, MessageService} from "primeng/api";
import {Movie} from "../domain/movie";
import { InputTextModule } from 'primeng/inputtext';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  providers: [MessageService,ConfirmationService,InputTextModule]
})
export class MovieListComponent implements OnInit {
  movies!: Movie[];

  @ViewChild('f') searchForm: NgForm | undefined

  visible: boolean = false;

  totalRecords!: number;

  years: string[] = [];
  originalTitle: any;
  primaryTitle: any;
  startYear: any;


  constructor(private movieService : MovieService,private modalService: NgbModal) {}

  ngOnInit() {
    this.movieService.getListMovies(0,100).subscribe(
      (res) => {
        this.movies = res;
        res.forEach((value) => {
          if (value.hasOwnProperty('startYear') && !this.years.includes(value.startYear))
            this.years.push(value.startYear);
        });
      }
    );
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  addMovie() {
    this.movieService.addMovie(this.originalTitle,this.primaryTitle,this.startYear).subscribe(data =>{
      console.log('movie was added')
    });
  }

  searchMovie(f: NgForm) {
    this.movieService.searchMovie(f.value.primaryTitle,f.value.originalTitle,f.value.startYear).subscribe(
      (res) => {
        this.movies = res;
        res.forEach((value) => {
          if (value.hasOwnProperty('startYear') && !this.years.includes(value.startYear))
            this.years.push(value.startYear);
        });
      }
    );

  }

}
