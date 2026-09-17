import { Component, Input } from '@angular/core';
import { Flight, FlightStatus } from '../../core/interfaces/flightTrackingData';
import * as L from 'leaflet';
import { Subject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flights-map',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './flights-map.component.html',
  styleUrl: './flights-map.component.scss'
})
export class FlightsMapComponent {
  flights: Flight[] = [];
  @Input() set flightsData(value: Flight[]) {
    if (value) {
      this.flights = value;
       this.filteredFlights = value;
      console.log(this.flights, "flights");
        if (this.map) {
      this.updateMap();
    }
    }
  }
  searchData: any;
  @Input() set flightsSearchData(value: Flight[]) {
    if (value) {
      this.searchData = value;
      this.applyFilters();
      console.log(this.searchData, "searchData");
    }
  }
  selectedFlight: Flight | null | any;
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private routeLine?: L.Polyline;
  private destroy$ = new Subject<void>();
  filteredFlights: Flight[] = [];
  animatedFlightMarkers: L.Marker[] = [];
  flightAnimationIntervals: any[] = [];
  private selectedRouteMarkers: L.CircleMarker[] = [];
  ngAfterViewInit(): void {
    this.initializeMap();
  }
  initializeMap(): void {
    this.map = L.map('flight-map', {
      center: [20.5937, 78.9629],
      zoom: 5
    });
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenStreetMap contributors'
      }
    ).addTo(this.map);
    this.updateMap();
  }

  applyFilters(): void {

    const {
      search,
      status,
      origin,
      destination
    } =  this.searchData || {};

    const searchText =
      (search || '').toLowerCase().trim();

    this.filteredFlights = this.flights.filter(flight => {

      const matchesSearch =
        !searchText ||
        flight.callsign
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        status === 'All' ||
        flight.status === status;

      const matchesOrigin =
        origin === 'All' ||
        flight.origin.code === origin;

      const matchesDestination =
        destination === 'All' ||
        flight.destination.code === destination;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesOrigin &&
        matchesDestination
      );
    });
    if (this.filteredFlights.length == 1) {
      this.selectedFlight = this.filteredFlights[0];
    } else {
      this.selectedFlight = null;
    }
    if (this.selectedFlight) {
      this.selectFlight(this.selectedFlight);
    } else {
      this.selectedRouteMarkers.forEach(marker => {
        marker.remove();
      });
    }
    this.updateMap();
  }
  selectFlight(flight: Flight): void | any {
    this.selectedFlight = flight;
    // Remove previous highlighted route
    if (this.routeLine) {
      this.routeLine.remove();
      this.routeLine = undefined;
    }
    // Remove previous selected origin/destination markers
    this.selectedRouteMarkers.forEach(marker => {
      marker.remove();
    });
    this.selectedRouteMarkers = [];
    const origin: L.LatLngExpression = [
      flight.origin.lat,
      flight.origin.lng
    ];
    const destination: L.LatLngExpression = [
      flight.destination.lat,
      flight.destination.lng
    ];
    // --------------------------------
    // Highlight selected flight route
    // --------------------------------

    this.routeLine = L.polyline(
      [origin, destination],
      {
        color: '#2563eb',
        weight: 6,
        opacity: 1,
        dashArray: '10, 6'
      }
    ).addTo(this.map);


    // --------------------------------
    // Green Origin Marker
    // --------------------------------

    const originMarker = L.circleMarker(
      origin,
      {
        radius: 8,
        color: '#15803d',
        fillColor: '#22c55e',
        fillOpacity: 1,
        weight: 3
      }
    ).addTo(this.map);

    originMarker.bindTooltip(
      `${flight.origin.code} - Origin`,
      {
        direction: 'top'
      }
    );


    // --------------------------------
    // Green Destination Marker
    // --------------------------------

    const destinationMarker = L.circleMarker(
      destination,
      {
        radius: 8,
        color: '#15803d',
        fillColor: '#22c55e',
        fillOpacity: 1,
        weight: 3
      }
    ).addTo(this.map);

    destinationMarker.bindTooltip(
      `${flight.destination.code} - Destination`,
      {
        direction: 'top'
      }
    );


    // Store selected markers
    this.selectedRouteMarkers.push(
      originMarker,
      destinationMarker
    );


    // --------------------------------
    // Center map on selected flight
    // --------------------------------

    this.map.fitBounds(
      this.routeLine.getBounds(),
      {
        padding: [70, 70],
        maxZoom: 7
      }
    );
  }
  getRouteColor(status: FlightStatus): string {

    switch (status) {

      case 'Active':
        return '#2563eb';

      case 'Delayed':
        return '#f59e0b';

      case 'Arrived':
        return '#16a34a';

      case 'Scheduled':
        return '#64748b';

      default:
        return '#2563eb';
    }
  }
  getStatusClass(status: string): string {

    return status.toLowerCase();
  }

  private routeLines: L.Polyline[] = [];
  private routeDots: L.CircleMarker[] = [];
  updateMap(): void {

    if (!this.map) {
      return;
    }

    // Remove existing flight markers
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    // Remove existing route lines
    this.routeLines.forEach(line => line.remove());
    this.routeLines = [];

    // Remove existing route dots
    this.routeDots.forEach(dot => dot.remove());
    this.routeDots = [];

    // Remove animated flight markers
    this.animatedFlightMarkers.forEach(marker => marker.remove());
    this.animatedFlightMarkers = [];

    // Clear previous animations
    this.flightAnimationIntervals.forEach(interval => {
      clearInterval(interval);
    });

    this.flightAnimationIntervals = [];

    // Remove selected route
    if (this.routeLine) {
      this.routeLine.remove();
      this.routeLine = undefined;
    }

    this.filteredFlights.forEach(flight => {

      const origin: L.LatLngExpression = [
        flight.origin.lat,
        flight.origin.lng
      ];

      const destination: L.LatLngExpression = [
        flight.destination.lat,
        flight.destination.lng
      ];

      const routeColor = this.getRouteColor(flight.status);

      // --------------------------------
      // Origin marker
      // --------------------------------

      const marker = L.marker(origin);

      marker.bindPopup(`
      <div class="popup">
        <strong>${flight.flightNumber}</strong>
        <br>
        Callsign: ${flight.callsign}
        <br>
        Route:
        ${flight.origin.code}
        →
        ${flight.destination.code}
        <br>
        Status: ${flight.status}
      </div>
    `);

      marker.on('click', () => {
        this.selectFlight(flight);
      });

      marker.addTo(this.map);

      this.markers.push(marker);

      // --------------------------------
      // Route line
      // --------------------------------

      const route = L.polyline(
        [origin, destination],
        {
          color: routeColor,
          weight: 2,
          opacity: 0.55,
          dashArray: '5, 8'
        }
      ).addTo(this.map);

      this.routeLines.push(route);

      // --------------------------------
      // Route dots
      // --------------------------------

      const numberOfDots = 8;

      for (let i = 1; i < numberOfDots; i++) {

        const lat =
          flight.origin.lat +
          (flight.destination.lat - flight.origin.lat)
          * (i / numberOfDots);

        const lng =
          flight.origin.lng +
          (flight.destination.lng - flight.origin.lng)
          * (i / numberOfDots);

        const dot = L.circleMarker(
          [lat, lng],
          {
            radius: 2,
            color: routeColor,
            fillColor: routeColor,
            fillOpacity: 0.8,
            weight: 0
          }
        ).addTo(this.map);

        this.routeDots.push(dot);
      }

      // --------------------------------
      // Animated Flight
      // --------------------------------

      this.animateFlight(
        flight,
        origin,
        destination,
        routeColor
      );

    });
  }


  animateFlight(
  flight: Flight,
  origin: L.LatLngExpression,
  destination: L.LatLngExpression,
  color: string
): void {

  if (!this.map) {
    return;
  }

  const [originLat, originLng] = origin as L.LatLngTuple;
  const [destinationLat, destinationLng] =
    destination as L.LatLngTuple;

  // Calculate direction from origin -> destination
  const angle =
    Math.atan2(
      destinationLng - originLng,
      destinationLat - originLat
    ) * 180 / Math.PI;

  // Plane icon
  const flightIcon = L.divIcon({
    className: 'animated-flight-icon',

    html: `
      <div
        class="flight-wrapper"
        style="
          --flight-color: ${color};
          transform: rotate(${angle}deg);
        "
      >
        <div class="flight-glow"></div>
        <div class="flight-symbol">✈</div>
      </div>
    `,

    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  // Create plane at origin
  const flightMarker = L.marker(
    [originLat, originLng],
    {
      icon: flightIcon,
      zIndexOffset: 1000,
      interactive: true
    }
  ).addTo(this.map);

  flightMarker.bindPopup(`
    <div class="popup">
      <strong>${flight.flightNumber}</strong>
      <br>
      ${flight.origin.code} → ${flight.destination.code}
      <br>
      Status: ${flight.status}
    </div>
  `);

  flightMarker.on('click', () => {
    this.selectFlight(flight);
  });

  this.animatedFlightMarkers.push(flightMarker);

  // Animation progress
  let progress = 0;

  // Increase this for faster movement
  const speed = 0.002;

  const interval = setInterval(() => {

    progress += speed;

    // Restart from origin when destination reached
    if (progress >= 1) {
      progress = 0;
    }

    // Calculate current position
    const lat =
      originLat +
      (destinationLat - originLat) * progress;

    const lng =
      originLng +
      (destinationLng - originLng) * progress;

    // Move plane
    flightMarker.setLatLng([lat, lng]);

  }, 30);

  this.flightAnimationIntervals.push(interval);
}

}
