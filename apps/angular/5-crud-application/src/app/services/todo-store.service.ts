import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo.model';
import { TodoHttp } from './todo-http.service';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private todos = new BehaviorSubject<Todo[] | null>(null);
  todos$ = this.todos.asObservable();

  constructor(private todoHttp: TodoHttp) {}

  loadData(): void {
    this.todoHttp.fetchTodoList().subscribe((data) => {
      this.todos.next(data);
    });
  }

  updateTodo(todo: Todo): void {
    this.todoHttp.updateTodo(todo).subscribe((todoUpdated: Todo) => {
      this.todos.next(
        this.todos.value!.map((t) =>
          t.id === todoUpdated.id ? todoUpdated : t,
        ),
      );
    });
  }

  deleteTodo(todo: Todo) {
    this.todoHttp.deleteTodo(todo).subscribe(() => {
      this.todos.next(this.todos.value!.filter((t) => t.id !== todo.id));
    });
  }
}
