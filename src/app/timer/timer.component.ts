import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {EventsService } from '../events.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  private _start;
  //  start;

  map(x, in_min, in_max,out_min,out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

  position;
  percent;
  step;
  interval;



  start(s){
    console.log("start signal")
    this._start = s;
    this.percent = s;
    this.position = s;
    this.next();
  }

  next(){
    setTimeout(()=>{
      // console.log(this.position--);
      this.percent = Math.floor(this.map(this.position--, 0, this._start, 0, 100))
      if(this.position < 0){
        this.percent = 100;
        this.position = 0;
        // this.position = 100;
        // clearInterval(this.interval);
        this.ready.emit(this._start)
      }else{
        this.next()
      }
    }, 1000)
  }

  @Output("ready") ready = new EventEmitter();

  constructor(public events: EventsService) {
    console.log("bind event")
  events.on("timerStart").subscribe(x=>{
    console.log("timer started")
    this.start(x)
  }) }

  ngOnInit() {
  }

}
