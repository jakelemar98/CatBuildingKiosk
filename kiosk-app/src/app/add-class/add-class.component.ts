import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';

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

  constructor(private FormBuilder: FormBuilder, private data: DataService) {
    this.addClassForm = this.FormBuilder.group({
      class_name: ['', Validators.required],
      teacher: ['', Validators.required],
      classroom: ['', Validators.required],
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

   }
}
