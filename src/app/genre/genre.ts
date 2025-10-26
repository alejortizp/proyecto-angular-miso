export class Genre {
  id: number;
  name: string;
  description?: string;
  movieCount?: number;

  constructor(id: number, name: string, description?: string, movieCount?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.movieCount = movieCount;
  }
}