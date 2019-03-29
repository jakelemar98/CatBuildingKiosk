import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.scss']
})
export class AddClassroomComponent implements OnInit {
  
  addClassroomForm: FormGroup;
  classroom = Object;

  submitted = false;
  success = false;

  constructor(private FormBuilder: FormBuilder, private data: DataService) { 
    this.addClassroomForm = this.FormBuilder.group({
      classroom_name: ['', Validators.required],
      floor: ['', Validators.required],
      building: ['', Validators.required],
    });
  }

  onSubmit(){
    this.submitted = true;

    if (this.addClassroomForm.invalid){
      return;
    }
    this.success = true;
    this.data.addClassroom(this.addClassroomForm.value).subscribe( addedClassroom => {
      this.classroom = addedClassroom
      if(this.classroom){
        window.location.reload()
      }
    });
  }

  ngOnInit() {
  }

}
