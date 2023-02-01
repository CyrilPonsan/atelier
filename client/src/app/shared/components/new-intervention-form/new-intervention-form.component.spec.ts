import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInterventionFormComponent } from './new-intervention-form.component';

describe('NewInterventionFormComponent', () => {
  let component: NewInterventionFormComponent;
  let fixture: ComponentFixture<NewInterventionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInterventionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInterventionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
