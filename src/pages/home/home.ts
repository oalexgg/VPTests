import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Parcours } from "../../services/model";
import { ParcourService } from "../../services/parcours-service";

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
	parcoursM: Array<Parcours>;
	parcours: Array<any>;
	@ViewChild('map') mapElement: ElementRef;
	map: any;
	constructor(public navCtrl: NavController, public parcourService: ParcourService) {	 
	}
	 
	 ngOnInit() {

		this.loadMap();
		this.parcoursM = [];
        this.parcourService.getParcours()
            .subscribe(
                parcoursM=> {
                	this.parcours = Object.keys(parcoursM).map(k => { return parcoursM[k] });
                	for (var i of this.parcours) {
                		this.parcoursM = i;
                	}
                },
                (err: any) => console.error(err)
            );
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
