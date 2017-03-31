import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PI } from "../../services/model";
import { DetailPiPage } from "../detail-pi/detail-pi";
import { ParcourPage} from "../parcour/parcour";

/*
  Generated class for the PointsInteret page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-points-interet',
  templateUrl: 'points-interet.html'
})
export class PointsInteretPage {
	pointsInteret: Array<PI>;
	imageParam: Object;
	images: string[] = [];
  description: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, ) {
  	this.pointsInteret = this.navParams.get('pointsInteret');
  	this.imageParam = this.navParams.get("images");
    this.description = this.navParams.get("description");
  	Object.getOwnPropertyNames(this.imageParam).forEach(val => {
  		this.images.push(this.imageParam[val]);
  	});
  }

  ionViewDidLoad() {
  }

  detailPI(i: number) {
  	this.navCtrl.push(DetailPiPage,{
  		piId: this.pointsInteret[i].id
  	});
  }

  demarrerParcour() {
    this.navCtrl.push(ParcourPage, {parcours: this.pointsInteret});
  }

}
