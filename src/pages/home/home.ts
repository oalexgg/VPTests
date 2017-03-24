import { Component, ViewChild, ElementRef  } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild('map') mapElement: ElementRef;
	map: any;
	constructor(public navCtrl: NavController) {	 
	}
	 
	ionViewDidLoad(){
		this.loadMap();
	}
	 
	loadMap(){
	 
		let latLng = new google.maps.LatLng(46.43333, 0.86667);
	 
	    let mapOptions = {
	      center: latLng,
	      zoom: 14,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    }
	 	
		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
	}

	

	
	centerOnMe() {
		console.log("holas");
	}
}
