import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PI } from "../../providers/model";
import { DetailPiPage } from "../detail-pi/detail-pi";

import { DirectionsRenderer } from '@ngui/map';
import {  FabContainer } from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

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
  distance: any = 0;
  travelTime: any = 0;
  wayPoints: any = [
          {location: {lat:44.32384807250689, lng: -78.079833984375}},
          {location: {lat:44.55916341529184, lng: -76.17919921875}},
        ];


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
      public translate: TranslateService,
       private zone: NgZone) {
  		this.parcours = this.navParams.get("parcours"); 
  	   }

  ngOnInit() {
    this.getDirections();
    this.directionsRendererDirective['initialized$'].subscribe( directionsRenderer => {
      this.directionsRenderer = directionsRenderer;
    });
    setTimeout(() => {
       this.calcTimeDistance();
     }, 2500);
  }

  ionViewDidLoad() {
  }    

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
    setTimeout(() => {
       this.calcTimeDistance();
     }, 200);
  }


  voirPI(id) {
    this.navCtrl.push(DetailPiPage,{
      piId: id
    });
  }

  calcTimeDistance () {
    this.distance = 0;
    this.travelTime = 0;
    this.directionsRenderer.getDirections().routes.forEach( r => {
         r.legs.forEach(l => {
           this.distance = Number(this.distance) + Number(l.distance.value);
           this.travelTime = this.travelTime + l.duration.value;
         });
       });
       var hours = Math.floor( this.travelTime / 3600 );  
       var minutes: any = Math.floor( (this.travelTime % 3600) / 60 );
       minutes = minutes < 10 ? '0' + minutes : minutes;         
       this.travelTime = hours + " heures " + minutes;
       this.distance = this.distance/1000;
       this.distance = (Math.round(this.distance * 10)/10)+" ";
  }
}
