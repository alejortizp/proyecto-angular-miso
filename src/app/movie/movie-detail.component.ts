import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Movie } from './movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {
  @Input() movieDetail!: Movie;
  @Output() close = new EventEmitter<void>();

  onBackdropClick(): void {
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close.emit();
  }

  getActorNames(): string {
    if (!this.movieDetail || !this.movieDetail.actors || this.movieDetail.actors.length === 0) return '';
    return this.movieDetail.actors.map(a => a.name).join(', ');
  }
}


