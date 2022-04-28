import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/project/task';
import { TaskService } from 'src/app/services/project/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Project } from 'src/app/models/project/project';
import { ProjectService } from 'src/app/services/project/project.service';
import { AddTaskComponent } from '../../add-task/add-task.component';
@Component({
  selector: 'app-dragtest',
  templateUrl: './dragtest.component.html',
  styleUrls: ['./dragtest.component.css']
})
export class DragtestComponent implements OnInit {
  project: Project = new Project();
  id: number;
  constructor(private route: ActivatedRoute, private projectservice: ProjectService, private titleService: Title, public dialog: MatDialog, private Taskservice: TaskService, private router: Router) {
    this.titleService.setTitle("Task | ECM");
  }
  ngOnInit(): void {
    this.reloaddata();
  }
  reloaddata() {
    this.id = this.route.snapshot.params['id'];
    this.projectservice.getProject(this.id)
      .subscribe(data => {
        this.project = data;
      })
  }
  todo = [
    'to do',
  ];
  done = [
    'Get up',
    'Brush teeth',
  ];
  review = [
    'Take bath',
    'Wash car',
  ];
  test = [
    'test1',
    'test 2',
  ]
  //when drop
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      debugger;
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      debugger
      //transfrom from list toanother list
      //event.previousContainer.data==>l data li kont feha
      //event.container.data ==>data l jdetda
      // event.previousIndex==>l'order li kont feh fel list (tebda men 0 (index))
      // event.currentIndex==>l'order bech t7awel feh (tebda men 0 (index))
      //in html 
      //cdkDropListConnectedTo==>chnouma les listes li marbouten fehom
      //torbet les listes
      //
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  //add task
  addtask() {
    const dialogRef = this.dialog.open(AddTaskComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(`Dialog result: ${result}`);
        this.Taskservice.createTask(result)
          .subscribe(
            data => {
              console.log(data);
              this.reloaddata();
            },
            error => console.log(error));
      }
    });
  }
}
