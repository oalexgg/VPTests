import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Http } from '@angular/http';
import { PiService } from "../providers/pi-service";

@Injectable()
export class LocationTracker {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  private dist: number = 0;
  public id: number = 0;
  private PIS: Array<any>;
  constructor(
    public zone: NgZone,
     private geolocation: Geolocation,
      private backgroundGeolocation: BackgroundGeolocation,
       private localNotifications: LocalNotifications,
         private http: Http,
          private piService: PiService) {
           localNotifications.clearAll();
           this.piService.getPis()
               .then(pis => {
                   	Object.keys(pis).map(k => { return pis[k] })
                    .forEach((i) => {
                       for (let j of i) {
                         if(j instanceof Object){
                           this.PIS.push(j);
                         }
                         else {
                           break;
                         }
                       }
                     });
                   },
                   (err: any) => console.error(err)
               );

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

      //if validando
      this.PIS.forEach((value) => {
        this.calcDistance(location.latitude, location.longitude, value["longitude_latitude"].latitude, value["longitude_latitude"].longitude);
        console.log(this.dist);
        if(this.dist > 0 && this.dist  <= 200) {
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
      });


     // Turn ON the background-geolocation system.
     this.backgroundGeolocation.start();


     // Foreground Tracking

   let options = {
     frequency: 3000,
     enableHighAccuracy: false
   };

   this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

     this.PIS.forEach((value) => {
     //console.log(position);
     this.calcDistance(position.coords.latitude, position.coords.longitude, value["longitude_latitude"].latitude, value["longitude_latitude"].longitude);
    // console.log(this.dist);
     if(this.dist != 0 && this.dist <= 200 ) {
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
 });

  }

  stopTracking() {
    console.log('stopTracking');

     this.backgroundGeolocation.finish();
     this.watch.unsubscribe();

  }

  calcDistance(latitude, longitude, latitude2, longitude2) {
     this.http
      .get("https://maps.googleapis.com/maps/api/directions/json?origin="+ latitude + ',' + longitude + "&destination="+latitude2+","+longitude2 )
      .subscribe((data) => {
         this.dist = data.json().routes[0].legs[0].distance.value;
      });
  }

}
