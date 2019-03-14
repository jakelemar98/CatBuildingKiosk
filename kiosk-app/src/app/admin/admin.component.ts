import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddClassComponent } from "../add-class/add-class.component";
import { ClassTableComponent } from "../class-table/class-table.component";

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
  classTableDialogRef: MatDialogRef<ClassTableComponent>;


  constructor(private route: ActivatedRoute, private data: DataService, private router: Router, private dialog: MatDialog) { }

  openAddDialog() {
    this.addClassDialogRef = this.dialog.open(AddClassComponent);
  }

  openEditTable() {
    this.classTableDialogRef = this.dialog.open(ClassTableComponent,  {
      height: '400px',
      width: '600px',
    });
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
