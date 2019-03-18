import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import  { EditTeacherComponent } from '../edit-teacher/edit-teacher.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.scss']
})
export class TeacherTableComponent implements OnInit {
  editTeacherDialogRef: MatDialogRef<EditTeacherComponent>;


  constructor(private data: DataService, private dialog: MatDialog) { }
  teacher_info;
  dataSource;
  displayedColumns: string[] = [ 'first_name', 'last_name', 'department', 'action'];

  ngOnInit() {
    this.data.getTeachers().subscribe(returnData => {
      this.dataSource = returnData
    });
  }

  getTeacher(id){
    this.teacher_info = this.dataSource[id]
    this.editTeacherDialogRef = this.dialog.open(EditTeacherComponent,  {
      data: {
          dataKey: this.teacher_info
      }
    });
  }

  deleteTeacher(id){
    this.data.deleteTeacher(id).subscribe(returnData => {
      if(returnData){
        window.location.reload()
      }
    });
  }
}
