import { Component, OnInit } from '@angular/core';
import { DataService, Team } from '../data.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  name: string;
  teams;

  constructor(public data: DataService) { }

  ngOnInit() {
  }

  addTeam(){
    this.data.addTeam(new Team(this.name));
    this.name =  "";
  }

  // removeTeam(t){
  //   this.data.removeTeam(t);
  // }



}
