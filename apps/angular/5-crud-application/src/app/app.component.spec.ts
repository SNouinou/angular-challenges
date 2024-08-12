import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { map, of, timer } from 'rxjs';
import { AppComponent } from './app.component';

describe('TodoListComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should not showing "loading..." when there is empty response', () => {
    component.todos$ = of([]); // Simulate the todos$ empty response = []
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('#loading'));
    expect(loadingElement).toBeFalsy();
  });

  it('should show "loading..." when there is no response yet', () => {
    component.todos$ = of(null); // Simulate the todos$ initial state = null
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('#loading'));
    expect(loadingElement).toBeTruthy();

    const loadingText = loadingElement.nativeElement.textContent;
    expect(loadingText).toContain('...loading');
  });

  it('should fetch data on start up', () => {
    component.ngOnInit();
    timer(600).pipe(
      map(() => {
        const req = httpTestingController.expectOne(
          'https://jsonplaceholder.typicode.com/todos',
        );
        expect(req.request.method).toEqual('GET');
      }),
    );
  });
});
