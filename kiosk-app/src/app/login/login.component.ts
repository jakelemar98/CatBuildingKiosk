import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  success = false;
  user: Object;

  constructor(private FormBuilder: FormBuilder, private data: DataService) {
    this.loginForm = this.FormBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    this.submitted = true;

    if (this.loginForm.invalid){
      return;
    }
    this.success = true;
    this.user = this.data.getUser(this.loginForm.value);
  }

  ngOnInit() {
  }

}
