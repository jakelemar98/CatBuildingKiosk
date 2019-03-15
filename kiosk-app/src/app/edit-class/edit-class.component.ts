import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {

  editClassForm: FormGroup;
  dataFill;
  class;
  submitted = false;
  success = false;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private FormBuilder: FormBuilder, private DataService: DataService) {
    this.editClassForm = this.FormBuilder.group({
      class_name: ['', Validators.required],
      teacher: ['', Validators.required],
      classroom: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.dataFill = this.data.dataKey
    this.editClassForm.setValue({
      class_name: this.dataFill.class_name,
      teacher: this.dataFill.teacher,
      classroom: this.dataFill.classroom
    });
  }

  onSubmit(){
    this.submitted = true;

    if (this.editClassForm.invalid){
      return;
    }
    this.success = true;
    this.DataService.updateClass(this.editClassForm.value, this.dataFill.id).subscribe( addedClass => {
      this.class = addedClass
      if(this.class){
        window.location.reload()
      }
    });
  }
}
