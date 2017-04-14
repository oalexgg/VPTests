import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PI } from "../../providers/model";
import { PiService } from "../../providers/pi-service";
import {CallNumber} from '@ionic-native/call-number';

import {TranslateService} from 'ng2-translate';

/*
  Generated class for the DetailParcours page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-pi',
  templateUrl: 'detail-pi.html'
})
export class DetailPiPage {
	pointsInteret: Array<any>;
  pointInteret: PI;
  adresse: string;
  horaire: string;
  id: any;
  loaded: boolean = false;
  imagesColection: Array<any>;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
      public piService: PiService,
       public translateService: TranslateService,
        private callNumber: CallNumber) {
        	this.id = navParams.get("piId");
          this.pointsInteret = [];
          this.imagesColection = [];
              this.piService.getPis()
                  .subscribe(
                      pis=> {
                        this.pointsInteret = Object.keys(pis).map(k => { return pis[k] });
                        for(let i of this.pointsInteret[0]) {
                          if(this.id === i.id) {
                            this.pointInteret = i;
                          }
                        }
                        this.translateService.get('ADRESSE').subscribe((data) => {
                          this.adresse = "<div class='info'> "+data+":"+this.pointInteret["adresse"]+"</div>";
                        });
                        if(this.pointInteret["horaire"]!= null) 
                        {
                          this.translateService.get('HORAIRES').subscribe((data) => {
                            this.horaire = "<div class='info'> "+data+":"+this.pointInteret["horaire"]+"</div>";
                          });
                        }

                        this.imagesColection.push(this.pointInteret["image"]);
                        for (let i of this.pointInteret["image_collection"]) {
                          this.imagesColection.push(i);
                        }
                      },
                      (err: any) => console.error(err)
                  );
  }

  ionViewDidLoad() {
    setTimeout(() => {
       this.loaded = true;
     }, 100);
  }

  call(phone) {
    console.log(phone);
    
    this.callNumber.callNumber(phone, true)
    .then(() => console.log('Launched dialer!'))
    .catch((error) => console.log(error));
  }

}
