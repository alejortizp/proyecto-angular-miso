import { Component, OnInit } from '@angular/core';
import { Director } from './director'; 
import { DirectorService } from './director.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  constructor(private directorService: DirectorService) { }

  directors: Array<Director> = [];

  getDirectors() {
    this.directorService.getDirectors().subscribe(data => {
      this.directors = data;
      console.log(this.directors);
    });
    console.log('After subscribe');
  }


  ngOnInit() {
    this.getDirectors();
  }

}