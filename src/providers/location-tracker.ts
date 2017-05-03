import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Http } from '@angular/http'

@Injectable()
export class LocationTracker {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  private dist = 0;
  constructor(
    public zone: NgZone,
     private geolocation: Geolocation,
      private backgroundGeolocation: BackgroundGeolocation,
       private localNotifications: LocalNotifications,
         private http: Http) {
           localNotifications.clearAll();

  }

  startTracking() {
    // Background Tracking

     let config = {
       desiredAccuracy: 0,
       stationaryRadius: 20,
       distanceFilter: 10,
       debug: false,
       interval: 2000
     };

     this.backgroundGeolocation.configure(config).subscribe((location) => {

      //console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
      //console.log(this.getDistanceFromLatLonInKm(location.latitude, location.longitude, 46.142462, -1.152266));
      //if validando
      this.calcDistance(location.latitude, location.longitude);
      console.log(this.dist);
      if(this.dist > 0 && this.dist  <= 2000) {
        this.localNotifications.schedule({
           id: 1,
           text: 'cerca'
         });
         this.localNotifications.clearAll();
      }
       // Run update inside of Angular's zone
       this.zone.run(() => {
         this.lat = location.latitude;
         this.lng = location.longitude;
       });

     }, (err) => {

       console.log(err);

     });

     // Turn ON the background-geolocation system.
     this.backgroundGeolocation.start();


     // Foreground Tracking

   let options = {
     frequency: 3000,
     enableHighAccuracy: false
   };

   this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

     //console.log(position);
     this.calcDistance(position.coords.latitude, position.coords.longitude);
    // console.log(this.dist);
     if(this.dist != 0 && this.dist <= 2000 ) {
       this.localNotifications.schedule({
          id: 2,
          text: 'cerca del punto'
        });
        this.localNotifications.clearAll();
     }
     // Run update inside of Angular's zone
     this.zone.run(() => {
       this.lat = position.coords.latitude;
       this.lng = position.coords.longitude;
     });

   });

  }

  stopTracking() {
    console.log('stopTracking');

     this.backgroundGeolocation.finish();
     this.watch.unsubscribe();

  }

  calcDistance(latitude, longitude) {
     this.http
      .get("https://maps.googleapis.com/maps/api/directions/json?origin="+ latitude + ',' + longitude + "&destination=46.142462,-1.152266" )
      .subscribe((data) => {
         this.dist = data.json().routes[0].legs[0].distance.value;
      });
  }

}
