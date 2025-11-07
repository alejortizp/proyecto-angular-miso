export class Genre {
  id: string | number;
  type: string;

  constructor(id: string | number, type: string) {
    this.id = id;
    this.type = type;
  
  }
}