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
  	positionsM: Array<any>;
  	markers: any = [46.42493120988299, 0.867619514465332];
  	visible: boolean = false;
  	

	constructor(public navCtrl: NavController, public parcourService: ParcourService, private alertCtrl: AlertController) {	 
	}
	 
	 ngOnInit() {
		this.parcoursM = [];
		this.positions = [];
		this.positionsM = [];
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
					for (let i of this.positions) {
						this.positionsM.push([Number(i.longitude_latitude.lat), Number(i.longitude_latitude.lon), i.id]);	
						}

                },
                (err: any) => console.error(err)
            );
    }
	 
	centerOnMe() {
		if(navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(position => {
				 this.markers = {lat: position.coords.latitude, lng: position.coords.longitude};
				 this.visible = true;
				 this.lat = position.coords.latitude;
				 this.lng = position.coords.longitude;

		    }, error => {
		    	this.presentAlert()
		    }, {timeout: 1000});
		        
		    } else {
		        this.presentAlert();
		    }			}

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