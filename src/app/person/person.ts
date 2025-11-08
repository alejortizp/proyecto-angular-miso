export class Person {
    id: string | number;
    name: string;
    photo: string;
    nationality: string;
    birthDate: Date;
    biography: string;

    public constructor(id: string | number, name: string, photo: string, nationality: string, birthDate: Date, biography: string) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.nationality = nationality;
        this.birthDate = birthDate;
        this.biography = biography;
    }
}
