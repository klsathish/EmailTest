import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailmainComponent } from './emailmain.component';

describe('EmailmainComponent', () => {
  let component: EmailmainComponent;
  let fixture: ComponentFixture<EmailmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
