import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';

export interface department {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  addTeacherForm: FormGroup;
  teacher = Object;
  departments: department[] = [
                    {value: 'CTIS', viewValue: 'CTIS'},
                    {value: 'ITE', viewValue: 'ITE'},
                    {value: 'Other', viewValue: 'Other'}
                  ];

  submitted = false;
  success = false;

  constructor(private FormBuilder: FormBuilder, private data: DataService) {
    this.addTeacherForm = this.FormBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  onSubmit(){
    this.submitted = true;

    if (this.addTeacherForm.invalid){
      return;
    }
    this.success = true;
    this.data.addTeacher(this.addTeacherForm.value).subscribe( addedTeacher => {
      this.teacher = addedTeacher
      if(this.teacher){
        window.location.reload()
      }
    });
  }

  ngOnInit() {
  }

}
