import { Component } from '@angular/core';
import {TranslateService} from 'ng2-translate';

import { NavController, ToastController } from 'ionic-angular';
import { Parcours, ParcoursMoment } from "../../services/model";
import { ParcourService } from "../../services/parcours-service";
import { ParcourMomentService } from "../../services/parcours-moment-service";
import { PointsInteretPage } from '../points-interet/points-interet';
import { DetailPiPage } from "../detail-pi/detail-pi";
import { Database } from "../../providers/database";
import { VPApi } from "../../providers/vp-api";




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	parcours: Array<Parcours>;
	parcoursMoment: Array<ParcoursMoment>;
	parcour: Array<any>;
	selection: number;
	lat: number = 46.42493120988299;
  	lng: number = 0.867619514465332;
  	positions: Array<any>;
  	zoom: number = 15;
  	positionsM: Array<any>;
  	markers: any = [46.42493120988299, 0.867619514465332];
  	visible: boolean = false;
  	upToDate: boolean = false;
  	version: any;

	constructor(
		public navCtrl: NavController,
	 	 public parcourService: ParcourService,
	   	  private toastCtrl: ToastController,
	   	   public parcourMService: ParcourMomentService,
	   	    public translate: TranslateService,
	   	     public db: Database,
	   	      public vpapi: VPApi) {
	   	    	translate.setDefaultLang('fr');
	   	    	//translate.use('fr');
	}
	 
	ionViewDidLoad(){
      this.loadData();
    }


	 
    loadData() {
    	this.parcours = [];
		this.positions = [];
		this.positionsM = [];
		this.parcoursMoment = [];


		this.parcourMService.getParcoursMoment()
			.subscribe(
				parcoursM => {
					let parcours = [];
					parcours = Object.keys(parcoursM).map(k => { return parcoursM[k]});
					for (var i of parcours) {
						for (let j of i) {
							this.parcoursMoment.push(j);
						}
					}
				}
				);

        this.parcourService.getParcours()
            .subscribe(
                parcoursM=> {
                	this.parcour = Object.keys(parcoursM).map(k => { return parcoursM[k] });
                	for (let i of this.parcour) {
                		this.parcours = i;
                	}
                	for (let i of this.parcours) {
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
           		 this.lat = position.coords.latitude;
				 this.lng = position.coords.longitude;
				 this.markers = {lat: position.coords.latitude, lng: position.coords.longitude};
				 this.visible = true;

		    }, error => {
		    	this.presentAlert()
		    }, {timeout: 1000});
		        
		    } else {
		        this.presentAlert();
		    }
		    // para la recuperación del json traducido console.log(this.translate.currentLang);		
		}

	voirListePI(i: number) {
		this.navCtrl.push(PointsInteretPage, {
    		pointsInteret: this.parcours[i].pi,
    		images: this.parcours[i].image,
    		description: this.parcours[i].description_parcours
    		});
		}

	voirDetailPI(id: any) {
		this.navCtrl.push(DetailPiPage,{
  		piId: id
  	});
	}

	presentAlert() {
	  let toast = this.toastCtrl.create({
	    message: 'Veuillez activer le GPS pour vous géolocaloser',
	    duration: 3000,
	    position: 'middle'
	  });

	  toast.onDidDismiss(() => {
	  });

  		toast.present();
	}
}