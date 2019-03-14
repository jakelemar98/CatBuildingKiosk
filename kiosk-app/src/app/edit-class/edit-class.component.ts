import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {

  addClassForm: FormGroup;
  data;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private FormBuilder: FormBuilder) {
    this.editClassForm = this.FormBuilder.group({
      class_name: ['', Validators.required],
      teacher: ['', Validators.required],
      classroom: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.data = this.data.dataKey
    this.editClassForm.setValue({
      class_name: this.data.class_name,
      teacher: this.data.teacher,
      classroom: this.data.classroom
    });
  }
}
