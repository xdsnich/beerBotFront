import { Component, AfterViewInit } from '@angular/core';
import { GoogleMapsService } from '../../services/googleApiservice';
import { LocationService } from '../../services/ShareLocation';
import { HttpClient, HttpClientModule } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  map: any; // Google Map
  userMarker: any; // Marker for user's location
  nearestPubs: any[] = []; // Nearest pubs

  constructor(
    private googleMapsService: GoogleMapsService,
    private locationService: LocationService,
    private http: HttpClient
  ) {}

  ngAfterViewInit(): void {
    // Load Google Maps API
    this.googleMapsService
      .load()
      .then(() => {
        this.initMap();
      })
      .catch((error) => {
        console.error('Error loading Google Maps API:', error);
      });
  }

  // Initialize map
  initMap(): void {
    const defaultLocation = { lat: 49.8397, lng: 24.0297 }; // Default map center

    this.map = new google.maps.Map(
      document.querySelector('.map') as HTMLElement,
      {
        zoom: 12,
        center: defaultLocation,
      }
    );

    console.log('Google Map initialized.');
  }

  // Share user's location
  shareLocation(): void {
    this.locationService
      .getCurrentLocation()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        console.log(
          `User location: Latitude: ${latitude}, Longitude: ${longitude}`
        );

        // Add marker and recenter map
        this.addUserMarker(latitude, longitude);

        // Send location to server
        this.sendToServer({ latitude, longitude });
      })
      .catch((error) => {
        console.error('Error getting location:', error);
      });
  }

  // Send user's location to server
  sendToServer(location: { latitude: number; longitude: number }): void {
    this.http
      .post('http://localhost:5173/api/location/nearest-pubs', location)
      .subscribe(
        (response: any) => {
          console.log('Nearest pubs received from server:', response);
          this.nearestPubs = response;
          this.addPubsToMap();
        },
        (error) => {
          console.error('Error sending location to server:', error);
        }
      );
  }

  // Add user's marker
  addUserMarker(lat: number, lng: number): void {
    if (!this.map) {
      console.error('Map is not initialized.');
      return;
    }

    // Remove previous marker if exists
    if (this.userMarker) {
      this.userMarker.setMap(null);
    }

    // Add new marker
    this.userMarker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: 'Your location',
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    });

    console.log(`User marker added at (${lat}, ${lng}).`);

    // Recenter map
    this.map.setCenter({ lat, lng });
  }

  // Add markers for nearest pubs
  addPubsToMap(): void {
    const bounds = new google.maps.LatLngBounds();

    this.nearestPubs.forEach((pub) => {
      console.log(
        `Adding pub marker: ${pub.name} at (${pub.latitude}, ${pub.longitude})`
      );

      const marker = new google.maps.Marker({
        position: { lat: pub.latitude, lng: pub.longitude },
        map: this.map,
        title: pub.name,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${pub.name}</h3><p>Distance: ${pub.distance.toFixed(
          2
        )} km</p>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      bounds.extend(new google.maps.LatLng(pub.latitude, pub.longitude));
    });

    console.log('Fitting map bounds.');
    this.map.fitBounds(bounds);
  }
}
