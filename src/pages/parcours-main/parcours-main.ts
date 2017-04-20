import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';

import { Parcours, ParcoursMoment } from "../../providers/model";
import { ParcourService } from "../../providers/parcours-service";
import { ParcourMomentService } from "../../providers/parcours-moment-service";

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
  parcoursMoment: Array<ParcoursMoment>;
  imageSrc: Array<any>;

	constructor(public navCtrl: NavController, public navParams: NavParams, public parcourService: ParcourService, public parcourMService: ParcourMomentService) {}

	ionViewDidLoad() {
	}

	ngOnInit() {
		this.parcours = [];
		this.parcoursMoment = [];
    this.imageSrc = [];

    this.parcourMService.getParcoursMoment()
      .then(
        parcoursM => {
          let parcours = [];
          parcours = Object.keys(parcoursM).map(k => { return parcoursM[k]});
          for (var i of parcours) {
            for (var j of i) {
              if(j instanceof Object) {
                console.log(j)
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
                    for(let j of i){
                      if(j instanceof Object){
                    		this.parcours.push(j);
                        console.log(j);
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
