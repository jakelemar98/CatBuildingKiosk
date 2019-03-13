import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

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

  constructor(private FormBuilder: FormBuilder, private data: DataService, private router: Router) {
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
    this.data.getUser(this.loginForm.value).subscribe( user => {
      this.user = user;
      console.log(this.user['id'])
      if(this.user && this.user['id'] > 0){
        this.router.navigate(['/admin', this.user['id'], 'activeToken']);
      }
    });
  }

  ngOnInit() {
  }

}
