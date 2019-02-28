import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  classes: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getClasses().subscribe(data => {
      this.classes = data
    });
  }

}
