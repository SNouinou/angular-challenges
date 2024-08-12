import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './services/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
