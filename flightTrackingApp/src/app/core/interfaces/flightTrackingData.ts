export type FlightStatus =
  | 'Active'
  | 'Delayed'
  | 'Arrived'
  | 'Scheduled';

export interface Airport {
  code: string;
  name: string;
  lat: number;
  lng: number;
}

export interface Flight {
  id: number;

  flightNumber: string;
  callsign: string;

  aircraftType: string;

  origin: Airport;
  destination: Airport;

  status: FlightStatus;

  departureTime: string;
  arrivalTime: string;
}