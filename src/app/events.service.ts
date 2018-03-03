import { Injectable } from '@angular/core';
// import * as Rx from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/operators/skip';

@Injectable()
export class EventsService {

  // public in = new Rx.Subject();
  // public out;

  channels;

  constructor() {
    this.channels = {};
    // this.out = this.in.asObservable();
    // this.test();
  }

  send(channel, message){
    if(this.channels[channel]){

      this.channels[channel].next(message);
    }else{
      this.channels[channel] = new BehaviorSubject("start");
      this.channels[channel].next(message);
    }
    return this;
  }

  on(channel){
    if(this.channels[channel]){
      return this.channels[channel].asObservable();
    }else{
      this.channels[channel] = new BehaviorSubject("start");
      // throw("no such channel!")
      return this.channels[channel].asObservable();
    }
  }

  test(){
    // this.send("kissa", "koira")
    // this.send("kissa", "koira2")
    // this.on("kissa").subscribe(x=>{console.log("testing this thing:",x)})



  }

}
