import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PI } from "../../services/model";
import { DirectionsRenderer } from '@ngui/map';
import {  FabContainer } from 'ionic-angular';

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
export class ParcourPage implements OnInit {
   @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;

  directionsRenderer: google.maps.DirectionsRenderer;
  directionsResult: google.maps.DirectionsResult;
  direction:any = [];
	lat: number = 46.42493120988299;
  lng: number = 0.867619514465332;
  zoom: number = 15;
  parcours: Array<PI>;
  travelMode: string = "DRIVING";

  wayPoints: any = [
          {location: {lat:44.32384807250689, lng: -78.079833984375}},
          {location: {lat:44.55916341529184, lng: -76.17919921875}},
        ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  		this.parcours = this.navParams.get("parcours"); 
  	   }

  ngOnInit() {
    this.getDirections();
    this.directionsRendererDirective['initialized$'].subscribe( directionsRenderer => {
      this.directionsRenderer = directionsRenderer;
    });

  }

  ionViewDidLoad() {
  }    
  //get directions using google maps api
  getDirections () {
  	this.wayPoints = [];
	  for (var i = 1; i < this.parcours.length-1; i++) {
	  	
	      this.wayPoints.push({
	        location: {
            lat: Number(this.parcours[i].longitude_latitude["lat"]),
	        	lng: Number(this.parcours[i].longitude_latitude["lon"])
	        },
	        stopover: true
	      });
	  }
	  let last = this.parcours.length-1; 
	  let startLat = Number(this.parcours[0].longitude_latitude["lat"]);
	  let startLng = Number(this.parcours[0].longitude_latitude["lon"]);
	  let destLat = Number(this.parcours[last].longitude_latitude["lat"]);
	  let destLng = Number(this.parcours[last].longitude_latitude["lon"]);

    this.direction = {
      origin: {
        lat: startLat,
	      lng: startLng
	    },
	    destination: {
        lat: destLat ,
	      lng: destLng 
	    },
      waypoints: this.wayPoints,
      optimizeWaypoints: true,
      travelMode: this.travelMode 
    };
  }

  changeTravelMode(TM, fab: FabContainer) {
    fab.close();
    this.travelMode = TM;
    this.getDirections();
  }
}
