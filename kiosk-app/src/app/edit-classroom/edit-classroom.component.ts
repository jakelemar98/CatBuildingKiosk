import { Component, OnInit , Inject} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import {MAT_DIALOG_DATA} from '@angular/material';

export interface building {
  value: string;
}

@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.scss']
})
export class EditClassroomComponent implements OnInit {
  dataFill;
  editClassroomForm: FormGroup;
  classroom = Object;
  buildings: building[] = [
    {value: 'CAT Building'},
    {value: 'Gardener Hall'}
  ];
  submitted; 
  success;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private FormBuilder: FormBuilder, private dataService: DataService) {
    this.editClassroomForm = this.FormBuilder.group({
      classroom_name: ['', Validators.required],
      floor: ['', Validators.required],
      building: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.dataFill = this.data.dataKey
    console.log(this.data)
    this.editClassroomForm.setValue({
      classroom_name: this.dataFill.classroom_name,
      floor: this.dataFill.floor,
      building: this.dataFill.building
    });
  }

  onSubmit(){
    this.submitted = true;

    if (this.editClassroomForm.invalid){
      return;
    }
    this.success = true;
    this.dataService.updateClassroom(this.editClassroomForm.value, this.dataFill.id).subscribe( addedClassroom => {
      if(addedClassroom){
        window.location.reload()
      }
    });
  }

}
