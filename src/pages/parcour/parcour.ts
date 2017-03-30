import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
declare var google: any;
/*
  Generated class for the Parcour page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-parcour',
  templateUrl: 'parcour.html'
})
export class ParcourPage {
	@ViewChild('mapParcour') el:ElementRef;

	lat: number = 46.42493120988299;
  	lng: number = 0.867619514465332;
  	zoom: number = 15;

  constructor(public navCtrl: NavController, public navParams: NavParams) { 
  	   }

  ionViewDidLoad() {
  	console.log(this.el);
  	this.getDirections();
  }
// instantiate google map objects for directions
  directionsDisplay: any = new google.maps.DirectionsRenderer();
  directionsService: any = new google.maps.DirectionsService();
  geocoder: any = new google.maps.Geocoder();
  
  // directions object -- with defaults
  directions: any = {
    origin: "3 Place Saint-Martial, 86500 Montmorillon, France",
    destination: "15A Rue François de Vaux de Foletier, 17000 La Rochelle, France"
  }
  
  // get directions using google maps api
  getDirections = function () {
    let request:any = {
      origin: this.directions.origin,
      destination: this.directions.destination,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    this.directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        this.directionsDisplay.setMap(this.el._mapsWrapper._map.__zone_symbol__value);
        } else {
        console.log('Google route unsuccesfull!');
      }
    });
  }

}
