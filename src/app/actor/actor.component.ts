import { Component, OnInit } from '@angular/core';
import { Actor } from './actor';
import { ActorService } from './actor.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  actors: Actor[] = [];
  filteredActors: Actor[] = [];
  searchText: string = '';

  constructor(private actorService: ActorService) {}

  ngOnInit(): void {
    this.getActors();
  }

  getActors(): void {
    this.actorService.getActors().subscribe(data => {
      this.actors = data.sort((a, b) => a.name.localeCompare(b.name));
      this.filteredActors = [...this.actors];
    });
  }

  filterActors(): void {
    const text = this.searchText.toLowerCase().trim();
    this.filteredActors = this.actors.filter(a =>
      a.name.toLowerCase().includes(text)
    );
  }
}
