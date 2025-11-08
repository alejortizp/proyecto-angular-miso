import { Person } from "../person/person";
export class Director extends Person {

    public constructor(id: string | number, name: string, photo: string, nationality: string, birthDate: Date, biography: string) {
        super(id,name,photo,nationality,birthDate,biography);
    }
}
