import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightOperationsComponent } from './flight-operations.component';

describe('FlightOperationsComponent', () => {
  let component: FlightOperationsComponent;
  let fixture: ComponentFixture<FlightOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
