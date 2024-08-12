import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse) {
      // Handle HTTP error
      alert(`HTTP Error: ${error.message}`);
    } else {
      // Handle Client Error
      alert(`Client Error: ${error}`);
    }
  }
}
