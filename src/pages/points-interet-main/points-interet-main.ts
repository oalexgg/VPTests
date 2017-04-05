import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Parcours } from "../../services/model";
import { ParcourService } from "../../services/parcours-service";

import { DetailPiPage } from "../detail-pi/detail-pi";

/*
  Generated class for the PointsInteretMain page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-points-interet-main',
  templateUrl: 'points-interet-main.html'
})
export class PointsInteretMainPage {
	parcoursM: Array<Parcours>;
	parcours: Array<any>;
	PIS: Array<any>;
	constructor(public navCtrl: NavController, public navParams: NavParams, public parcourService: ParcourService) {}

	ionViewDidLoad() {
	}

	ngOnInit() {
		this.parcoursM = [];
		this.PIS = [];
		
        this.parcourService.getParcours()
            .subscribe(
                parcoursM=> {
                	this.parcours = Object.keys(parcoursM).map(k => { return parcoursM[k] });
                	for (let i of this.parcours) {
                    for (let j of i) {
                      this.PIS.push(j.pi);
                    }
                	}
                  this.PIS = this.PIS[0].concat(this.PIS[1]);
                },
                (err: any) => console.error(err)
            );
    }

  detailPI(i: number) {
    this.navCtrl.push(DetailPiPage,{
      piId: this.PIS[i].id
    });
  }

}
