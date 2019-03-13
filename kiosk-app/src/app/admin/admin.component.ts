import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  id: string;
  token: string;
  user: Object;
  loggedIn: boolean;

  constructor(private route: ActivatedRoute, private data: DataService, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.token = this.route.snapshot.paramMap.get('token');

    if(this.id && this.token == 'activeToken'){
      console.log("user verified")
    } else{
      this.router.navigate(['/']);
    }
  }

}
