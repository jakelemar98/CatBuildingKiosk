import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, DateAdapter} from '@angular/material';
import { DataService } from '../data.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";
import { ViewClassComponent } from '../view-class/view-class.component';

export interface scheduledClass {
  classname: string;
  classtime: string;
  class_id: number;
}

@Component({
  selector: 'app-view-classroom',
  templateUrl: './view-classroom.component.html',
  styleUrls: ['./view-classroom.component.sass']
})
export class ViewClassroomComponent implements OnInit {

  classroom: Object;
  classes: Object;
  monday: scheduledClass[] = [];
  tuesday: scheduledClass[] = [];
  wednesday: scheduledClass[] = [];
  thursday: scheduledClass[] = [];
  friday: scheduledClass[] = [];

  viewClassDialogRef: MatDialogRef<ViewClassComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    this.classroom = this.data.dataKey;
    var dayArr = {
      'M': ['Monday'],
      'T': ['Tuesday'],
      'W': ['Wednesday'],
      'TH': ['Thursday'],
      'F': ['Friday'],
      'MWF': ['Monday', 'Wednesday', 'Friday'],
      'MW': ['Monday', 'Wednesday'],
      'TR': ['Tuesday', 'Thursday']
    };
    
    var classroom = {"classroom": this.classroom.classroom_name}
    this.dataService.getClassesByClassroom(classroom).subscribe(returnData => {
      for(let classnum of returnData){
        console.log(classnum);
        
        var time = classnum.time;
        var hour = time.slice(0,2)
        var operator = 'AM'
        
        if(hour[0] == 0){
          hour = hour[1]
        }
        
        if(hour > 12){
          hour = hour - 12;
          operator = 'PM'
        }

        classnum.time = hour + ':00 ' + operator
        var days = dayArr[classnum.days]
        for (let day of days){
          if (day == "Monday"){
            var entry = {"classname": classnum.class_name, "classtime": classnum.time, "class_id": classnum.id}
            this.monday.push(entry)
          } else if(day == "Tuesday"){
            var entry = {"classname": classnum.class_name, "classtime": classnum.time, "class_id": classnum.id}
            this.tuesday.push(entry)
          }else if(day == "Wednesday"){
            var entry = {"classname": classnum.class_name, "classtime": classnum.time, "class_id": classnum.id}
            this.wednesday.push(entry)
            console.log(this.wednesday);
            
          }else if(day == "Thursday"){
            var entry = {"classname": classnum.class_name, "classtime": classnum.time, "class_id": classnum.id}
            this.Thursday.push(entry)
          }else if(day == "Friday"){
            var entry = {"classname": classnum.class_name, "classtime": classnum.time, "class_id": classnum.id}
            this.friday.push(entry)
          }
        }         
      }
    });
  }

  goToClass(id){
    console.log(id);
    this.dataService.getClass(id).subscribe( returnData => {
      this.viewClassDialogRef = this.dialog.open(ViewClassComponent,  {
        data: {
            dataKey: returnData
        },
        width: '700px'
      });
    });
  }

}
