import { Injectable } from '@angular/core';
import { Flight } from '../interfaces/flightTrackingData';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightTrackingService {

  constructor() { }
  private flights: Flight[] = [

    {
      id: 1,
      flightNumber: 'AI101',
      callsign: 'AIC101',
      aircraftType: 'Boeing 787',
      origin: {
        code: 'DEL',
        name: 'Delhi',
        lat: 28.5562,
        lng: 77.1000
      },
      destination: {
        code: 'BOM',
        name: 'Mumbai',
        lat: 19.0896,
        lng: 72.8656
      },
      status: 'Active',
      departureTime: '10:30',
      arrivalTime: '12:45'
    },

    {
      id: 2,
      flightNumber: '6E202',
      callsign: 'IGO202',
      aircraftType: 'Airbus A320',
      origin: {
        code: 'BLR',
        name: 'Bengaluru',
        lat: 13.1986,
        lng: 77.7066
      },
      destination: {
        code: 'DEL',
        name: 'Delhi',
        lat: 28.5562,
        lng: 77.1000
      },
      status: 'Active',
      departureTime: '11:00',
      arrivalTime: '13:40'
    },

    {
      id: 3,
      flightNumber: 'UK303',
      callsign: 'VTI303',
      aircraftType: 'Airbus A321',
      origin: {
        code: 'BOM',
        name: 'Mumbai',
        lat: 19.0896,
        lng: 72.8656
      },
      destination: {
        code: 'HYD',
        name: 'Hyderabad',
        lat: 17.2403,
        lng: 78.4294
      },
      status: 'Delayed',
      departureTime: '12:15',
      arrivalTime: '13:50'
    },

    {
      id: 4,
      flightNumber: 'AI404',
      callsign: 'AIC404',
      aircraftType: 'Airbus A320',
      origin: {
        code: 'MAA',
        name: 'Chennai',
        lat: 12.9941,
        lng: 80.1709
      },
      destination: {
        code: 'DEL',
        name: 'Delhi',
        lat: 28.5562,
        lng: 77.1000
      },
      status: 'Arrived',
      departureTime: '07:20',
      arrivalTime: '10:05'
    },

    {
      id: 5,
      flightNumber: 'SG505',
      callsign: 'SEJ505',
      aircraftType: 'Boeing 737',
      origin: {
        code: 'CCU',
        name: 'Kolkata',
        lat: 22.6547,
        lng: 88.4467
      },
      destination: {
        code: 'BOM',
        name: 'Mumbai',
        lat: 19.0896,
        lng: 72.8656
      },
      status: 'Active',
      departureTime: '12:30',
      arrivalTime: '15:15'
    },

    {
      id: 6,
      flightNumber: '6E606',
      callsign: 'IGO606',
      aircraftType: 'Airbus A320',
      origin: {
        code: 'HYD',
        name: 'Hyderabad',
        lat: 17.2403,
        lng: 78.4294
      },
      destination: {
        code: 'BLR',
        name: 'Bengaluru',
        lat: 13.1986,
        lng: 77.7066
      },
      status: 'Arrived',
      departureTime: '06:30',
      arrivalTime: '07:40'
    },

    {
      id: 7,
      flightNumber: 'AI707',
      callsign: 'AIC707',
      aircraftType: 'Boeing 777',
      origin: {
        code: 'DEL',
        name: 'Delhi',
        lat: 28.5562,
        lng: 77.1000
      },
      destination: {
        code: 'DXB',
        name: 'Dubai',
        lat: 25.2532,
        lng: 55.3657
      },
      status: 'Active',
      departureTime: '13:00',
      arrivalTime: '15:20'
    },

    {
      id: 8,
      flightNumber: 'UK808',
      callsign: 'VTI808',
      aircraftType: 'Airbus A320',
      origin: {
        code: 'DEL',
        name: 'Delhi',
        lat: 28.5562,
        lng: 77.1000
      },
      destination: {
        code: 'GOI',
        name: 'Goa',
        lat: 15.3800,
        lng: 73.8314
      },
      status: 'Scheduled',
      departureTime: '14:30',
      arrivalTime: '17:00'
    },

    {
      id: 9,
      flightNumber: '6E909',
      callsign: 'IBO909',
      aircraftType: 'Airbus A321',
      origin: {
        code: 'BOM',
        name: 'Mumbai',
        lat: 19.0896,
        lng: 72.8656
      },
      destination: {
        code: 'CCU',
        name: 'Kolkata',
        lat: 22.6547,
        lng: 88.4467
      },
      status: 'Active',
      departureTime: '15:00',
      arrivalTime: '17:40'
    },
    {
      id: 9,
      flightNumber: '6E908',
      callsign: 'IGO909',
      aircraftType: 'Airbus A321',
      origin: {
        code: 'BOM',
        name: 'Mumbai',
        lat: 19.0896,
        lng: 72.8656
      },
      destination: {
        code: 'GOI',
        name: 'Goa',
        lat: 15.3800,
        lng: 73.8314
      },
      status: 'Active',
      departureTime: '15:00',
      arrivalTime: '17:40'
    },

    {
      id: 10,
      flightNumber: 'AI1010',
      callsign: 'AIC1010',
      aircraftType: 'Boeing 787',
      origin: {
        code: 'BLR',
        name: 'Bengaluru',
        lat: 13.1986,
        lng: 77.7066
      },
      destination: {
        code: 'SIN',
        name: 'Singapore',
        lat: 1.3644,
        lng: 103.9915
      },
      status: 'Delayed',
      departureTime: '16:00',
      arrivalTime: '22:10'
    },

    {
      id: 11,
      flightNumber: 'SG111',
      callsign: 'SEJ111',
      aircraftType: 'Boeing 737',
      origin: {
        code: 'HYD',
        name: 'Hyderabad',
        lat: 17.2403,
        lng: 78.4294
      },
      destination: {
        code: 'DEL',
        name: 'Delhi',
        lat: 28.5562,
        lng: 77.1000
      },
      status: 'Scheduled',
      departureTime: '17:15',
      arrivalTime: '19:45'
    },

    {
      id: 12,
      flightNumber: '6E1212',
      callsign: 'IGO1212',
      aircraftType: 'Airbus A320',
      origin: {
        code: 'MAA',
        name: 'Chennai',
        lat: 12.9941,
        lng: 80.1709
      },
      destination: {
        code: 'BOM',
        name: 'Mumbai',
        lat: 19.0896,
        lng: 72.8656
      },
      status: 'Active',
      departureTime: '18:00',
      arrivalTime: '19:45'
    },

    {
      id: 13,
      flightNumber: 'AI1313',
      callsign: 'AIC1313',
      aircraftType: 'Airbus A321',
      origin: {
        code: 'CCU',
        name: 'Kolkata',
        lat: 22.6547,
        lng: 88.4467
      },
      destination: {
        code: 'DEL',
        name: 'Delhi',
        lat: 28.5562,
        lng: 77.1000
      },
      status: 'Arrived',
      departureTime: '08:00',
      arrivalTime: '10:15'
    },

    {
      id: 14,
      flightNumber: 'UK1414',
      callsign: 'VTI1414',
      aircraftType: 'Airbus A320',
      origin: {
        code: 'BOM',
        name: 'Mumbai',
        lat: 19.0896,
        lng: 72.8656
      },
      destination: {
        code: 'DEL',
        name: 'Delhi',
        lat: 28.5562,
        lng: 77.1000
      },
      status: 'Delayed',
      departureTime: '18:30',
      arrivalTime: '20:45'
    },

    {
      id: 15,
      flightNumber: '6E1515',
      callsign: 'IGO1515',
      aircraftType: 'Airbus A320',
      origin: {
        code: 'GOI',
        name: 'Goa',
        lat: 15.3800,
        lng: 73.8314
      },
      destination: {
        code: 'BLR',
        name: 'Bengaluru',
        lat: 13.1986,
        lng: 77.7066
      },
      status: 'Active',
      departureTime: '19:00',
      arrivalTime: '20:15'
    },

    {
      id: 16,
      flightNumber: 'AI1616',
      callsign: 'AIC1616',
      aircraftType: 'Boeing 787',
      origin: {
        code: 'DEL',
        name: 'Delhi',
        lat: 28.5562,
        lng: 77.1000
      },
      destination: {
        code: 'LHR',
        name: 'London',
        lat: 51.4700,
        lng: -0.4543
      },
      status: 'Active',
      departureTime: '20:00',
      arrivalTime: '06:30'
    },

    {
      id: 17,
      flightNumber: 'SG1717',
      callsign: 'SEJ1717',
      aircraftType: 'Boeing 737',
      origin: {
        code: 'BOM',
        name: 'Mumbai',
        lat: 19.0896,
        lng: 72.8656
      },
      destination: {
        code: 'BLR',
        name: 'Bengaluru',
        lat: 13.1986,
        lng: 77.7066
      },
      status: 'Scheduled',
      departureTime: '20:30',
      arrivalTime: '22:00'
    },

    {
      id: 18,
      flightNumber: '6E1818',
      callsign: 'IGO1818',
      aircraftType: 'Airbus A321',
      origin: {
        code: 'DEL',
        name: 'Delhi',
        lat: 28.5562,
        lng: 77.1000
      },
      destination: {
        code: 'MAA',
        name: 'Chennai',
        lat: 12.9941,
        lng: 80.1709
      },
      status: 'Arrived',
      departureTime: '05:00',
      arrivalTime: '07:45'
    },

    {
      id: 19,
      flightNumber: 'AI1919',
      callsign: 'AIC1919',
      aircraftType: 'Boeing 777',
      origin: {
        code: 'BOM',
        name: 'Mumbai',
        lat: 19.0896,
        lng: 72.8656
      },
      destination: {
        code: 'JFK',
        name: 'New York',
        lat: 40.6413,
        lng: -73.7781
      },
      status: 'Active',
      departureTime: '21:00',
      arrivalTime: '07:00'
    },

    {
      id: 20,
      flightNumber: 'UK2020',
      callsign: 'VTI2020',
      aircraftType: 'Airbus A320',
      origin: {
        code: 'BLR',
        name: 'Bengaluru',
        lat: 13.1986,
        lng: 77.7066
      },
      destination: {
        code: 'BOM',
        name: 'Mumbai',
        lat: 19.0896,
        lng: 72.8656
      },
      status: 'Delayed',
      departureTime: '21:30',
      arrivalTime: '23:15'
    }
  ];

  private flightsSubject = new BehaviorSubject<Flight[]>(this.flights);
  flights$: Observable<Flight[]> =
    this.flightsSubject.asObservable();
  getFlights(): Observable<Flight[]> {
    return this.flights$;
  }


}
