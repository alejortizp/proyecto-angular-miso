import { Person } from "../person/person";
export class Actor extends Person {

    public constructor(name: string, photo: string, nationality: string, birthDate: Date, biography: string) {
        super(name,photo,nationality,birthDate,biography);
    }
}
