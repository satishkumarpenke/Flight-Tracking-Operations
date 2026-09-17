import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Flight } from '../../core/interfaces/flightTrackingData';
import { Subject, takeUntil } from 'rxjs';
import { FlightTrackingService } from '../../core/services/flight-tracking.service';
import { FlightFiltersComponent } from '../flight-filters/flight-filters.component';
import { FlightsMapComponent } from '../flights-map/flights-map.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-operations',
  imports: [DashboardComponent,FlightFiltersComponent,FlightsMapComponent],
  templateUrl: './flight-operations.component.html',
  styleUrl: './flight-operations.component.scss'
})
export class FlightOperationsComponent {
  @Input() flightsData!:Flight[];
  flights: Flight[] = [];
  filteredFlights: Flight[] = [];
  private destroy$ = new Subject<void>();
  constructor(private flightService:FlightTrackingService){

  }
  ngOnInit(): void {
    this.flightService.flights$
      .pipe(takeUntil(this.destroy$))
      .subscribe(flights => {
        this.flights = flights;
        this.filteredFlights = flights;
        this.flightsData=this.flights;
      });
  }
  searchData:any;
   getSearchData(data:[]){
    this.searchData = data;
    console.log(data,"44544544545")
    //this.applyFilters();
  }
 //here pipe(takeUntil(this.destroy$)) used unsubscribe the data stream when unlod this page using ngOnDestroy()
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
