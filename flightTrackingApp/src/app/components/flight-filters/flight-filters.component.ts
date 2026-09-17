import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight, FlightStatus } from '../../core/interfaces/flightTrackingData';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FlightTrackingService } from '../../core/services/flight-tracking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-filters',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './flight-filters.component.html',
  styleUrl: './flight-filters.component.scss'
})
export class FlightFiltersComponent {
   @Input() set flightsData(value:Flight[]){
    if(value){
      this.flights=value;
      console.log(this.flights,"1323456");
      
    }
  }
   filterFlightsForm!: FormGroup;
  flights: Flight[] = [];
  filteredFlights: Flight[] = [];
  statuses: FlightStatus[] = [
    'Active',
    'Delayed',
    'Arrived',
    'Scheduled'
  ];
  private destroy$ = new Subject<void>();
  constructor(
    private flightService: FlightTrackingService,
    private fb: FormBuilder
  ) { }

  @Output() searchData = new EventEmitter<any>();
  ngOnInit() {
    this.createFilterForm();
    this.filterFlightsForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {

        this.applyFilters();
      });
  }

  createFilterForm(): void {

    this.filterFlightsForm = this.fb.group({

      search: [''],

      status: ['All'],

      origin: ['All'],

      destination: ['All']

    });
  }

  get airports(): string[] {
    const codes = this.flights.flatMap(flight => [
      flight.origin.code,
      flight.destination.code
    ]);
    return [...new Set(codes)].sort();
  }

  clearFilters(): void {

    this.filterFlightsForm.reset({
      search: '',
      status: 'All',
      origin: 'All',
      destination: 'All'
    });
  }
  applyFilters() {
    this.searchData.emit(this.filterFlightsForm.value)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
