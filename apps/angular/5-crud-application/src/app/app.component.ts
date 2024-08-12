import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from './models/todo.model';
import { TodoStore } from './services/todo-store.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngIf="todos$ | async as todos; else loading">
      <div *ngFor="let todo of todos">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      </div>
    </div>
    <ng-template #loading><div id="loading">...loading</div></ng-template>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos$ = this.todoStore.todos$;

  constructor(private todoStore: TodoStore) {}

  ngOnInit(): void {
    this.todoStore.loadData();
  }

  update(todo: Todo): void {
    this.todoStore.updateTodo(todo);
  }

  delete(todo: Todo): void {
    this.todoStore.deleteTodo(todo);
  }
}
