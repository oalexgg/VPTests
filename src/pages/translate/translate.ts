import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

/*
  Generated class for the Translate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-translate',
  templateUrl: 'translate.html'
})
export class TranslatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService) {}

  ionViewDidLoad() {

  }

  switchLanguage(langue) {
  	this.translateService.use(langue);
  	this.navCtrl.pop();
  }
}
