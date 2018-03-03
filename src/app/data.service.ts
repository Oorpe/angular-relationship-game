import { Injectable, Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// var id = 0;

// function incrementor=()=>{return id++;}

export class IdAble{
  // static id = 0;
  public id;
  constructor(){
    let array = new Uint32Array(2);
    window.crypto.getRandomValues(array);
    this.id = array;
  }
}

export class Team extends IdAble{
  // static id = 0;
  public name;
  public score;
  // public id;
constructor(name){
  super()
  this.name = name || "";
  this.score = 0;
  console.log("created new team:",this)
}
}

export class Question extends IdAble{
  public question;
  constructor(q){
    super()
    this.question = q || "";
    // console.log("created new team:",this)
  }
}

/*
  {
  id:number,
  team: string,
  value: number
}
*/
export class Result extends IdAble{
  public team: Team;
  public value;
  constructor({team, value}){
    super()
    this.team = team;
    this.value = value;
  }

}



@Injectable()
export class DataService {

  public questions  = [];
  public results = [];
  public teams = [];

  constructor(public dialog: MatDialog) {
    this.retrieve();
  }


  public addQuestion(question){
    this.questions.push(question);
    console.log(question)
    this.save()
    // localStorage.setItem('questions', this.questions);
  }

  public removeQuestion(q){
    this.questions = this.questions.filter(x=>x.id!=q.id)
    this.save()
  }

  public addResult(result){
    this.results.push(result);
    this.save()
    // localStorage.setItem('results', this.questions);
  }

  public removeResult(r){
    this.results = this.results.filter(x=>x.id != r.id)
    this.save()
  }

  public addTeam(t){
    this.teams.push(t);
    this.save()
  }

  public removeTeam(t){
    this.teams = this.teams.filter(x=>x.id != t.id);
    this.save()
  }

  private save(){
    console.log("saving state")
    localStorage.setItem("peli", JSON.stringify({q:this.questions, r: this.results, t: this.teams}))
  }

  private retrieve(){
    let str = localStorage.getItem("peli");
    // console.log(store)
    let store;
    try{
      store = JSON.parse(str)
    }
    catch( e){
      console.log("error parsing")
      store = {};
    }
    this.questions = store.q || []
    this.results = store.r || []
    this.teams = store.t || []
  }

  public clearStorage(){
    localStorage.setItem("peli", JSON.stringify({q:undefined, r:undefined, t:undefined}));
    this.retrieve();
  }

  spawnWinnerDialog=(choices)=>{
    let dialogRef = this.dialog.open(WinnerDialog, {
      data: { choices:choices }
    });

    return dialogRef.afterClosed()
  }

  attributePoints(winner, points){
    if(winner){
      // this.addResult(new Result({team:winner, value: 10}))
      this.teams.find(x=>x.id == winner.id).score = points;
      this.save();
    }

  }

  clearScores(){
    this.teams = this.teams.map(x=>{x.score = 0; return x;})
    this.save()
  }

  clearTeams(){
    this.teams = [];
    this.save()
  }

}

@Component({
  selector: 'winner-dialog',
  template: `
  <h2 mat-dialog-title>Kuka voitti?</h2>
<mat-dialog-actions>
  <button mat-button *ngFor="let choice of data.choices"
   mat-dialog-close (click)="dialogRef.close(choice)">{{choice.name}}</button>
</mat-dialog-actions>
  `,
})
export class WinnerDialog {

  constructor(
    public dialogRef: MatDialogRef<WinnerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // onNoClick(winner): void {
  //   this.dialogRef.close();
  // }

}
