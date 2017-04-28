import { Component } from '@angular/core';
import {TranslateService} from 'ng2-translate';

import { NavController, ToastController } from 'ionic-angular';
import { Parcours, ParcoursMoment } from "../../providers/model";
import { ParcourService } from "../../providers/parcours-service";
import { ParcourMomentService } from "../../providers/parcours-moment-service";
import { PointsInteretPage } from '../points-interet/points-interet';
import { Database } from "../../providers/database";
import { VPApi } from "../../providers/vp-api";
import { MetreAJourPage } from "../metre-a-jour/metre-a-jour";
import { LocationTracker } from '../../providers/location-tracker';




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
  myTruncatedinfo: string;
  markerIndex: number = 0;
  title: string;
  image: string;

	constructor(
		public navCtrl: NavController,
	 	 public parcourService: ParcourService,
	   	  private toastCtrl: ToastController,
	   	   public parcourMService: ParcourMomentService,
	   	    public translate: TranslateService,
	   	     public db: Database,
	   	      public vpapi: VPApi,
             public locationTracker: LocationTracker) {
	   	    	translate.setDefaultLang('fr');
	}

	ionViewDidLoad(){
    this.vpapi.isUpToDate().then(value => {
      //console.log(this.db.getV());
      if(this.db.getV() === 0 && !value) {
        this.navCtrl.setRoot(MetreAJourPage);
      } else if(!value && this.db.getV() !== 0) {
        this.db.setIsMaj(false);
      } else if(this.db.getV() !== 0){
        this.db.setIsMaj(true);
      }
    });
      this.loadData();
      this.locationTracker.startTracking();
      //this.getCurrentLocation();
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
            parcours.forEach((p) => {
              for(let j of p){
                if(j instanceof Object){
                  this.parcoursMoment.push(j);
                  this.imageSrc.push("file:///data/data/com.ionicframework.projetvp880805/files/" + j.image);
                }
              }
            });
  				}
  				);

          this.parcourService.getParcours()
              .then(
                  parcoursM=> {
                  	this.parcour = Object
                                    .keys(parcoursM)
                                    .map((k) =>
                                      {
                                        return parcoursM[k]
                                      });
                    this
                      .parcour
                      .filter((item)=> {
                        return item instanceof Object;
                      })
                      .forEach((p)=> {
                        // do something
                        this.parcours = p;
                    });
                    this
                    .parcours
                    .forEach((i) => {
                      let pisparc = 0;
          						for (let j = 0; j<Object.keys(i.pi).length; j++) {
          					    this.positions.push(i.pi[j]);
          							pisparc++;
          						}
          						this.pisParcour.push(pisparc);
                    });
                  	this
                    .positions
                    .forEach((i) => {
                      this.positionsM.push([Number(i.longitude_latitude.lat), Number(i.longitude_latitude.lon), i.id]);
                    })
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
  	  },
      error => {
  	     this.presentAlert()
  	  },
      {
        timeout: 1000
      });
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

	voirDetailPI(event, i) {
    /*
		this.navCtrl.push(DetailPiPage,{
  		piId: id
  	});*/
    this.myTruncatedinfo = this.positions[i].description.substring(0,90);
    this.myTruncatedinfo += ' ...';
    this.markerIndex = i;
    this.image = this.positions[i].image.image;
    this.title = this.positions[i].title;
    var marker = event.target;
    marker.nguiMapComponent.openInfoWindow('iw', marker, {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
        myTruncatedinfo: this.myTruncatedinfo,
        title: this.title,
        image: this.image
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

  goToPi() {
    console.log("hola" + this.markerIndex);
  }

  getCurrentLocation() {
    //console.log(navigator.geolocation);
    var location = setInterval(() => {

        navigator.geolocation.getCurrentPosition(position => {

        },
        error => {
           this.presentAlert();
           clearInterval(location);
        },
        {
          timeout: 2000
        });
    }
    , 20000);
  }
}
