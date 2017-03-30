import { Component, OnInit } from '@angular/core';

import { NavController, AlertController  } from 'ionic-angular';
import { Parcours } from "../../services/model";
import { ParcourService } from "../../services/parcours-service";
import { PointsInteretPage } from '../points-interet/points-interet';
import { DetailPiPage } from "../detail-pi/detail-pi";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
	parcoursM: Array<Parcours>;
	parcours: Array<any>;
	selection: number;
	lat: number = 46.42493120988299;
  	lng: number = 0.867619514465332;
  	positions: Array<any>;
  	zoom: number = 15;
  	markers: marker[] = [{
  					  lat: 46.1428292,
				      lng: -1.1520256,
				      draggable : false
  	}];
  	visible: boolean = false;

	constructor(public navCtrl: NavController, public parcourService: ParcourService, private alertCtrl: AlertController) {	 
	}
	 
	 ngOnInit() {
		this.parcoursM = [];
		this.positions = [];
        this.parcourService.getParcours()
            .subscribe(
                parcoursM=> {
                	this.parcours = Object.keys(parcoursM).map(k => { return parcoursM[k] });
                	for (let i of this.parcours) {
                		this.parcoursM = i;
                	}
                	for (let i of this.parcoursM) {
						for (let j = 0; j<Object.keys(i.pi).length; j++) {
							this.positions.push(i.pi[j]);
						}
					}
					let j = 0;
					for (let i of this.positions) {
						this.positions[j].longitude_latitude.lat = Number(i.longitude_latitude.lat);
						this.positions[j].longitude_latitude.lon = Number(i.longitude_latitude.lon);
						j++;		
						}

                },
                (err: any) => console.error(err)
            );
    }
	 
	centerOnMe() {
		if(!!navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(position => {
				 this.markers[0].lat = position.coords.latitude;
				 this.markers[0].lng = position.coords.longitude;
				 this.visible = true;
				 this.lat = position.coords.latitude;
				 this.lng = position.coords.longitude;

		    }, error => {
		    	this.presentAlert()
		    });
		        
		    } else {
		        this.presentAlert();
		    }
			}

	voirListePI(i: number) {
		this.navCtrl.push(PointsInteretPage, {
    		pointsInteret: this.parcoursM[i].pi,
    		images: this.parcoursM[i].image,
    		description: this.parcoursM[i].description_parcours
    		});
		}

	voirDetailPI(id: any) {
		this.navCtrl.push(DetailPiPage,{
  		piId: id
  	});

	}

	presentAlert() {
	  let alert = this.alertCtrl.create({
	    title: 'Attention!',
	    subTitle: 'La geolocalisation n\'est pas activée',
	    buttons: ['Dismiss']
	  });
	  alert.present();
	}

}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
