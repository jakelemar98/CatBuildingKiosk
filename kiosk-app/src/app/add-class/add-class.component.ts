import { Component, OnInit } from '@angular/core';
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
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {

  addClassForm: FormGroup;
  submitted = false;
  success = false;
  class = Object;
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

  constructor(private FormBuilder: FormBuilder, private data: DataService) {
    this.addClassForm = this.FormBuilder.group({
      class_id: ['', Validators.required],
      class_name: ['', Validators.required],
      teacher: ['', Validators.required],
      section: ['', Validators.required],
      classroom: ['', Validators.required],
      days: ['', Validators.required],
      time: ['', Validators.required],
    });
  }
  onSubmit(){

    this.submitted = true;

    if (this.addClassForm.invalid){
      return;
    }
    this.success = true;
    this.data.addClass(this.addClassForm.value).subscribe( addedClass => {
      this.class = addedClass
      if(this.class){
        window.location.reload()
      }
    });
  }

  ngOnInit() {
    this.data.getTeachers().subscribe( returnedTeachers => {
      for(let teach of returnedTeachers){
        var row = {value: teach.id, viewValue: teach.first_name + " " + teach.last_name}
        this.teachers.push(row)
      };
    });
    this.data.getClassrooms().subscribe( returnedClassrooms => {
      for(let classroom of returnedClassrooms){
        var row = {value: classroom.classroom_name}
        this.classrooms.push(row)
      };
    });
  }
}
