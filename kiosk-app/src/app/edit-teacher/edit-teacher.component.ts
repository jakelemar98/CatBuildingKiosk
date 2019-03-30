import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';

export interface department {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-tea',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {

  editTeacherForm: FormGroup;
  dataFill;
  teacher;
  submitted = false;
  success = false;
  departments: department[] = [];
  class;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private FormBuilder: FormBuilder, private DataService: DataService) {
    this.editTeacherForm = this.FormBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.dataFill = this.data.dataKey
    this.editTeacherForm.setValue({
      first_name: this.dataFill.first_name,
      last_name: this.dataFill.last_name,
      department: this.dataFill.department
    });
    var row = {value: 'CTIS', viewValue: 'CTIS'}
    var row2 = {value: 'ITE', viewValue: 'ITE'}
    var row3 = {value: 'Other', viewValue: 'Other'}

    this.departments.push(row)
    this.departments.push(row2)
    this.departments.push(row3)
  }

  onSubmit(){
    this.submitted = true;

    if (this.editTeacherForm.invalid){
      return;
    }
    this.success = true;
    this.DataService.updateTeacher(this.editTeacherForm.value, this.dataFill.id).subscribe( addedClass => {
      this.class = addedClass
      if(this.class){
        window.location.reload()
      }
    });
  }
}
