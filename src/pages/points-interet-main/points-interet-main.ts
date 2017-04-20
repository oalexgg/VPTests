import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PI } from "../../providers/model";
import { PiService } from "../../providers/pi-service";

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
	parcours: Array<any>;
	PIS: Array<PI>;
  imageSrc: Array<any>;
	constructor(public navCtrl: NavController, public navParams: NavParams, public piService: PiService) {}

	ionViewDidLoad() {
	}

	ngOnInit() {
		this.PIS = [];
    this.imageSrc = [];

        this.piService.getPis()
            .then(pis => {
                	this.parcours = Object.keys(pis).map(k => { return pis[k] });
                	for (let i of this.parcours) {
                    for (let j of i) {
                      if(j instanceof Object){
                        this.PIS.push(j);
                        this.imageSrc.push("file:///data/data/com.ionicframework.projetvp880805/files/" + j.image["image"]);
                      }
                    }
                	}
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
