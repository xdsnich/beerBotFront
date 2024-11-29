import { Injectable } from '@angular/core';
declare var google: any;
@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  private apiLoaded = false;

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.apiLoaded) {
        resolve(google);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB7qE03gM2MNtwe3zyfVlXjxWR8uxFuMNw`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.apiLoaded = true;
        resolve(google);
      };

      script.onerror = (error) => {
        console.error('Error loading Google Maps API:', error);
        reject(error);
      };

      document.head.appendChild(script);
    });
  }
}
