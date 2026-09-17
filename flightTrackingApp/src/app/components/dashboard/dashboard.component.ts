import { Component, Input } from '@angular/core';
import { Flight } from '../../core/interfaces/flightTrackingData';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
  @Input() set flightsData(value:Flight[]){
    if(value){
      this.flights=value;
    }
  }
  flights: Flight[] = [];
  get totalFlights(): number {
    return this.flights.length;
  }

  get activeFlights(): number {

    return this.flights.filter(
      flight => flight.status === 'Active'
    ).length;
  }

  get delayedFlights(): number {

    return this.flights.filter(
      flight => flight.status === 'Delayed'
    ).length;
  }

  get arrivedFlights(): number {

    return this.flights.filter(
      flight => flight.status === 'Arrived'
    ).length;
  }
}
