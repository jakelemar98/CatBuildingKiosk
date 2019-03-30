import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import  { EditClassroomComponent } from '../edit-classroom/edit-classroom.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-classroom-table',
  templateUrl: './classroom-table.component.html',
  styleUrls: ['./classroom-table.component.scss']
})


export class ClassroomTableComponent implements OnInit {

  editClassroomDialogRef: MatDialogRef<EditClassroomComponent>;


  constructor(private data: DataService, private dialog: MatDialog) { }

    classroom_info;
    dataSource;
    displayedColumns: string[] = [ 'classroom_name', 'floor', 'building', 'action'];

  ngOnInit() {
    this.data.getClassrooms().subscribe(returnData => {
      this.dataSource = returnData
      console.log(this.dataSource);
    });
  }

  getClassroom(id){
    this.classroom_info = this.dataSource[id]
    this.editClassroomDialogRef = this.dialog.open(EditClassroomComponent,  {
      data: {
          dataKey: this.classroom_info
      }
    });
  }

  deleteClassroom(id){
    this.data.deleteClassroom(id).subscribe(data => {
      if(data){
        window.location.reload()
      }
    });
  }

}
