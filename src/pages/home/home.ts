import { Component, ViewChild, ElementRef  } from '@angular/core';

import { Parcours } from '../../providers/parcours'


import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild('map') mapElement: ElementRef;
	map: any;
	parcoursM: any;
	constructor(public navCtrl: NavController, public parcourService: Parcours) {	 
	}
	 
	ionViewDidLoad(){
		this.loadMap();
		this.listeParcours();
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

	listeParcours(){
		console.log(this.parcourService.getJSON());
		this.parcourService.getJSON()
		.subscribe(
			data => {
				this.parcoursM = data.result
				console.log("1" + this.parcoursM);
			});

		console.log("2" + this.parcoursM);

	}
	

	
	centerOnMe() {
		console.log("holas");
	}
}
