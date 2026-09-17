import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsMapComponent } from './flights-map.component';

describe('FlightsMapComponent', () => {
  let component: FlightsMapComponent;
  let fixture: ComponentFixture<FlightsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
