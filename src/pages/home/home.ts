import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Parcours } from "../../services/model";
import { ParcourService } from "../../services/parcours-service";
import { PointsInteretPage } from '../points-interet/points-interet';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
	parcoursM: Array<Parcours>;
	parcours: Array<any>;
	selection: number;

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
                	for (let i of this.parcours) {
                		this.parcoursM = i;
                	}
                	for (let i of this.parcoursM) {
						for (let j = 0; j<Object.keys(i.pi).length; j++) {
							new google.maps.Marker({
					    		position: {lat: Number(i.pi[j].longitude_latitude["lat"]), lng:Number(i.pi[j].longitude_latitude["lon"])},
					    		map: this.map,
					    		title: i.title
					 		 });
						}
					}
                },
                (err: any) => console.error(err)
            );
    }
	 
	loadMap(){
	 
		let latLng = new google.maps.LatLng(46.42493120988299, 0.867619514465332);
	 
	    let mapOptions = {
	      center: latLng,
	      zoom: 15,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    }
	 	
		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
	}
	
	centerOnMe() {

		console.log("button center on me");
	}

	voirListePI(i: number) {
		this.navCtrl.push(PointsInteretPage, {
    		pointsInteret: this.parcoursM[i].pi,
    		images: this.parcoursM[i].image,
    		description: this.parcoursM[i].description_parcours
    		});
		}

}
