import { Component, OnInit } from '@angular/core';
import {DataService, Question} from '../data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  q;
  constructor(public data: DataService) { }

  ngOnInit() {
  }
  addQuestion(q){
    this.data.addQuestion(new Question(q));
    this.q = "";
  }

}
