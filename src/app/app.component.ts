import { Component } from '@angular/core';
import { DataService } from './data.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subject} from 'rxjs';
import {EventsService } from './events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public data: DataService, public cdr: ChangeDetectorRef, public events: EventsService){}

  title = 'app';

  state = "start";
  questionCount = 1;
  roundLength = 15;
gamepos;
questions;
visibleQuestion;

timerStarter = new Subject();

  startGame(){
    this.state = "game";
    // this.questionCount = number;
    // this.roundLength = length;

    this.gamepos = 0;

    this.questions =  this.extractQuestions(this.questionCount);

    console.log("aloitetaan peli kysymyksillä:",this.questions)
    // this.questions = this.questions.slice(0,this.questionCount);

    // console.log("aloitetaan peli kysymyksillä:",this.questions)

    this.runRound()

  }

  extractQuestions(num){
    // let q = [];
    // this.data.questions.map(x=>{
    //   q.push(x);
    // });
    let q = this.data.questions.slice(0, this.data.questions.length);
    while(q.length < num){
      q = q.concat(this.data.questions.slice(0, this.data.questions.length));
    }
    console.log(num, q)
    q = q.sort((x,y)=>{
      if(Math.floor(Math.random()* 10) >= 5){
        return -1;
      }else{
        return 1;
      }
    })
    return q.slice(0, num);

  }

  runRound=()=>{
    this.visibleQuestion = this.questions[this.gamepos] || {question:"error"}
    // this.starter = Math.floor(this.roundLength); //trigger timer
    // this.cdr.detectChanges();
    // this.timerStarter.next(this.roundLength);

    this.events.send("timerStart", this.roundLength)
    console.log("event sent")
    // this.events.in.onNext(this.roundLength)
  }

  handleTimerReady(signal){
    console.log("timerReady!")
    if(this.state != "game"){
      return;
    }
    this.data.spawnWinnerDialog(this.data.teams)
    .subscribe(winner=>{
      this.data.attributePoints(winner, winner.score + 5)

      this.gamepos ++;
      if(this.gamepos < this.questionCount && this.gamepos < this.questions.length){

        // this.starter = 0; //trigger timer/
        // setTimeout(()=>{
        //   this.runRound()
        // }, 150)
        this.runRound()

      }else{
        this.state = "start"
      }
    })
    // this.runRound()

  }

  starter = 60;

  // data = {results:[
  //   {team: "Iida ja Roope", value: 1}
  //
  // ]}
}
