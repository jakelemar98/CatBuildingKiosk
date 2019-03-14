import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import  { EditClassComponent } from '../edit-class/edit-class.component';
import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-class-table',
  templateUrl: './class-table.component.html',
  styleUrls: ['./class-table.component.scss']
})
export class ClassTableComponent implements OnInit {

  editClassDialogRef: MatDialogRef<EditClassComponent>;


  constructor(private data: DataService, private dialog: MatDialog) { }

  data;
  dataSource;
  displayedColumns: string[] = [ 'class_name', 'teacher', 'classroom', 'action'];

  ngOnInit() {
    this.data.getClasses().subscribe(data => {
      this.dataSource = data
    });
  }

  getClass(id){
    this.class_info = this.dataSource[id]
    this.editClassDialogRef = this.dialog.open(EditClassComponent,  {
      data: {
          dataKey: this.class_info
      }
    });
  }

  deleteClass(id){
    this.data.deleteClass(id).subscribe(data => {
      if(data){
        window.location.reload()
      }
    });
  }
}
