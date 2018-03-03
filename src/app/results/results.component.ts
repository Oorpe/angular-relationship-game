import { Component, OnInit, Input,
  //  Output, EventEmitter
 } from '@angular/core';

 import { DataService} from '../data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  
  // @Input("results") results = new Array<any>();


  // @Output() remove = new EventEmitter();

  constructor(public data: DataService) {

   }

  ngOnInit() {
  }


}
