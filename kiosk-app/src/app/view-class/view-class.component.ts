import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

export interface day {
  value: string;
}

@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.scss']
})
export class ViewClassComponent implements OnInit {

  class: Object;
  days: day[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.class = this.data.dataKey;
    var days = this.class.days;
    var dayArr = {
      'M': ['Monday'],
      'T': ['Tuesday'],
      'W': ['Wednesday'],
      'TH': ['Thursday'],
      'F': ['Friday'],
      'MWF': ['Monday', 'Wednesday', 'Friday'],
      'MW': ['Monday', 'Wednesday'],
      'TR': ['Tuesday', 'Thursday']
    }
    days = dayArr[days]
    for(let day of days){
      var row = {value:day}
      this.days.push(row)
    };
    

    var time = this.class.time;
    var hour = time.slice(0,2)
    var operator = 'AM'
    
    if(hour[0] == 0){
      hour = hour[1]
    }
    
    if(hour > 12){
      hour = hour - 12;
      operator = 'PM'
    }

    this.class.time = hour + ':00 ' + operator
  }

}
