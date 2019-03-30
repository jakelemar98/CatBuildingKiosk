import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';

export interface teacher {
  value: number;
  viewValue: string;
}

export interface section {
  value: string;
}

export interface day {
  value: string;
}

export interface classroom {
  value: string;
}

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
  teachers: teacher[] = [];
  classrooms: classroom[] = [];

  sections: section[] = [
                {value: 'CIS'},
                {value: 'CSC'},
            ];
days: day[] = [
      {value: 'M'},
      {value: 'T'},
      {value: 'W'},
      {value: 'TH'},
      {value: 'F'},
      {value: 'MW'},
      {value: 'MWF'},
      {value: 'TR'},
      ]

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private FormBuilder: FormBuilder, private DataService: DataService) {
    this.editClassForm = this.FormBuilder.group({
      class_id: ['', Validators.required],
      class_name: ['', Validators.required],
      teacher: ['', Validators.required],
      section: ['', Validators.required],
      classroom: ['', Validators.required],
      days: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.dataFill = this.data.dataKey
    
    var hour = this.dataFill.time.charAt(0)
    hour = parseInt(hour, 10)
    
    if (hour < 10 && hour != 0){
      this.dataFill.time = "0"+this.dataFill.time
    } 
    
    this.editClassForm.setValue({
      class_id: this.dataFill.class_id,
      class_name: this.dataFill.class_name,
      teacher: this.dataFill.teacher,
      section: this.dataFill.section,
      classroom: this.dataFill.classroom,
      days: this.dataFill.days,
      time: this.dataFill.time
    });
    this.DataService.getTeachers().subscribe( returnedTeachers => {
      for(let teach of returnedTeachers){
        var row = {value: teach.id, viewValue: teach.first_name + " " + teach.last_name}
        this.teachers.push(row)
      };
    });
    this.DataService.getClassrooms().subscribe( returnedClassrooms => {
      for(let classroom of returnedClassrooms){
        var row = {value: classroom.classroom_name}
        this.classrooms.push(row)
      };
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
