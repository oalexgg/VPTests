import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PI } from "../../providers/model";
import { DetailPiPage } from "../detail-pi/detail-pi";
import { ParcourPage} from "../parcour/parcour";
import {TranslateService} from 'ng2-translate';
import { File } from "@ionic-native/file"

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
  private imageSrc: Array<any>;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
      public translate: TranslateService,
       private file: File) {
  	this.pointsInteret = this.navParams.get('pointsInteret');
  	this.imageParam = this.navParams.get("images");
    this.description = this.navParams.get("description");
  	Object
      .getOwnPropertyNames(this.imageParam)
      .forEach(val => {
        if(val === "image"){
          this.images.push(this.file.dataDirectory + this.imageParam[val]);
        }
    	});
    this.imageSrc = [];
    this.pointsInteret
      .forEach((pi) => {
        this.imageSrc.push(this.file.dataDirectory + pi.image["image"]);
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
