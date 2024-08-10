import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from './models/todo.model';
import { TodoStore } from './services/todo-store.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngIf="todos$ | async as todos">
      <div *ngFor="let todo of todos">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
      </div>
    </div>
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
}
