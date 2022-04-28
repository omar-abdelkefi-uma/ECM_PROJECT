import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Configuration } from 'src/app/configuration';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/project/task';
import { TaskService } from 'src/app/services/project/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Project } from 'src/app/models/project/project';
import { ProjectService } from 'src/app/services/project/project.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { PhaseService } from 'src/app/services/project/phase.service';
import { Phase } from 'src/app/models/project/phase';
import { AddPhaseComponent } from '../add-phase/add-phase.component';
import { EditPhaseComponent } from '../edit-phase/edit-phase.component';
import { DeleteComponent } from '../../delete/delete.component';
import { DeletePhaseComponent } from '../delete-phase/delete-phase.component';
import { LazyLoadScriptService } from 'src/app/services/lazy-load-script.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {
  project: Project = new Project();
  id: number;
  phaseListe: Phase[];
  phaserefused: Phase = new Phase();
  task: Task;
  allPhasesId = [];
  //slider attributes
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  vertical = false;
  tickInterval = 1;
  constructor(private phaseservice: PhaseService, private route: ActivatedRoute, private projectservice: ProjectService, private titleService: Title, public dialog: MatDialog, private Taskservice: TaskService, private router: Router) {
    this.titleService.setTitle("Task | ECM");
  }
  ngAfterViewInit() {
    $(document).ready(function () {
      // $("p").css("background-color", "yellow");
    })
  }
  ngOnInit(): void {
    this.reloaddata();
  }
  reloaddata() {
    //id project
    this.id = this.route.snapshot.params['id'];
    this.phaseservice.getPhasesrefuse(this.id)
      .subscribe(data => {
        this.phaserefused = data;
      });
    this.phaseListe = [];
    this.phaseservice.getPhasesByProject(this.id)
      .subscribe(data => {
        let sortedPhasesList = data;
        sortedPhasesList.sort(function (a, b) {
          return a.orderId - b.orderId;
        });
        for (let ph of sortedPhasesList) {
          this.phaseListe.push(ph);
          this.allPhasesId.push(ph.id + "");
        }
      })
    this.projectservice.getProject(this.id)
      .subscribe(data => {
        this.project = data;
      })
  }
  dropPhases(event: CdkDragDrop<string[]>) {
    //l phase loula wel lo5raney fixe
    moveItemInArray(this.phaseListe, event.previousIndex, event.currentIndex);
    var indexsOfUpdatedPhases;
    if (event.previousIndex < event.currentIndex) {
      indexsOfUpdatedPhases = Configuration.range(event.previousIndex, event.currentIndex, 1);
    } else {
      indexsOfUpdatedPhases = Configuration.range(event.currentIndex, event.previousIndex, 1);
    }
    var updatedPhases: Phase[] = [];
    for (let i of indexsOfUpdatedPhases) {
      this.phaseListe[i].orderId = i + 1;
      updatedPhases.push(this.phaseListe[i]);
    }
    this.phaseservice.updateListPhases(updatedPhases)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));
  }
  addphase() {
    const dialogRef = this.dialog.open(AddPhaseComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(`Dialog result: ${result}`);
        result.project = this.project;
        result.orderId = this.phaseListe.length + 1;
        this.phaseservice.createPhase(result)
          .subscribe(
            (data) => {
              console.log(data);
              let phase = data as Phase;
              phase.tasks = [];
              this.phaseListe[this.phaseListe.length] = phase;
              this.allPhasesId.push(phase.id + "");
            },
            error => console.log(error));
      }
    });
  }
  //when drop
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    //in event.container you can find data and connected to
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data["tasks"], event.previousIndex, event.currentIndex);
    } else {
      //transfrom from list toanother list
      //event.previousContainer.data==>^revious data(phase)
      //event.container.data ==>current container
      // event.previousIndex==>l'order li kont feh fel list (tebda men 0 (index))
      // event.currentIndex==>l'order bech t7awel feh (tebda men 0 (index))
      //in html 
      //cdkDropListConnectedTo==>chnouma les listes li marbouten fehom
      //event.previousContainer.id==>previous phase id
      transferArrayItem(event.previousContainer.data["tasks"],
        event.container.data["tasks"],
        event.previousIndex,
        event.currentIndex);
      //get task you want drag it
      this.task = event.container.data["tasks"][event.currentIndex];
      this.task.phase = new Phase();
      this.task.phase.id = +event.container.id;
      this.Taskservice.updateTask(this.task)
        .subscribe(data => {
        })
    }
  }
  editPhase(phase) {
    const dialogRef = this.dialog.open(EditPhaseComponent, {
      width: '450px',
      data: { microse: phase }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result !== undefined) {
        this.phaseservice.updatePhase(result)
          .subscribe(
            (data) => {
              console.log(data);
            },
            error => console.log(error));
      }
    });
  }
  deletePhase(phase) {
    const dialogRef = this.dialog.open(DeletePhaseComponent, {
      width: '450px',
      data: { microse: phase }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result !== undefined) {
        {
          var indexsOfUpdatedPhases;
          //get next phases orderId in list
          indexsOfUpdatedPhases = Configuration.range(result.orderId + 1, this.phaseListe.length, 1);
          var updatedPhases: Phase[] = [];
          for (let i of indexsOfUpdatedPhases) {
            this.phaseListe[i - 1].orderId = this.phaseListe[i - 1].orderId - 1;
            updatedPhases.push(this.phaseListe[i - 1]);
          }
          this.phaseservice.updateListPhases(updatedPhases)
            .subscribe(
              data => {
                console.log(data);
              },
              error => console.log(error));
          this.phaseservice.deletePhaseandtransformtasks(phase, this.id)
            .subscribe(
              (data) => {
                console.log(data);
                this.reloaddata()
              },
              error => console.log(error));
        }
      }
    });
  }
  //add task
  addtask(phase) {
    const dialogRef = this.dialog.open(AddTaskComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(`Dialog result: ${result}`);
        phase.tasks = [];
        result.phase = phase;
        result.project = this.project;
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
  edittask(item, phase) {
    debugger
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '450px',
      data: { microse: item }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(`Dialog result: ${result}`);
        phase.tasks = [];
        result.phase = phase;
        result.project = this.project;
        this.Taskservice.createTask(result)
          .subscribe(
            data => {
              console.log(data);
              this.reloaddata();
            },
            error => console.log(error));
      }
    });

    /*phase.tasks = [];
    item.phase = phase;
    item.project = this.project;
    this.Taskservice.updateTask(item)
      .subscribe(
        data => {
          console.log(data);
          this.reloaddata();
        },
        error => console.log(error));*/
  }
  consulttask(item, phase) {
    phase.tasks = [];
    item.phase = phase;
    this.Taskservice.getTask(item.id)
      .subscribe(
        data => {
          console.log(data);
          this.reloaddata();
        },
        error => console.log(error));
  }
  refusetask(item, phase) {
    debugger
    phase.tasks = [];
    item.phase = phase;
    this.Taskservice.refuseTask(item, this.id)
      .subscribe(
        data => {
          console.log(data);
          this.reloaddata();
        },
        error => console.log(error));
  }
  deletetask(item, phase) {
    phase.tasks = [];
    item.phase = phase;
    this.Taskservice.deleteTask(item.id)
      .subscribe(
        data => {
          console.log(data);
          this.reloaddata();
        },
        error => console.log(error));
  }
  returntask(item, phase) {
    phase.tasks = [];
    item.phase = phase;
    this.Taskservice.returnTask(item)
      .subscribe(
        data => {
          console.log(data);
          this.reloaddata();
        },
        error => console.log(error));
  }
  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
}
