import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { File } from "@ionic-native/file";

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
	constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
      public piService: PiService,
       private file: File) {}

	ionViewDidLoad() {
	}

	ngOnInit() {
		this.PIS = [];
    this.imageSrc = [];

        this.piService.getPis()
            .then(pis => {
                	this.parcours = Object.keys(pis).map(k => { return pis[k] });
                  this.parcours.forEach((i) => {
                    for (let j of i) {
                      if(j instanceof Object){
                        this.PIS.push(j);
                        this.imageSrc.push(this.file.dataDirectory + j.image["image"]);
                      }
                      else {
                        break;
                      }
                    }
                  });
                },
                (err: any) => console.error(err)
            );
    }

  detailPI(i: number) {
    console.log(this.PIS[i].id);
    this.navCtrl.push(DetailPiPage,{
      piId: this.PIS[i].id
    });
  }

}
