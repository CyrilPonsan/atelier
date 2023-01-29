import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsHomeComponent } from './tickets-home.component';

describe('TicketsHomeComponent', () => {
  let component: TicketsHomeComponent;
  let fixture: ComponentFixture<TicketsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
