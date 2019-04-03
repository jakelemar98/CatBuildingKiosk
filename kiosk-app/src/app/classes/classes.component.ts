import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";
import { ViewClassComponent } from '../view-class/view-class.component';
import { ViewTeacherComponent } from '../view-teacher/view-teacher.component';
import { ViewClassroomComponent } from '../view-classroom/view-classroom.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  classes: Object;
  teachers: Object;
  classrooms: Object;
  class: Object;
  teacher: Object;
  classroom: Object;

  viewClassDialogRef: MatDialogRef<ViewClassComponent>;
  viewTeacherDialogRef: MatDialogRef<ViewTeacherComponent>;
  viewClassroomDialogRef: MatDialogRef<ViewClassroomComponent>;

  constructor(private data: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    this.data.getClasses().subscribe(data => {
      this.classes = data
      console.log(this.classes);
    });
    this.data.getTeachers().subscribe(data => {
      this.teachers = data
      console.log(this.teachers);
    });
    this.data.getClassrooms().subscribe(data => {
      this.classrooms = data
      console.log(this.classrooms);
    });
  };

  onSelect(obj, type) {
    console.log(obj, type)
    var id = obj.id;
    if  (type == "class"){
      this.viewClassDialogRef = this.dialog.open(ViewClassComponent,  {
        data: {
            dataKey: obj
        },
        width: '700px'
      });
    } else if(type == "teacher"){
      this.viewTeacherDialogRef = this.dialog.open(ViewTeacherComponent,  {
        data: {
            dataKey: obj
        }
      });
    } else{
      this.viewClassroomDialogRef = this.dialog.open(ViewClassroomComponent,  {
        data: {
            dataKey: obj
        }
      });
    }
  }

}
