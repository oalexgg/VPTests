import { Component } from '@angular/core';
import {TranslateService} from 'ng2-translate';

import { NavController, ToastController } from 'ionic-angular';
import { Parcours, ParcoursMoment } from "../../providers/model";
import { ParcourService } from "../../providers/parcours-service";
import { ParcourMomentService } from "../../providers/parcours-moment-service";
import { PointsInteretPage } from '../points-interet/points-interet';
import { DetailPiPage } from "../detail-pi/detail-pi";
import { Database } from "../../providers/database";
import { VPApi } from "../../providers/vp-api";
import { MetreAJourPage } from "../metre-a-jour/metre-a-jour";




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
  zoom: number = 13;
  positionsM: Array<any>;
  markers: any = [46.42493120988299, 0.867619514465332];
  visible: boolean = false;
  upToDate: boolean = false;
  version: any;
  pisParcour: Array<any>;
  imageSrc: Array<any>;

	constructor(
		public navCtrl: NavController,
	 	 public parcourService: ParcourService,
	   	  private toastCtrl: ToastController,
	   	   public parcourMService: ParcourMomentService,
	   	    public translate: TranslateService,
	   	     public db: Database,
	   	      public vpapi: VPApi) {
	   	    	translate.setDefaultLang('fr');
	}

	ionViewDidLoad(){
    this.vpapi.isUpToDate().then(value => {
      if(this.db.getV() === 0) {
        this.navCtrl.setRoot(MetreAJourPage);
      } else if(!value && this.db.getV() !== 0) {
        this.db.setIsMaj(false);
        //quand un maj est disponible mis l'appli a été déjà maj
      } else if(this.db.getV() !== 0){
        this.db.setIsMaj(true);
      }
    });
      this.loadData();
    }

    loadData() {
    	this.parcours = [];
  		this.positions = [];
  		this.positionsM = [];
  		this.parcoursMoment = [];
  		this.pisParcour = [];
      this.imageSrc = [];

  		this.parcourMService.getParcoursMoment()
  			.then(
  				parcoursM => {
  					let parcours = [];
  					parcours = Object.keys(parcoursM).map(k => { return parcoursM[k]});
  					for (var i of parcours) {
  						for (let j of i) {
                if(j instanceof Object){
    							this.parcoursMoment.push(j);
                  this.imageSrc.push("file:///data/data/com.ionicframework.projetvp880805/files/" + j.image);
                }
              }
  					}
  				}
  				);

          this.parcourService.getParcours()
              .then(
                  parcoursM=> {
                  	this.parcour = Object.keys(parcoursM).map(k => { return parcoursM[k] });
                  	for (let i of this.parcour) {
                      if(i instanceof Object){
                    		this.parcours = i;
                      }
                  	}
                  	for (let i of this.parcours) {
                  		let pisparc = 0;
          						for (let j = 0; j<Object.keys(i.pi).length; j++) {
          							this.positions.push(i.pi[j]);
          							pisparc++;
          						}
          						this.pisParcour.push(pisparc);
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
      				 this.markers = {
                 lat: position.coords.latitude,
                 lng: position.coords.longitude
               };
      				 this.visible = true;
  		    }, error => {
  		    	this.presentAlert()
  		    }, {timeout: 1000});

		    } else {
		        this.presentAlert();
		    }
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
