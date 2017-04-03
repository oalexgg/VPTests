import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';

import { Parcours } from "../../services/model";
import { ParcourService } from "../../services/parcours-service";
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
  parcoursM: Array<Parcours>;
	parcours: Array<any>;
	constructor(public navCtrl: NavController, public navParams: NavParams, public parcourService: ParcourService) {}

	ionViewDidLoad() {
	}

	ngOnInit() {
		this.parcoursM = [];
		
        this.parcourService.getParcours()
            .subscribe(
                parcoursM=> {
                	this.parcours = Object.keys(parcoursM).map(k => { return parcoursM[k] });
                	for (let i of this.parcours) {
                		this.parcoursM = i;
                	}
                },
                (err: any) => console.error(err)
            );
    }

   voirListePI(i: number) {
    this.navCtrl.push(PointsInteretPage, {
        pointsInteret: this.parcoursM[i].pi,
        images: this.parcoursM[i].image,
        description: this.parcoursM[i].description_parcours
        });
    }
}
