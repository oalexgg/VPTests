import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { File } from "@ionic-native/file";

import { Parcours } from "../../providers/model";
import { ParcourService } from "../../providers/parcours-service";

import { PointsInteretPage } from '../points-interet/points-interet';

/*
  Generated class for the ParcoursMain page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-parcours-main',
  templateUrl: 'parcours-main.html'
})
export class ParcoursMainPage implements OnInit {
  parcours: Array<Parcours>;
	parcour: Array<any>;
  imageSrc: Array<any>;

	constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public parcourService: ParcourService,
        private file: File) {}

	ionViewDidLoad() {
	}

	ngOnInit() {
		this.parcours = [];
    this.imageSrc = [];

        this.parcourService.getParcours()
            .then(
                parcoursM=> {
                	this.parcour = Object.keys(parcoursM).map(k => { return parcoursM[k] });
                	for (let i of this.parcour) {
                    for(let j of i){
                      if(j instanceof Object){
                    		this.parcours.push(j);
                        this.imageSrc.push(this.file.dataDirectory + j.image["image"]);
                      }
                      else {
                        break;
                      }
                    }
                	}
                },
                (err: any) => console.error(err)
            );
    }

   voirListePI(i: number) {
    this.navCtrl.push(PointsInteretPage, {
        pointsInteret: this.parcours[i].pi,
        images: this.parcours[i].image,
        description: this.parcours[i].description_parcours
        });
    }
}
