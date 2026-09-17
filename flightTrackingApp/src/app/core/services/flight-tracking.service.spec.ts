import { TestBed } from '@angular/core/testing';

import { FlightTrackingService } from './flight-tracking.service';

describe('FlightTrackingService', () => {
  let service: FlightTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
