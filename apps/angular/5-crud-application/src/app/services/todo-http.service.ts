import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable, switchMap, timer } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoHttp {
  constructor(private http: HttpClient) {}

  updateTodo(todo: Todo) {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        body: todo.body,
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  deleteTodo(todo: Todo) {
    return this.http.delete<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    );
  }

  fetchTodoList(): Observable<Todo[]> {
    return timer(500).pipe(
      switchMap(() =>
        this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos'),
      ),
    );
  }
}
