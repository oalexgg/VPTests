import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PI } from "../../services/model";
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

// instantiate google map objects for directions
  directionsDisplay: any = new google.maps.DirectionsRenderer();
  directionsService: any = new google.maps.DirectionsService();
  geocoder: any = new google.maps.Geocoder();

  parcours: Array<PI>;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  		this.parcours = this.navParams.get("parcours"); 
  	   }

  ionViewDidLoad() {
  	this.directionsService = new google.maps.DirectionsService;
	this.directionsDisplay = new google.maps.DirectionsRenderer;
	//this.calculateAndDisplayRoute();
  	this.getDirections();

  }  
  // directions object -- with defaults
  directions: any = {
    origin: "3 Place Saint-Martial, 86500 Montmorillon, France",
    destination: "15A Rue François de Vaux de Foletier, 17000 La Rochelle, France"
  }
  
  //get directions using google maps api
  getDirections = function () {
  	var waypts = [];
	  console.log(this.el);
	  for (var i = 0; i < this.parcours.length; i++) {
	  	
	      waypts.push({
	        location: {lat: this.parcours[i].longitude_latitude.lat,
	        			lng: this.parcours[i].longitude_latitude.lon
	        },
	        stopover: true
	      });
	  }
	  let last = this.parcours.length-1; 
	  let startLat = this.parcours[0].longitude_latitude.lat;
	  let startLng = this.parcours[0].longitude_latitude.lon;
	  let destLat = this.parcours[last].longitude_latitude.lat;
	  let destLng = this.parcours[last].longitude_latitude.lon;

    let request:any = {
       origin: {lat: startLat,
	        	lng: startLng
	        },
	    destination: {lat: destLat ,
	        		  lng: destLng 
	        },
	    waypoints: waypts,
	    optimizeWaypoints: true,
	    travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        this.directionsDisplay.setMap(this.el._mapsWrapper._map.__zone_symbol__value);
        } else {
        console.log('Google route unsuccesfull!');
      }
      console.log(this.el);
    });
  }
}
