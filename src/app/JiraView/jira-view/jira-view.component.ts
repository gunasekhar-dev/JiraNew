import { Component, OnInit } from '@angular/core';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { TaskColumn } from 'src/app/models/task.model';

@Component({
  selector: 'app-jira-view',
  templateUrl: './jira-view.component.html',
  styleUrls: ['./jira-view.component.css'],
})
export class JiraViewComponent implements OnInit {
  constructor() { }

  statusText: string | undefined;

  addNewBox: boolean = false;

  addNewTask: boolean = false;
  taskName: string = '';
  taskDesc: string = '';

  activeColumnIndex: number = 0;
  dynamicBoard: Board = new Board('Test Board', []);

  ngOnInit() {
    let temp = localStorage.getItem('userinfo');

    let val = JSON.parse(localStorage.getItem('userinfo') || '[]');
    console.log(val);
    let len = JSON.parse(val).columns.length;
    if (temp != null) {
      for (let i = 0; i < len; i++) {
        let newColumn: Column = {
          name: JSON.parse(val).columns[i].name,
          tasks: JSON.parse(val).columns[i].tasks,
        };
        if (this.dynamicBoard)
        this.dynamicBoard.columns.push(newColumn);
      }
    }
  }

  drop(event: CdkDragDrop<TaskColumn[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onAdd() {
    this.addNewBox = true;
  }

  addStatus() {
    this.addNewBox = false;

    if (this.statusText) {
      let newColumn: Column = {
        name: this.statusText,
        tasks: [],
      };
      if (this.dynamicBoard)
      this.dynamicBoard.columns.push(newColumn);
    }
    console.log(this.dynamicBoard);
    this.statusText = '';
  }

  onCreateTask(updateColumn: Column) {
    console.log(updateColumn);
    this.addNewTask = false;

    let newTask: TaskColumn = {
      name: this.taskName,
      description: this.taskDesc,
    }
    updateColumn.tasks.push(newTask);
    this.taskName = '';
    this.taskDesc = '';
  }
  addTaskName(activeIndex: number) {
    this.addNewTask = true;
    this.activeColumnIndex = activeIndex;
  }

  onSave() {
    const jsonData = JSON.stringify(this.dynamicBoard);
    localStorage.setItem('userinfo', JSON.stringify(jsonData));
    console.log(jsonData);
  }
}
