import { Component, OnInit } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';

@Component({
  selector: 'app-jira-view',
  templateUrl: './jira-view.component.html',
  styleUrls: ['./jira-view.component.css']
})
export class JiraViewComponent implements OnInit {

  constructor() { }

  addNewBox: boolean= false;

  addColumn: Column = {
    name: '',
    tasks: []
  };

  board: Board = new Board('Test Board', [


    new Column('Todo', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ]),
    new Column('In Progress', [
      "Going to work",
      "foo",
      "This was in the 'Research' column"
    ]),
    new Column('Done', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ])
  ]);

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onAdd(){
    this.addNewBox= true;
    if(this.addColumn)
    this.board.columns.push();


  }
}


