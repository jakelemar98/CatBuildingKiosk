import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { DataService } from '../data.service';
import { ViewTeacherComponent } from '../view-teacher/view-teacher.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";
import { ViewClassroomComponent } from '../view-classroom/view-classroom.component';

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

  viewTeacherDialogRef: MatDialogRef<ViewTeacherComponent>;
  viewClassroomDialogRef: MatDialogRef<ViewClassroomComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService, private dialog: MatDialog) { }

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

  goToTeacher(name){
    name = name.substr(name.indexOf(' ')+1);
    this.dataService.getTeacher(name).subscribe( returnData => {
      console.log(returnData);
      
      this.viewTeacherDialogRef = this.dialog.open(ViewTeacherComponent,  {
        data: {
            dataKey: returnData[0]
        },
        width: '700px'
      });
    });
  }

  goToClassroom(val){
    var class_name = {"classroom_name": val}
    this.dataService.getClassroom(class_name).subscribe( returnData => {
      console.log(returnData);
    
      this.viewClassroomDialogRef = this.dialog.open(ViewClassroomComponent,  {
        data: {
            dataKey: returnData[0]
        },
        width: '700px'
      });
    });
  }

}
