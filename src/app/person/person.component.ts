import { Component, OnInit } from '@angular/core';
import { Person } from './person'; 
import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(private personService: PersonService) { }

  persons: Array<Person> = [];

  getPersons() {
    this.personService.getPersons().subscribe(data => {
      console.log(data);
      this.persons = data;
      console.log(this.persons);
    });
    console.log('After subscribe');
    

  }


  ngOnInit() {
    this.getPersons();
  }

}
