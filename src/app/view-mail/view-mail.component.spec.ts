import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMailComponent } from './view-mail.component';

describe('ViewMailComponent', () => {
  let component: ViewMailComponent;
  let fixture: ComponentFixture<ViewMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
