import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, DateAdapter} from '@angular/material';
import { DataService } from '../data.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

interface classNode {
  name: string;
  children?: classNode[];
}

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit {
  


  TREE_DATA: classNode[] = []
  teacher: Object;
  classes: Object;

  private transformer = (node: classNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService) {
   }

  ngOnInit() {
    this.teacher = this.data.dataKey
    var teacher = {"teacher": this.teacher.first_name + " " + this.teacher.last_name }
    this.dataService.getClassesByTeacher(teacher).subscribe(returnData => {
      for(let clas of returnData){
        var time = clas.time;
        var hour = time.slice(0,2)
        var operator = 'AM'
        
        if(hour[0] == 0){
          hour = hour[1]
        }
        
        if(hour > 12){
          hour = hour - 12;
          operator = 'PM'
        }

        clas.time = hour + ':00 ' + operator
      var row = {
                  name: clas.class_name,
                  children: [
                      {
                        name: "Class ID",
                        children: [
                            {name: clas.class_id},
                        ]
                      },
                      {
                        name: "Classroom",
                        children: [
                          {name: clas.classroom},
                        ]
                      },
                      {
                        name: "Days",
                        children: [
                          {name: clas.days},
                        ]
                      },
                      {
                        name: "Time",
                        children: [
                          {name: clas.time}
                        ]
                      },
                  ]
                }
      this.TREE_DATA.push(row)
    }
    this.dataSource.data = this.TREE_DATA;
    console.log(this.dataSource.data.length);

  });

  }
  hasChild = (_: number, node: FlatNode) => node.expandable
}
