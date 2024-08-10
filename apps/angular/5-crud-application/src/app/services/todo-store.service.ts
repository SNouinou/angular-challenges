import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo.model';
import { TodoHttp } from './todo-http.service';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private todos = new BehaviorSubject<Todo[]>([]);
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
        this.todos.value.map((t) =>
          t.id === todoUpdated.id ? todoUpdated : t,
        ),
      );
    });
  }

  addAll(todos: Todo[]) {
    this.todos.next(todos);
  }

  addOne(student: Todo) {
    this.todos.next([...this.todos.value, student]);
  }

  deleteOne(id: string) {
    this.todos.next(this.todos.value.filter((s) => s.id !== id));
  }
}
