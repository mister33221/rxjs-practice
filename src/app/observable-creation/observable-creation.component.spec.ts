import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableCreationComponent } from './observable-creation.component';

describe('ObservableCreationComponent', () => {
  let component: ObservableCreationComponent;
  let fixture: ComponentFixture<ObservableCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservableCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservableCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
