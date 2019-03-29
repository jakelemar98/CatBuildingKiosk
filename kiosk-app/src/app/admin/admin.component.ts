import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";
import { AddClassComponent } from "../add-class/add-class.component";
import { ClassTableComponent } from "../class-table/class-table.component";
import { AddTeacherComponent } from "../add-teacher/add-teacher.component";
import { TeacherTableComponent } from "../teacher-table/teacher-table.component";
import { AddClassroomComponent } from "../add-classroom/add-classroom.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  id: string;
  token: string;
  user: Object;
  loggedIn: boolean;

  addClassDialogRef: MatDialogRef<AddClassComponent>;
  addTeacherDialogRef: MatDialogRef<AddTeacherComponent>;
  addClassroomDialogRef: MatDialogRef<AddClassroomComponent>;

  classTableDialogRef: MatDialogRef<ClassTableComponent>;
  teacherTableDialogRef: MatDialogRef<TeacherTableComponent>;



  constructor(private route: ActivatedRoute, private data: DataService, private router: Router, private dialog: MatDialog) { }

  openAddDialog(type) {
    if(type == "class"){
      this.addClassDialogRef = this.dialog.open(AddClassComponent);
    } else if(type == "teacher"){
      this.addTeacherDialogRef = this.dialog.open(AddTeacherComponent);
    } else {
      this.addClassroomDialogRef = this.dialog.open(AddClassroomComponent);
    }
  }

  openEditTable(type) {
    if(type == "class"){
      this.classTableDialogRef = this.dialog.open(ClassTableComponent,  {
        height: '400px',
        width: '600px',
      });
    } else{
      this.teacherTableDialogRef = this.dialog.open(TeacherTableComponent,  {
        height: '400px',
        width: '600px',
      });
    }

  }



  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.token = this.route.snapshot.paramMap.get('token');

    if(this.id && this.token == 'activeToken'){
      console.log("user verified")
    } else{
      this.router.navigate(['/']);
    }
  }

}
